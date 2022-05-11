import { ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap } from '../proposal';

export class Results {
  constructor(props: Partial<Results> = {}) {
    Object.assign(this, props);
  }

  static ghgGapCumulativeKt = 50000; // See below
  static eeGapTargetGwh = 20000; // Still to be calculated
  static reGapTargetGwh = 10000; // Still to be calculated

  static pricePerKtGhg = 100000;

  ghgTarget = new TargetResult(Results.ghgGapCumulativeKt, 'Kt', Results.pricePerKtGhg);
  eeTarget = new TargetResult(Results.eeGapTargetGwh, 'Gwh');
  reTarget = new TargetResult(Results.reGapTargetGwh, 'Gwh');

  totalCost: number = 0;
  totalTax: number = 0;
  totalProfit: number = 0;
  totalCostIncludingTax: number = 0;
  totalProfitIncludingIncome: number = 0;
  totalImpact: TotalImpact[] = [];
}

export class TargetResult {
  constructor(public target: number = 0, public unit: string = 'Gwh', public pricePerUnit: number = 0, public total: number = 0,
    public color: string = 'warn', public percentage: number = 0, public tax: number = 0,
    public income: number = 0) {}
}

export class TotalImpact {
  constructor(public domain: ImpactDomain, public amount: number) {}

  class: string = ImpactAmountMap[ImpactAmount.neutral];

  getImpactDomainIcon = () => ImpactDomainMap[this.domain];
}

// TODO: find out real numbers...

/*
export class Results {
  ktGhg2005 = 78637;
  ktGhgCommittedWem = 52662;
  ktGhgReductionNeededWam = 41668;
  ktGhgGapToFill = 10994;
}
*/

/*
Calculation ghgGapKt

11000	- 1375
9625
8250
6875
5500
4125
2750
1375
0
-------
= 49500
*/
