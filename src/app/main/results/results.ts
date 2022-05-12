import { ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap } from '../proposal';

export class Results {
  constructor(props: Partial<Results> = {}) {
    Object.assign(this, props);
  }

  static gasGapBcm = 155; // Billion cubic meters per year
  static oilGapMb = 1650; // Million barrels per year (4.5M/day)

  static co2GapCumulativeMt = 1000; // Still to be calculated
  static eeGapTargetTwh = 500; // Still to be calculated
  static reGapTargetTwh = 500; // Still to be calculated

  static pricePerMtCo2 = 100000000;
  static pricePerBcm = 200000000;
  static pricePerMb = 100000000;

  rgTarget = new TargetResult(Results.gasGapBcm, 'bcm', Results.pricePerMtCo2);
  roTarget = new TargetResult(Results.oilGapMb, 'mb', Results.pricePerMtCo2);

  ghgTarget = new TargetResult(Results.co2GapCumulativeMt, 'Kt', Results.pricePerMtCo2);
  eeTarget = new TargetResult(Results.eeGapTargetTwh, 'Twh');
  reTarget = new TargetResult(Results.reGapTargetTwh, 'Twh');

  totalCost: number = 0;
  totalTax: number = 0;
  totalProfit: number = 0;
  totalCostIncludingTax: number = 0;
  totalProfitIncludingIncome: number = 0;
  totalImpact: TotalImpact[] = [];
}

export class TargetResult {
  constructor(public target: number = 0, public unit: string = 'Twh', public pricePerUnit: number = 0, public total: number = 0,
    public color: string = 'warn', public percentage: number = 0, public tax: number = 0,
    public income: number = 0) {}
}

export class TotalImpact {
  constructor(public domain: ImpactDomain, public amount: number) {}

  class: string = ImpactAmountMap[ImpactAmount.neutral];

  getImpactDomainIcon = () => ImpactDomainMap[this.domain];
}
