import { PartyId } from './party';
import { LanguageType, Proposal, TranslatedText } from './proposal';

export class ProposalDetail extends Proposal {
  constructor(init: Partial<Proposal | ProposalDetail>) {
    super();
    Object.assign(this, init);
  }

  description?: TranslatedText[] = [];

  partyOpinions?: PartyOpinion[] = [];

  linksToMediaArticles: Link[] = [];
  linksToPapers: Link[] = [];
  linksToExplainers: Link[] = [];
  linksToDebates: Link[] = [];
  linksToExamplesAbroad: Link[] = [];

  faqs: Faq[] = [];
}

export class PartyOpinion {
  constructor(
    public partyId: PartyId,
    public proposalId: number,
    public opinion: TranslatedText[] = [],
    public selected: boolean,
    public variant?: number,
  ) {}
}

export class Link {
  constructor(
    public proposalId: number,
    public url: string,
    public title: string,
    public language: LanguageType) {}
}

export class Faq {
  constructor(
    public id: string,
    public proposalId: number,
    public question: TranslatedText[] = [],
    public slug: TranslatedText[] = [],
    public shortAnswer: TranslatedText[] = [],
    public detailedAnswer: TranslatedText[] = []) {}
}
