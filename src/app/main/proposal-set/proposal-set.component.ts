import { Component, Input } from '@angular/core';

import { EnumsService } from '../../common/enums.service';
import { Proposal } from '../proposal';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal-set',
  templateUrl: './proposal-set.component.html',
  styleUrls: ['./proposal-set.component.scss']
})
export class ProposalSetComponent {
  @Input() proposalSet?: Proposal[];

  constructor(public enums: EnumsService, public service: ProposalService) {}
}
