import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'results-dialog',
  template: `
<h1 mat-dialog-title>
  {{ 'Results' | translate }}
  <button mat-icon-button class="close-button" [mat-dialog-close]="true">
    <mat-icon>close</mat-icon>
  </button>
</h1>
<div mat-dialog-content>
  <app-results class="dialog-results" [dialog]="true"></app-results>
</div>
`,
  styles: [
    `
.dialog-results { max-height: 100% }
.close-button { float: right; }
`
  ]
})
export class ResultsDialogComponent {
  constructor(public dialogRef: MatDialogRef<ResultsDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
