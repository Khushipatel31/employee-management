import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyComponent } from '../../../../../components/notify/notify.component';

@Component({
  selector: 'app-assign-project-form',
  templateUrl: './assign-project-form.component.html',
  styleUrls: ['./assign-project-form.component.css'],
})
export class AssignProjectFormComponent implements OnInit {
  projects: any[] = [];
  managers: any[] = [];
  projectForm!: FormGroup;
  loading = false;
  error = '';
  readonly dialogRef = inject(MatDialogRef<AssignProjectFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.fetchProjects();
    this.userService.projectSubject.subscribe((data) => {
      this.projects = data;
    });
    this.userService.fetchManagers().subscribe((data) => {
      this.managers = data.data;
    });
    this.projectForm = this.formBuilder.group({
      project: [this.data?.project || '', Validators.required],
      reportingTo: [this.data?.reportingTo || '', Validators.required],
      joinDate: [this.data?.joinDate || '', Validators.required],
      leaveDate: [this.data?.leaveDate || ''],
      techStack: this.formBuilder.array([]),
    });

    if (this.data?.techStack) {
      this.data.techStack.forEach((tech: string) => this.addTechStack(tech));
    }
  }

  get techStack() {
    return this.projectForm.get('techStack') as FormArray;
  }

  addTechStack(tech: string = '') {
    const techGroup = this.formBuilder.group({
      tech: [tech, Validators.required],
    });
    this.techStack.push(techGroup);
  }

  removeTechStack(index: number) {
    this.techStack.removeAt(index);
  }

  onFormSubmit() {
    if (this.projectForm.invalid) {
      this.error = 'Please fill all details properly';
      return;
    }
    if (!this.data?.edit) {
      const formValue = this.projectForm.value;
      const formattedJoinDate = formValue.joinDate?.format('YYYY-MM-DD');
      let formValues = {
        ...formValue,
        leaveDate: null,
        joinDate: formattedJoinDate,
      };
      if (typeof formValue.leaveDate === 'object') {
        const formattedLeaveDate = formValue.leaveDate?.format('YYYY-MM-DD');
        formValues = {
          ...formValues,
          leaveDate: formattedLeaveDate,
        };
      }
      this.userService.joinProject(formValues).subscribe((data) => {
        if (data.success) {
          this.dialogRef.close(true);
          this._snackBar.openFromComponent(NotifyComponent, {
            duration: 5 * 1000,
            data: 'Project join request made successfully!!',
          });
          this.userService.fetchMyProjects();
        }
      });
    } else {
      if (!this.projectForm.value.leaveDate) {
        this.error = 'Fill all details mentioned above';
        return;
      }
      const formValue = this.projectForm.value;
      let formValues = {
        ...formValue,
      };
      if (typeof formValue.leaveDate === 'object') {
        const formattedLeaveDate = formValue.leaveDate?.format('YYYY-MM-DD');
        formValues = {
          ...formValues,
          leaveDate: formattedLeaveDate,
        };
      }
      this.userService
        .leaveProject(this.data?.id, {
          leaveDate: formValues.leaveDate,
        })
        .subscribe((data) => {
          this.dialogRef.close();
          this.userService.fetchMyProjects();
        });
    }
  }
}
