import { ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap } from '../proposal';

export class Results {
  constructor(props: Partial<Results> = {}) {
    Object.assign(this, props);
  }

  static moneyImageMap = [
    { threshold: 17000000000, image: './assets/img/putin/7_putin_crying.jpg' },
    { threshold: 20000000000, image: './assets/img/putin/6_putin_sad.jpg' },
    { threshold: 25000000000, image: './assets/img/putin/5_putin_not_amused.jpg' },
    { threshold: 30000000000, image: './assets/img/putin/4_putin_worried.jpg' },
    { threshold: 35000000000, image: './assets/img/putin/3_putin_smile.jpg' },
    { threshold: 40000000000, image: './assets/img/putin/2_putin_big_smile.jpg' },
    { threshold: 99999999999999, image: './assets/img/putin/1_putin_toast.jpg' }
  ]

  static gasGapBcm = 155; // Billion cubic meters per year
  static oilGapMb = 1650; // Million barrels per year (4.5M/day)

  static co2GapCumulativeMt = 1000; // Still to be calculated
  static eeGapTargetTwh = 500; // Still to be calculated
  static reGapTargetTwh = 500; // Still to be calculated

  static pricePerMtCo2 = 100000000;
  static pricePerBcm = 200000000;
  static priceDifferencePerMb = 10000000;

  rgTarget = new TargetResult(Results.gasGapBcm, 'bcm', Results.pricePerMtCo2);
  roTarget = new TargetResult(Results.oilGapMb, 'mb', Results.pricePerMtCo2);

  ghgTarget = new TargetResult(Results.co2GapCumulativeMt, 'Kt', Results.pricePerMtCo2);
  eeTarget = new TargetResult(Results.eeGapTargetTwh, 'Twh');
  reTarget = new TargetResult(Results.reGapTargetTwh, 'Twh');

  image: string = '';
  totalMoneyToRussia: number = 0;
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
