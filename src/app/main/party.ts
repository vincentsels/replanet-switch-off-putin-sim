import { TranslatedText } from './proposal';

export class Party {
  constructor(
    public id: PartyId,
    public abbreviation: TranslatedText[],
    public name: TranslatedText[],
    public logoSmallUrl?: string,
    public logoLargeUrl?: string,
    public website?: string,
    ) {}
}

export enum Parliament {
  chamber = 1,
  flemish = 2,
  walloon = 3,
  brussels = 4,
  french = 5,
  german = 6,
  european = 7,
}

export enum PartyId {
  nva = 1,
  ps = 2,
  vb = 3,
  mr = 4,
  pvdaPtb = 5,
  ecolo = 6,
  cdv = 7,
  openvld = 8,
  vooruit = 9,
  groen = 10,
  cdh = 11,
  defi = 12,
  vivant = 13,
  agora = 14,
  bub = 101,
  beOne = 102,
  cpbPc = 103,
  democratieNationale = 104,
  dierAnimal = 105,
  lspPsl = 106,
  pp = 107,
  rwfRbf = 108,
  referendumPartij = 109,
  sapGa = 110,
  uf = 111,
  volt = 112,
}

export const PARTY_IDS = Object.keys(PartyId)
  .filter((item) => {
    return !isNaN(Number(item));
  })
  .map(id => Number(id));

export const PARTIES_WITH_LOGOS = [
  PartyId.agora,
  PartyId.cdh,
  PartyId.cdv,
  PartyId.defi,
  PartyId.ecolo,
  PartyId.groen,
  PartyId.mr,
  PartyId.nva,
  PartyId.openvld,
  PartyId.ps,
  PartyId.pvdaPtb,
  PartyId.vb,
  PartyId.vivant,
  PartyId.vooruit,
]
