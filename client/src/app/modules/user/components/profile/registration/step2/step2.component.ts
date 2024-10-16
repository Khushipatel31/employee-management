import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../../services/user.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css',
})
export class Step2Component implements OnInit {
  formData!: FormGroup;
  selectedFile!: Blob;
  profileImageUrl!: string;
  newData: any = null;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.userService.profileSubject.subscribe((data) => {
      this.formData = this.formBuilder.group({
        education: [data?.education || '', Validators.required],
        dob: [data?.dob || '', Validators.required],
        contact: [data?.contact || '', Validators.required],
        courses: this.formBuilder.array([]),
        profileImage: [null],
        gender: [data?.gender || '', Validators.required],
      });
      if (data?.courses) {
        data.courses.forEach((course: string) => this.addCourse(course));
      }
      if (data?.profile) {
        this.profileImageUrl = data.profile.url;
      }
    });
  }
  get courses(): FormArray {
    return this.formData.get('courses') as FormArray;
  }

  addCourse(course: string = ''): void {
    this.courses.push(this.formBuilder.control(course));
  }

  removeCourse(index: number): void {
    this.courses.removeAt(index);
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target?.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onFormSubmit() {
    if (this.formData.invalid) {
      return;
    }
    const formValue = this.formData.value;
    let formattedDate = null;
    if (typeof formValue.dob == 'object') {
      formattedDate = formValue.dob.format('YYYY-MM-DD');
    } else {
      formattedDate = formValue.dob;
    }
    this.userService.profileSubject.subscribe((data) => {
      this.newData = data;
    });
    const updatedProfile = {
      ...this.newData,
      ...formValue,
      courses: this.formData.value.courses,
      dob: formattedDate,
    };
    console.log(JSON.stringify(updatedProfile.profile));
    const profileData = new FormData();
    profileData.append('address', updatedProfile.address);
    profileData.append('city', updatedProfile.city);
    profileData.append('contact', updatedProfile.contact);
    profileData.append('courses', JSON.stringify(updatedProfile.courses));
    profileData.append('education', updatedProfile.education);
    profileData.append('fullname', updatedProfile.fullname);
    profileData.append('gender', updatedProfile.gender);
    profileData.append('pin', updatedProfile.pin);
    profileData.append('dob', updatedProfile.dob);
    profileData.append('state', updatedProfile.state);
    profileData.append('profileCompleted', '1');
    profileData.append('profile', JSON.stringify(updatedProfile.profile));
    if (this.selectedFile) {
      profileData.append('profileImage', this.selectedFile);
    }
    console.log(updatedProfile.profile);
    this.userService.updateProfile(profileData);
  }
}
