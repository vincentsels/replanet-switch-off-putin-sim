import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Proposal } from '../proposal';
import { ProposalDetail } from '../proposal-details';

@Component({
  selector: 'proposal-detail-dialog',
  template: `
<h2 mat-dialog-title>
  {{ data.proposal.title | translateText }}
  <a [routerLink]="'/proposal/' + (data.proposal.slug | translateText)" class="link-button" (click)="closeDialog()"><mat-icon class="inline">link</mat-icon></a>
  <button mat-icon-button class="close-button" [mat-dialog-close]="true">
    <mat-icon>close</mat-icon>
  </button>
</h2>
<div mat-dialog-content>
  <app-proposal-detail class="dialog-detail" [dialog]="true" [proposal]="data.proposal" (closeDialog)="closeDialog()"></app-proposal-detail>
</div>
`,
  styles: [
    `
.dialog-detail { max-height: 100% }

.close-button { float: right; }

.link-button {
  opacity: 0.3;
  margin-left: 6px;

  &:hover {
    opacity: 1;
  }
}
`
  ]
})
export class ProposalDetailsDialogComponent {
  constructor(public dialogRef: MatDialogRef<ProposalDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProposalDetailDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog = () => this.dialogRef.close();
}

export interface ProposalDetailDialogData {
  proposal: ProposalDetail;
}
