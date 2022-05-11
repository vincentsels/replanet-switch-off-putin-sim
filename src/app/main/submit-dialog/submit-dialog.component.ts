import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { CommonDialogService } from '../../common/dialog.component';
import { ProposalService } from '../proposal.service';
import { Results } from '../results/results';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})
export class SubmitDialogComponent {
  result: Results;
  ghgTargetMet: boolean;
  eeTargetMet: boolean;
  reTargetMet: boolean;
  allTargetsMet: boolean;

  agree = false;

  constructor(public dialogRef: MatDialogRef<SubmitDialogComponent>, proposalService: ProposalService,
    private snackBar: MatSnackBar, private translate: TranslateService, private commonDialog: CommonDialogService) {
    this.result = proposalService.results$.getValue();
    this.ghgTargetMet = this.result.ghgTarget.percentage >= 100;
    this.eeTargetMet = this.result.eeTarget.percentage >= 100;
    this.reTargetMet = this.result.reTarget.percentage >= 100;
    this.allTargetsMet = this.ghgTargetMet && this.eeTargetMet && this.reTargetMet;
  }

  ok() {
    this.snackBar.open(this.translate.instant(
      'This would submit your preferred measures so the government gets an idea of the support for each of them.'), 'OK');
    this.dialogRef.close();
  }

  showCostComparisonDialog() {
    this.commonDialog.show(
      this.translate.instant('Cost comparison'),
      this.translate.instant('costComparisonExplanation'),
    )
  }
}
