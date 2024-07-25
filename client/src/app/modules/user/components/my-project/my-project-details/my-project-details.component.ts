import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-my-project-details',
  templateUrl: './my-project-details.component.html',
  styleUrl: './my-project-details.component.css',
})
export class MyProjectDetailsComponent {
  readonly dialogRef = inject(MatDialogRef<MyProjectDetailsComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor() {}
}
