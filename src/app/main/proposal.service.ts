import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoremIpsumService } from '../common/lorem-ipsum.service';
import { initCase, rnd, toss } from '../common/helper';

import { PROPOSALS } from './dummy-proposals';
import { PARTY_IDS } from './party';
import { ImpactAmount, ImpactAmountMap, ImpactDomain, Proposal, TargetType, TranslatedText, Variant } from './proposal';
import { Faq, Link, PartyOpinion, ProposalDetail } from './proposal-details';
import { Results, TargetResult, TotalImpact } from './results/results';

const LS_KEY_SELECTED_VARIANTS = 'replanet.selection';

@Injectable()
export class ProposalService {
  proposals$ = new BehaviorSubject<ProposalDetail[]>([]);
  results$ = new BehaviorSubject<Results>(new Results());

  constructor(private loremIpsumService: LoremIpsumService) {
    let proposals = PROPOSALS;

    for (let proposal of proposals) {
      // Random descriptions
      proposal.description = [
        new TranslatedText('nl', loremIpsumService.generateParagraphs()),
        new TranslatedText('fr', loremIpsumService.generateParagraphs()),
        new TranslatedText('en', loremIpsumService.generateParagraphs()),
      ];

      // Random party opinions
      for (let partyId of PARTY_IDS) {
        if (toss()) {
          proposal.partyOpinions?.push(
            new PartyOpinion(partyId, proposal.id, [
              new TranslatedText('nl', loremIpsumService.generateParagraphs(1)),
              new TranslatedText('fr', loremIpsumService.generateParagraphs(1)),
              new TranslatedText('en', loremIpsumService.generateParagraphs(1)),
            ], true, rnd(1, proposal.variants.length))
          );
        } else {
          proposal.partyOpinions?.push(
            new PartyOpinion(partyId, proposal.id, [
              new TranslatedText('nl', loremIpsumService.generateParagraphs(1)),
              new TranslatedText('fr', loremIpsumService.generateParagraphs(1)),
              new TranslatedText('en', loremIpsumService.generateParagraphs(1)),
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

  selectVariant(proposal: ProposalDetail, variant: Variant) {
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
    this.updateResults();
  }

  clearVariant(proposal: ProposalDetail) {
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
    this.updateResults();
  }

  clearSelection() {
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
    this.updateResults();
  }

  updateResults() {
    const proposals = this.proposals$.value;

    if (!proposals || proposals.length === 0) return;

    const selectedVariantNumbers = proposals
      .map(p => ({ id: p.id, selectedVariant: p.variants.find(v => v.selected)?.ambitionLevel }))
      .filter(s => s.selectedVariant);
    localStorage.setItem(LS_KEY_SELECTED_VARIANTS, JSON.stringify(selectedVariantNumbers));

    const selectedVariants = proposals.filter(p => p.selected).flatMap(p => p.variants).filter(v => v.selected);

    const ghgReducedKt = this.getTotalAmount(selectedVariants, TargetType.ghgReduction);
    const ghgReductionPercentage = ghgReducedKt / Results.ghgGapCumulativeKt * 100;
    const ghgTax = (Results.ghgGapCumulativeKt - ghgReducedKt) * Results.pricePerKtGhg;
    const ghgIncome = (Results.ghgGapCumulativeKt - ghgReducedKt) * -Results.pricePerKtGhg;
    const ghgReductionColor = ghgReductionPercentage >= 100 ? 'accent' : 'warn';

    const ghgTarget = new TargetResult(Results.ghgGapCumulativeKt, 'Kt', Results.pricePerKtGhg, ghgReducedKt,
      ghgReductionColor, ghgReductionPercentage, ghgTax, ghgIncome);

    const energySavedGwh = this.getTotalAmount(selectedVariants, TargetType.energyEfficiency);
    const energySavedPercentage = energySavedGwh / Results.eeGapTargetGwh * 100;
    const energySavedColor = energySavedPercentage >= 100 ? 'accent' : 'warn';

    const eeTarget = new TargetResult(Results.eeGapTargetGwh, 'GWh', 0, energySavedGwh,
      energySavedColor, energySavedPercentage);

    const reAddedGwh = this.getTotalAmount(selectedVariants, TargetType.renewableEnergy);
    const reAddedPercentage = reAddedGwh / Results.reGapTargetGwh * 100;
    const renewableEnergyAddedColor = reAddedPercentage >= 100 ? 'accent' : 'warn';

    const reTarget = new TargetResult(Results.reGapTargetGwh, 'GWh', 0, reAddedGwh,
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
        ghgTarget,
        eeTarget,
        reTarget,
        totalCost,
        totalTax,
        totalProfit,
        totalImpact,
        totalCostIncludingTax,
        totalProfitIncludingIncome,
      })
    )
  }

  private getTotalAmount(selectedVariants: Variant[], targetType: TargetType) {
    return selectedVariants
      .flatMap(v => v.targets.filter(t => t.type === targetType).map(t => t.amount))
      .reduce((a, b) => a + b, 0);
  }
}
