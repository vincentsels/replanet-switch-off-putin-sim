import { Impact, ImpactAmount, ImpactDomain, Proposal, Sector, Target, TargetType, TranslatedText, Variant } from './proposal';
import { ProposalDetail } from './proposal-details';

export const PROPOSALS: ProposalDetail[] = [
  new ProposalDetail({
    id: 1,
    title: [
      new TranslatedText('en', 'LNG diversification and pipeline switching'),
    ],
    summary: [
      new TranslatedText('en', 'The federal government forbids the sale of personal or small transport vehicles with internal combustion engines. These can still be bought and sold on the second hand market.')
    ],
    icon: 'propane',
    sector: Sector.energy,
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 10000000,
        impacts: [
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 30 }),
        ]
      })
    ]
  }),
  new ProposalDetail({
    id: 2,
    title: [
      new TranslatedText('en', 'EU-wide energy saving by moderating heating or airconditioning'),
    ],
    summary: [
      new TranslatedText('en', 'The federal government requires all suppliers of products and services to display the carbon footprint (and optionally wider ecological impact), so consumers can take that into account.'),
    ],
    icon: 'thermostat',
    sector: Sector.buildings,
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 1000000,
        title: [
          new TranslatedText('en', 'By 1° C'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, warehouses are only required to start applying the eco-score starting in 2025, the footprint is only limited to CO2-emissions, and only food and consumable products have to be labeled.'),
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 10 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: 50 }),
          new Target({ type: TargetType.savedEnergy, amount: 50 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 1000000,
        title: [
          new TranslatedText('en', 'By 2° C'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, warehouses are only required to start applying the eco-score starting in 2025, the footprint is only limited to CO2-emissions, and only food and consumable products have to be labeled.'),
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 20 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: 100 }),
          new Target({ type: TargetType.savedEnergy, amount: 100 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 1000000,
        title: [
          new TranslatedText('en', 'By 3° C'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, warehouses are only required to start applying the eco-score starting in 2025, the footprint is only limited to CO2-emissions, and only food and consumable products have to be labeled.'),
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 30 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: 150 }),
          new Target({ type: TargetType.savedEnergy, amount: 150 }),
        ]
      }),
      new Variant({
        ambitionLevel: 4,
        costInitial: 1000000,
        title: [
          new TranslatedText('en', 'By 4° C'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, warehouses are only required to start applying the eco-score starting in 2025, the footprint is only limited to CO2-emissions, and only food and consumable products have to be labeled.'),
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 40 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: 200 }),
          new Target({ type: TargetType.savedEnergy, amount: 200 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 3,
    title: [
      new TranslatedText('en', 'Fast-track deployment of additional solar PV and wind'),
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ],
    icon: 'solar_power',
    sector: Sector.energy,
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 500000000,
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 6 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: 150 }),
          new Target({ type: TargetType.addedRenewableEnergy, amount: 500 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 4,
    title: [
      new TranslatedText('en', 'Stop nuclear phase-out and restart recently closed reactors in Germany, Sweden and Belgium'),
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ],
    icon: 'curtains_closed',
    sector: Sector.energy,
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 5000000000,
        impacts: [
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 14 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: 200 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 5,
    title: [
      new TranslatedText('en', 'Emergency effort to better utilize French reactor fleet'),
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ],
    icon: 'web_stories',
    sector: Sector.energy,
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 500000000,
        impacts: [
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 26 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: 200 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 6,
    title: [
      new TranslatedText('en', 'Heat pumps to reduce gas demand in heating and emergency energy efficiency measures in buildings'),
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ],
    icon: 'heat_pump',
    sector: Sector.buildings,
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 200000000,
        impacts: [
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 4 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: 150 }),
          new Target({ type: TargetType.savedEnergy, amount: 300 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 7,
    title: [
      new TranslatedText('en', 'Gas to oil in power stations'),
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ],
    icon: 'oil_barrel',
    sector: Sector.energy,
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 500000000,
        impacts: [
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 6 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: -100 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 8,
    title: [
      new TranslatedText('en', 'Gas to coal in power stations'),
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ],
    icon: 'local_fire_department',
    sector: Sector.energy,
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 500000000,
        impacts: [
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 22 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: -75 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 9,
    title: [
      new TranslatedText('en', 'Curtailment to industry'),
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ],
    icon: 'gavel',
    sector: Sector.industry,
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 500000000,
        impacts: [
        ],
        targets: [
          new Target({ type: TargetType.savedRussianGas, amount: 7 }),
          new Target({ type: TargetType.reducedCo2emissions, amount: 150 }),
        ]
      }),
    ]
  }),
]
