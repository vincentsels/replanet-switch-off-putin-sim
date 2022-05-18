import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EnumsService } from '../../common/enums.service';
import { LanguageService } from '../../common/language.service';
import { Proposal } from '../proposal';
import { ProposalDetailsDialogComponent } from '../proposal-detail/proposal-detail-dialog.component';
import { ProposalDetail } from '../proposal-details';

@Component({
  selector: 'app-proposal-header',
  templateUrl: './proposal-header.component.html',
  styleUrls: ['./proposal-header.component.scss']
})
export class ProposalHeaderComponent {
  COST_MAP = [
    { threshold:   1000000, class: 'impact-extremely-positive' },
    { threshold:   5000000, class: 'impact-very-positive' },
    { threshold:  20000000, class: 'impact-moderately-positive' },
    { threshold:  50000000, class: 'impact-somewhat-positive' },
    { threshold: 100000000, class: 'impact-neutral' },
    { threshold: 250000000, class: 'impact-somewhat-negative' },
    { threshold: 750000000, class: 'impact-moderately-negative' },
    { threshold: 150000000, class: 'impact-very-negative' },
    { threshold: 999999999999999, class: 'impact-extremely-negative' },
  ];

  GAS_MAP = [
    { threshold:  -20, class: 'impact-extremely-negative' },
    { threshold:  -10, class: 'impact-very-negative' },
    { threshold:   -5, class: 'impact-moderately-negative' },
    { threshold:    0, class: 'impact-somewhat-negative' },
    { threshold:    1, class: 'impact-neutral' },
    { threshold:    5, class: 'impact-somewhat-positive' },
    { threshold:   10, class: 'impact-moderately-positive' },
    { threshold:   20, class: 'impact-very-positive' },
    { threshold: 999999999999999, class: 'impact-extremely-positive' },
  ];

  OIL_MAP = [ // TODO
    { threshold:  -20, class: 'impact-extremely-negative' },
    { threshold:  -10, class: 'impact-very-negative' },
    { threshold:   -5, class: 'impact-moderately-negative' },
    { threshold:    0, class: 'impact-somewhat-negative' },
    { threshold:    1, class: 'impact-neutral' },
    { threshold:    5, class: 'impact-somewhat-positive' },
    { threshold:   10, class: 'impact-moderately-positive' },
    { threshold:   20, class: 'impact-very-positive' },
    { threshold: 999999999999999, class: 'impact-extremely-positive' },
  ];

  CO2_MAP = [
    { threshold:  -200, class: 'impact-extremely-negative' },
    { threshold:  -100, class: 'impact-very-negative' },
    { threshold:   -50, class: 'impact-moderately-negative' },
    { threshold:    0, class: 'impact-somewhat-negative' },
    { threshold:    1, class: 'impact-neutral' },
    { threshold:    50, class: 'impact-somewhat-positive' },
    { threshold:   100, class: 'impact-moderately-positive' },
    { threshold:   200, class: 'impact-very-positive' },
    { threshold: 999999999999999, class: 'impact-extremely-positive' },
  ];

  @Input() proposal?: Proposal;
  @Input() card: boolean = false;
  @Input() set: boolean = false;
  @Input() dialog: boolean = false;

  @Output('closeDialog') closeDialogEmitter = new EventEmitter();

  constructor(public enums: EnumsService, public dialogService: MatDialog, public languageService: LanguageService) {}

  openProposalDetailDialog() {
    if (!this.proposal) return;
    this.dialogService.open(ProposalDetailsDialogComponent, {
      data: { proposal: new ProposalDetail(this.proposal) },
      autoFocus: false,
    });
  }

  closeDialog = () => this.closeDialogEmitter.emit();

  getCostClass = (cost: number) => 'impact-neutral';
  getGasClass = (cost: number) => 'impact-neutral';
  getOilClass = (cost: number) => 'impact-neutral';
  getCo2Class = (cost: number) => 'impact-neutral';

  // getCostClass = (cost: number) => this.translateValueFromMap(cost, this.COST_MAP);
  // getGasClass = (cost: number) => this.translateValueFromMap(cost, this.GAS_MAP);
  // getOilClass = (cost: number) => this.translateValueFromMap(cost, this.OIL_MAP);
  // getCo2Class = (cost: number) => this.translateValueFromMap(cost, this.CO2_MAP);

  translateValueFromMap(cost: number, map: { threshold: number, class: string }[]) {
    for (let val of map) {
      if (cost < val.threshold) return val.class;
    }
    return map[map.length - 1].class;
  }
}
