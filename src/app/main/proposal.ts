export class Proposal {
  constructor(props: Partial<Proposal> = {}) {
    Object.assign(this, props);
  }

  id: number = 0;
  title: TranslatedText[] = [];
  slug: TranslatedText[] = [];
  summary: TranslatedText[] = [];
  variants: Variant[] = [];
  sector?: Sector;

  icon?: string;

  selected: boolean = false;
  selectedAmbitionLevel: number = 0;

  getSectorIcon = () => SectorMap[this.sector || Sector.other];
  getSelectedVariant = () => (this.variants || []).find(v => v.selected);
  getAverageCost = () => this.variants.map(v => v.getTotalCost()).reduce((total, curr) => total + curr, 0) / this.variants.length;

  getSingleOrMinCost(fromSelected: boolean) {
    if (fromSelected) return this.getSelectedVariant()?.getTotalCost();
    return this.variants[0].getTotalCost();
  }

  getMaxCost(ignore: boolean) {
    if (ignore) return 0;
    if (this.variants.length === 1) return 0;
    return this.variants[this.variants.length - 1].getTotalCost();
  }

  getSingleOrMinTargetAmount(targetType: TargetType, fromSelected: boolean) {
    if (fromSelected) return this.getSelectedVariant()?.getTargetAmount(targetType);
    return this.variants[0].getTargetAmount(targetType);
  }

  getMaxTargetAmount(targetType: TargetType, ignore: boolean) {
    if (ignore) return 0;
    if (this.variants.length === 1) return 0;
    return this.variants[this.variants.length - 1].getTargetAmount(targetType);
  }

  getSlugTextInLanguage(lang: LanguageType): string {
    let slug = this.slug.find(s => s.lang === lang);
    if (!slug) slug = this.slug.find(s => s.lang === 'en');
    if (!slug) slug = this.slug[0];

    return slug.text;
  }
}

export enum Sector {
  unknown = 0,
  transport = 1,
  buildings = 2,
  agriculture = 3,
  industry = 4,
  wasteManagement = 5,
  energy = 6,
  general = 7,
  other = 8,
}

export const SectorMap = {
  [Sector.unknown]: 'question_mark',
  [Sector.transport]: 'commute',
  [Sector.buildings]: 'location_city',
  [Sector.agriculture]: 'agriculture',
  [Sector.industry]: 'factory',
  [Sector.wasteManagement]: 'delete',
  [Sector.energy]: 'bolt',
  [Sector.general]: 'open_with',
  [Sector.other]: 'open_with',
}

export class Variant {
  constructor(props: Partial<Variant> = {}) {
    Object.assign(this, props);
  }

  ambitionLevel: number = 1;
  title: TranslatedText[] = [];
  description: TranslatedText[] = [];
  targets: Target[] = [];
  costInitial: number = 0;
  costPerYearFixed: number = 0;
  costPerYearVariable?: { [year: number]: number };
  impacts: Impact[] = [];

  selected: boolean = false;

  getTargetAmount = (type: TargetType) => this.targets.find(t => t.type === type)?.amount;
  getTotalCost = () => this.costInitial + (this.costPerYearFixed * 3) +
    (Object.values(this.costPerYearVariable || {}).reduce((a, b) => a + b, 0) || 0);
}

export class Target {
  constructor(props: Partial<Target> = {}) {
    Object.assign(this, props);
  }

  type?: TargetType;
  year?: number;
  amount: number = 0;
}

export enum TargetType {
  none = 0,
  savedRussianGas = 1,
  savedRussianOil = 2,
  reducedCo2emissions = 3,
  savedEnergy = 4,
  addedRenewableEnergy = 5,
}

export class Impact {
  constructor(public domain: ImpactDomain, public amount: ImpactAmount) {}

  getImpactDomainIcon = () => ImpactDomainMap[this.domain];
  getImpactAmountClass = () => ImpactAmountMap[this.amount];
}

export enum ImpactDomain {
  unknown = 0,
  biodiversityLoss = 1,
  nitrogenPollution = 2,
  phosphorusPollution = 3,
  oceanAcidification = 4,
  luLuCf = 5,
  waterConsumption = 6,
  ozoneDepletion = 7,
  aerosols = 8,
  chemicalPollution = 9,
  redistributionLocal = 10,
  redistributionGlobal = 11,
  humanRightsLocal = 12,
  humanRightsGlobal = 13,
}

export const ImpactDomainMap = {
  [ImpactDomain.unknown]: 'question_mark',
  [ImpactDomain.biodiversityLoss]: 'grass',
  [ImpactDomain.nitrogenPollution]: 'cloud_queue',
  [ImpactDomain.phosphorusPollution]: 'cloud_queue',
  [ImpactDomain.oceanAcidification]: 'waves',
  [ImpactDomain.luLuCf]: 'forest',
  [ImpactDomain.waterConsumption]: 'water_drop',
  [ImpactDomain.ozoneDepletion]: 'public',
  [ImpactDomain.aerosols]: 'ac_unit',
  [ImpactDomain.chemicalPollution]: 'science',
  [ImpactDomain.redistributionLocal]: 'payments',
  [ImpactDomain.redistributionGlobal]: 'payments',
  [ImpactDomain.humanRightsLocal]: 'volunteer_activism',
  [ImpactDomain.humanRightsGlobal]: 'volunteer_activism',
}

/**
 * Subtract -5 to get weighed amount.
 */
export enum ImpactAmount {
  extremelyPositive = 1,
  veryPositive = 2,
  moderatelyPositive = 3,
  somewhatPositive = 4,
  neutral = 5,
  somewhatNegative = 6,
  moderatelyNegative = 7,
  veryNegative = 8,
  extremelyNegative = 9,
}

export const ImpactAmountMap = {
  [ImpactAmount.extremelyPositive]: 'impact-extremely-positive',
  [ImpactAmount.veryPositive]: 'impact-very-positive',
  [ImpactAmount.moderatelyPositive]: 'impact-moderately-positive',
  [ImpactAmount.somewhatPositive]: 'impact-somewhat-positive',
  [ImpactAmount.neutral]: 'impact-neutral',
  [ImpactAmount.somewhatNegative]: 'impact-somewhat-negative',
  [ImpactAmount.moderatelyNegative]: 'impact-moderately-negative',
  [ImpactAmount.veryNegative]: 'impact-very-negative',
  [ImpactAmount.extremelyNegative]: 'impact-extremely-negative',
}

export class TranslatedText {
  constructor(public lang: LanguageType, public text: string) {}
}

export type LanguageType = 'en' | 'nl' | 'fr';

export type ProposalSetType = 'replanet' | 'iea' | 'eu' | 'own';
