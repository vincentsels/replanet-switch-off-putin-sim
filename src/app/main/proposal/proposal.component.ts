import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { EnumsService } from '../../common/enums.service';
import { Proposal, Variant } from '../proposal';
import { ProposalDetail } from '../proposal-details';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent {
  @Input() proposal?: ProposalDetail;

  constructor(public enums: EnumsService, public service: ProposalService) {}

  getSelectedVariant() {
    if (!this.proposal) return;
    if (!this.proposal.selected) return;

    return this.proposal.variants.find(v => v.selected);
  }

  selectProposal() {
    if (!this.proposal) return;
    if (this.proposal.selected) return;

    this.updateSelected(this.proposal.variants[0]);
  }

  updateSelected(variant: Variant) {
    if (!this.proposal || !variant) return;

    this.service.selectVariant(this.proposal, variant);
  }

  clearVariant() {
    if (!this.proposal) return;

    this.service.clearVariant(this.proposal);
  }
}
