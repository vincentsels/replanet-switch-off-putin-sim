import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CommonDialogService } from '../../common/dialog.component';

import { EnumsService } from '../../common/enums.service';
import { ProposalService } from '../proposal.service';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';
import { Results } from './results';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results$: Observable<Results>;

  ghgGapCumulativeKt = Results.ghgGapCumulativeKt;
  reGapTargetGwh = Results.reGapTargetGwh;
  eeGapTargetGwh = Results.eeGapTargetGwh;

  expandedAll = false;
  expandedGhg = false;
  expandedEe = false;
  expandedRe = false;
  expandedTotalCost = false;
  expandedTotalImpact = false;

  @Input() dialog = false;

  constructor(service: ProposalService, public enums: EnumsService, private matDialog: MatDialog,
    private commonDialog: CommonDialogService, private translate: TranslateService) {
    this.results$ = service.results$;
  }

  ngOnInit(): void {
    if (this.dialog) {
      this.expandedAll = true;
      this.expandedGhg = true;
      this.expandedEe = true;
      this.expandedRe = true;
      this.expandedTotalCost = true;
      this.expandedTotalImpact = true;
    }
  }

  submit() {
    this.matDialog.open(SubmitDialogComponent);
  }

  displayImpact(impactAmount: number) {
    if (impactAmount === 0) return '+-';
    const sign = impactAmount < 0 ? '+' : '- ';
    return sign.repeat(Math.abs(impactAmount));
  }

  toggleAllResults() {
    this.expandedAll = !this.expandedAll;

    this.expandedGhg = this.expandedAll;
    this.expandedEe = this.expandedAll;
    this.expandedRe = this.expandedAll;
    this.expandedTotalCost = this.expandedAll;
    this.expandedTotalImpact = this.expandedAll;
  }

  toggleGhgResult() {
    this.expandedGhg = !this.expandedGhg;
  }

  toggleEeResult() {
    this.expandedEe = !this.expandedEe;
  }

  toggleReResult() {
    this.expandedRe = !this.expandedRe;
  }

  toggleTotalCost() {
    this.expandedTotalCost = !this.expandedTotalCost;
  }

  toggleTotalImpact() {
    this.expandedTotalImpact = !this.expandedTotalImpact;
  }

  showCostComparisonDialog() {
    this.commonDialog.show(
      this.translate.instant('Cost comparison'),
      this.translate.instant('costComparisonExplanation'),
    )
  }
}
