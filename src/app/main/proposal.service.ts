import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoremIpsumService } from '../common/lorem-ipsum.service';
import { initCase, rnd, toss } from '../common/helper';

import { PROPOSALS } from './dummy-proposals';
import { PARTY_IDS } from './party';
import { ImpactAmount, ImpactAmountMap, ImpactDomain, Proposal, ProposalSetType, TargetType, TranslatedText, Variant } from './proposal';
import { Faq, Link, PartyOpinion, ProposalDetail } from './proposal-details';
import { Results, TargetResult, TotalImpact } from './results/results';

export const LS_KEY_SELECTED_VARIANTS = 'replanet.selection';

@Injectable()
export class ProposalService {
  proposals$ = new BehaviorSubject<ProposalDetail[]>([]);
  results$ = new BehaviorSubject<Results>(new Results());

  constructor(private loremIpsumService: LoremIpsumService) {
    this.loadProposals();
  }

  public loadProposals() {
    let proposals = PROPOSALS;

    for (let proposal of proposals) {
      // Random descriptions
      proposal.description = [
        new TranslatedText('nl', this.loremIpsumService.generateParagraphs()),
        new TranslatedText('fr', this.loremIpsumService.generateParagraphs()),
        new TranslatedText('en', this.loremIpsumService.generateParagraphs()),
      ];

      // Random party opinions
      for (let partyId of PARTY_IDS) {
        if (toss()) {
          proposal.partyOpinions?.push(
            new PartyOpinion(partyId, proposal.id, [
              new TranslatedText('nl', this.loremIpsumService.generateParagraphs(1)),
              new TranslatedText('fr', this.loremIpsumService.generateParagraphs(1)),
              new TranslatedText('en', this.loremIpsumService.generateParagraphs(1)),
            ], true, rnd(1, proposal.variants.length))
          );
        } else {
          proposal.partyOpinions?.push(
            new PartyOpinion(partyId, proposal.id, [
              new TranslatedText('nl', this.loremIpsumService.generateParagraphs(1)),
              new TranslatedText('fr', this.loremIpsumService.generateParagraphs(1)),
              new TranslatedText('en', this.loremIpsumService.generateParagraphs(1)),
            ], false)
          );
        }
      }

      // Random links
      for (let i = 0; i < rnd(1, 3); i++) proposal.linksToDebates?.push(this.generateRandomLink(proposal.id));
      for (let i = 0; i < rnd(0, 2); i++) proposal.linksToExamplesAbroad?.push(this.generateRandomLink(proposal.id));
      for (let i = 0; i < rnd(1, 6); i++) proposal.linksToMediaArticles?.push(this.generateRandomLink(proposal.id));
      for (let i = 0; i < rnd(1, 5); i++) proposal.linksToPapers?.push(this.generateRandomLink(proposal.id));
      for (let i = 0; i < rnd(0, 3); i++) proposal.linksToExplainers?.push(this.generateRandomLink(proposal.id));

      // Random faqs
      for (let i = 0; i < rnd(0, 8); i++) {
        proposal.faqs?.push(new Faq(proposal.id + '-' + i, proposal.id, [
          new TranslatedText('nl', this.loremIpsumService.generateWords(rnd(4, 12)) + '?'),
          new TranslatedText('fr', this.loremIpsumService.generateWords(rnd(4, 12)) + ' ?'),
          new TranslatedText('en', this.loremIpsumService.generateWords(rnd(4, 12)) + '?')], [
          new TranslatedText('nl', this.loremIpsumService.generateWords(rnd(4, 12)).replace(' ', '-')),
          new TranslatedText('fr', this.loremIpsumService.generateWords(rnd(4, 12)).replace(' ', '-')),
          new TranslatedText('en', this.loremIpsumService.generateWords(rnd(4, 12)).replace(' ', '-'))], [
          new TranslatedText('nl', this.loremIpsumService.generateParagraphs(1)),
          new TranslatedText('fr', this.loremIpsumService.generateParagraphs(1)),
          new TranslatedText('en', this.loremIpsumService.generateParagraphs(1))],
          toss() ? [] : [
            new TranslatedText('nl', this.loremIpsumService.generateParagraphs(rnd(1, 3))),
            new TranslatedText('fr', this.loremIpsumService.generateParagraphs(rnd(1, 3))),
            new TranslatedText('en', this.loremIpsumService.generateParagraphs(rnd(1, 3)))]
          )
        );
      }
    }

    this.proposals$.next(proposals);

    const selectedVariantNumbers = JSON.parse(localStorage.getItem(LS_KEY_SELECTED_VARIANTS) || '[]');

    if (selectedVariantNumbers.length > 0) {
      proposals = this.proposals$.value;

      // Clear all
      proposals.forEach(p => {
        p.selected = false;
        p.selectedAmbitionLevel = 0;
        p.variants.forEach(v => {
          v.selected = false;
        })
      });

      for (let selectedVariantNumber of selectedVariantNumbers) {
        const selectedProposal = proposals.find(p => p.id === selectedVariantNumber.id);
        if (selectedProposal) {
          selectedProposal.selectedAmbitionLevel = selectedVariantNumber.selectedVariant;
          const selectedVariant = selectedProposal.variants.find(v => v.ambitionLevel === selectedVariantNumber.selectedVariant);
          if (selectedVariant) {
            selectedProposal.selected = true;
            selectedVariant.selected = true;
          }
        }
      }

      this.proposals$.next(proposals);
    }

    this.updateResults();
  }

  generateRandomLink = (proposalId: number) => new Link(proposalId, 'https://switchoffputin.org',
    this.loremIpsumService.generateWords(rnd(2, 8)), toss() ? 'nl' : toss() ? 'fr' : 'en');

  selectVariant(proposal: ProposalDetail, variant: Variant, saveSelection: boolean = true) {
    if (!proposal) return;

    variant.selected = true;

    for (let notClickedVariant of proposal.variants.filter(v => v.ambitionLevel !== variant.ambitionLevel)) {
      notClickedVariant.selected = false;
    }

    proposal.selected = true;
    proposal.selectedAmbitionLevel = variant.ambitionLevel;

    const proposals = [
      ...this.proposals$.value
    ];

    proposals[proposals.findIndex(p => p.id === proposal.id)] = new ProposalDetail(proposal);

    this.proposals$.next(proposals);
    this.updateResults(saveSelection);
  }

  clearVariant(proposal: ProposalDetail, saveSelection: boolean = true) {
    proposal.selected = false;
    proposal.selectedAmbitionLevel = 0;

    for (let notClickedVariant of proposal.variants) {
      notClickedVariant.selected = false;
    }

    const proposals = [
      ...this.proposals$.value
    ];

    proposals[proposals.findIndex(p => p.id === proposal.id)] = new ProposalDetail(proposal);

    this.proposals$.next(proposals);
    this.updateResults(saveSelection);
  }

  clearSelection(saveSelection: boolean = true) {
    const proposals = [
      ...this.proposals$.value,
    ];

    proposals.forEach((proposal) => {
      proposal.selected = false;
      proposal.selectedAmbitionLevel = 0;
      proposal.variants.forEach((variant) => {
        variant.selected = false;
      });
    });

    this.proposals$.next(proposals);

    if (saveSelection) {
      localStorage.removeItem(LS_KEY_SELECTED_VARIANTS);
    }

    this.updateResults(saveSelection);
  }

  updateResults(saveSelection: boolean = true) {
    const proposals = this.proposals$.value;

    if (!proposals || proposals.length === 0) return;

    const selectedVariantNumbers = proposals
      .map(p => ({ id: p.id, selectedVariant: p.variants.find(v => v.selected)?.ambitionLevel }))
      .filter(s => s.selectedVariant);

    if (saveSelection && selectedVariantNumbers.length > 0) {
      localStorage.setItem(LS_KEY_SELECTED_VARIANTS, JSON.stringify(selectedVariantNumbers));
    }

    const selectedVariants = proposals.filter(p => p.selected).flatMap(p => p.variants).filter(v => v.selected);

    const russianGasSavedGwh = this.getTotalAmount(selectedVariants, TargetType.savedRussianGas);
    const russianGasSavedPercentage = 100 - russianGasSavedGwh / Results.gasGapBcm * 100;
    const russianGasSavedColor = russianGasSavedPercentage > 0 ? 'warn' : 'accent';

    const rgTarget = new TargetResult(Results.gasGapBcm, 'bcm', 0, russianGasSavedGwh,
      russianGasSavedColor, russianGasSavedPercentage);

    const russianOilSavedGwh = this.getTotalAmount(selectedVariants, TargetType.savedRussianOil);
    const russianOilSavedPercentage = 100 - russianOilSavedGwh / Results.oilGapMb * 100;
    const russianOilSavedColor = russianOilSavedPercentage > 0 ? 'warn' : 'accent';

    const roTarget = new TargetResult(Results.oilGapMb, 'mb', 0, russianOilSavedGwh,
      russianOilSavedColor, russianOilSavedPercentage);

    const totalMoneyToRussia =
      (Results.gasGapBcm - this.getTotalAmount(selectedVariants, TargetType.savedRussianGas)) * Results.pricePerBcm +
      (Results.oilGapMb - this.getTotalAmount(selectedVariants, TargetType.savedRussianOil)) * Results.priceDifferencePerMb;

    let image = '';
    for (let threshold of Results.moneyImageMap) {
      if (totalMoneyToRussia <= threshold.threshold) {
        image = threshold.image;
        break;
      }
    }

    const ghgReducedKt = this.getTotalAmount(selectedVariants, TargetType.reducedCo2emissions);
    const ghgReductionPercentage = ghgReducedKt / Results.co2GapCumulativeMt * 100;
    const ghgTax = (Results.co2GapCumulativeMt - ghgReducedKt) * Results.pricePerMtCo2;
    const ghgIncome = (Results.co2GapCumulativeMt - ghgReducedKt) * -Results.pricePerMtCo2;
    const ghgReductionColor = ghgReductionPercentage >= 100 ? 'accent' : 'warn';

    const ghgTarget = new TargetResult(Results.co2GapCumulativeMt, 'Kt', Results.pricePerMtCo2, ghgReducedKt,
      ghgReductionColor, ghgReductionPercentage, ghgTax, ghgIncome);

    const energySavedGwh = this.getTotalAmount(selectedVariants, TargetType.savedEnergy);
    const energySavedPercentage = energySavedGwh / Results.eeGapTargetTwh * 100;
    const energySavedColor = energySavedPercentage >= 100 ? 'accent' : 'warn';

    const eeTarget = new TargetResult(Results.eeGapTargetTwh, 'GWh', 0, energySavedGwh,
      energySavedColor, energySavedPercentage);

    const reAddedGwh = this.getTotalAmount(selectedVariants, TargetType.addedRenewableEnergy);
    const reAddedPercentage = reAddedGwh / Results.reGapTargetTwh * 100;
    const renewableEnergyAddedColor = reAddedPercentage >= 100 ? 'accent' : 'warn';

    const reTarget = new TargetResult(Results.reGapTargetTwh, 'GWh', 0, reAddedGwh,
      renewableEnergyAddedColor, reAddedPercentage);

    const totalCost = selectedVariants.map(v => v.getTotalCost()).reduce((a, b) => a + b, 0);
    const totalProfit = totalCost < 0 ? totalCost * -1 : 0;

    const totalTax = ghgTax;

    const totalCostIncludingTax = totalCost + totalTax;
    const totalProfitIncludingIncome = totalProfit + ghgIncome;

    const totalImpact: TotalImpact[] = [];

    for (let variant of selectedVariants) {
      for (let impact of variant.impacts) {
        const impactItem = totalImpact.find(i => i.domain === impact.domain);
        if (impactItem) {
          impactItem.amount += (impact.amount - 5);
        } else {
          totalImpact.push(new TotalImpact(impact.domain, impact.amount - 5 ));
        }
      }
    }

    for (let impact of totalImpact) {
      if (impact.amount <= -8) impact.class = ImpactAmountMap[ImpactAmount.extremelyPositive];
      else if (impact.amount <= -6) impact.class = ImpactAmountMap[ImpactAmount.veryPositive];
      else if (impact.amount <= -4) impact.class = ImpactAmountMap[ImpactAmount.moderatelyPositive];
      else if (impact.amount <= -2) impact.class = ImpactAmountMap[ImpactAmount.somewhatPositive];
      else if (impact.amount >= 8) impact.class = ImpactAmountMap[ImpactAmount.extremelyNegative];
      else if (impact.amount >= 6) impact.class = ImpactAmountMap[ImpactAmount.veryNegative];
      else if (impact.amount >= 4) impact.class = ImpactAmountMap[ImpactAmount.moderatelyNegative];
      else if (impact.amount >= 2) impact.class = ImpactAmountMap[ImpactAmount.somewhatNegative];
      else impact.class = ImpactAmountMap[ImpactAmount.neutral];
    }

    totalImpact.sort((a, b) => b.amount - a.amount);

    this.results$.next(
      new Results({
        rgTarget,
        roTarget,
        ghgTarget,
        eeTarget,
        reTarget,
        image,
        totalMoneyToRussia,
        totalCost,
        totalTax,
        totalProfit,
        totalImpact,
        totalCostIncludingTax,
        totalProfitIncludingIncome,
      })
    )
  }

  public getSet(setType: ProposalSetType) {
    // TODO
    if (setType === 'replanet') return PROPOSALS;
    else return PROPOSALS.filter(p => Math.random() > 0.3);
  }

  private getTotalAmount(selectedVariants: Variant[], targetType: TargetType) {
    return selectedVariants
      .flatMap(v => v.targets.filter(t => t.type === targetType).map(t => t.amount))
      .reduce((a, b) => a + b, 0);
  }
}
