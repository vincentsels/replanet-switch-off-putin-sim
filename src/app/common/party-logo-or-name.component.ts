import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PARTIES_WITH_LOGOS, PartyId } from '../main/party';
import { CommonDialogService } from './dialog.component';
import { EnumsService } from './enums.service';

@Component({
  selector: 'app-party-logo-or-name',
  template:
`<ng-container *ngIf="partyId">
  <ng-container *ngIf="getLogo() as logoUrl; else partyName"><img class="party-logo" [src]="logoUrl" /></ng-container>
  <ng-template #partyName>{{ enums.PartyId[partyId] | translate }}</ng-template>
</ng-container>
`,
  styles: [
`.party-logo {
  max-width: 48px;
  max-height: 24px;
}
`
  ]
})
export class PartyLogoOrNameComponent {
  constructor(public enums: EnumsService) {}

  @Input() partyId?: PartyId;

  getLogo = () => this.partyId && PARTIES_WITH_LOGOS.includes(this.partyId) &&
    '/assets/img/partylogos/icon/' + this.enums.PartyId[this.partyId] + '.png';
}
