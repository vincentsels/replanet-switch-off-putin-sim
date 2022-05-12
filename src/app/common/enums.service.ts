import { Injectable } from '@angular/core';
import { PartyId } from '../main/party';
import { ImpactAmount, ImpactDomain, Sector, TargetType } from '../main/proposal';

@Injectable()
export class EnumsService {
  Sector = Sector;
  TargetType = TargetType;
  ImpactDomain = ImpactDomain;
  ImpactAmount = ImpactAmount;
  PartyId = PartyId;
}
