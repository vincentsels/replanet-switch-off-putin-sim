import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { Proposal } from './proposal';
import { ProposalDetail } from './proposal-details';
import { ProposalService } from './proposal.service';
import { ResultsDialogComponent } from './results/results-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  filteredProposals$?: Observable<ProposalDetail[]>;
  projectsFilter = '';
  proposalsFilter$ = new BehaviorSubject<string>('');

  constructor(public proposalService: ProposalService, private dialog: MatDialog, private translate: TranslateService) {
    this.filteredProposals$ = combineLatest([this.proposalsFilter$, this.proposalService.proposals$])
      .pipe(
        map(([filter, proposals]) => {
          if (!filter) return proposals;
          return proposals.filter(
            p => p.title.some(t => t.text.toLocaleLowerCase().includes(this.projectsFilter.toLocaleLowerCase())) ||
              p.summary.some(t => t.text.toLocaleLowerCase().includes(this.projectsFilter.toLocaleLowerCase()))
          );
        })
      );

    this.proposalService.updateResults();
  }

  showResults() {
    this.dialog.open(ResultsDialogComponent, {
      autoFocus: false,
    });
  }

  filterChanged() {
    this.proposalsFilter$.next(this.projectsFilter);
  }

  clearFilter() {
    this.projectsFilter = '';
    this.filterChanged();
  }

  clearSelection() {
    if (confirm(this.translate.instant('Are you sure you want to erase your selection of measures?'))) {
      this.proposalService.clearSelection();
    }
  }
}
