import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, Sector, Target, TargetType, TranslatedText, Variant } from './proposal';
import { ProposalDetail } from './proposal-details';

export const PROPOSALS: ProposalDetail[] = [
  new ProposalDetail({
    id: 1,
    title: [
      new TranslatedText('nl', 'Uitfasering aankoop fossiele verbrandingsmotoren'),
      new TranslatedText('en', 'Phase-out purchase of internal combustion engines'),
    ],
    summary: [
      new TranslatedText('nl', 'De federale overheid verbiedt de verkoop van personen- en bestelwagens met een verbrandingsmotor. Op de tweedehandsmarkt kunnen deze wagens wel nog verkocht worden.'),
      new TranslatedText('en', 'The federal government forbids the sale of personal or small transport vehicles with internal combustion engines. These can still be bought and sold on the second hand market.')
    ],
    slug: [
      new TranslatedText('nl', 'uitfasering-aankoop-fossiele-verbrandingsmotoren'),
      new TranslatedText('en', 'phase-out-purchase-of-internal-combustion-engines'),
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.transport,
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/transportation-2-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', 'Vanaf 2029'),
          new TranslatedText('en', 'Starting 2029'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, it will only be forbidden to sell vehicles with an internal combustion engine starting in 2029.'),
        ],
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 4000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', 'Vanaf 2027'),
          new TranslatedText('en', 'Starting 2027'),
        ],
        description: [
          new TranslatedText('en', 'In this more ambitious scenario, it will be forbidden to sell vehicles with an internal combustion engine starting in 2027.'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 12000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -3000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 200000,
        title: [
          new TranslatedText('nl', 'Vanaf 2025'),
          new TranslatedText('en', 'Starting 2025'),
        ],
        description: [
          new TranslatedText('en', 'In this ambitious scenario, it will be forbidden to sell vehicles with an internal combustion engine starting in 2025.'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 20000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -5000 }),
        ]
      })
    ]
  }),
  new ProposalDetail({
    id: 2,
    title: [
      new TranslatedText('nl', 'Verplicht weergeven koolstofvoetafdruk producten en diensten'),
      new TranslatedText('fr', 'Obligation d\'affichage de l\'impact carbone des produits et services'),
      new TranslatedText('en', 'Obligatory display of carbon footprint on products and services'),
    ],
    summary: [
      new TranslatedText('nl', 'De federale overheid verplicht alle leveranciers van producten en diensten om weer te geven wat de koolstofvoetafdruk (en eventueel andere ecologische impact) is, zodat consumenten hier rekening mee kunnen houden.'),
      new TranslatedText('en', 'The federal government requires all suppliers of products and services to display the carbon footprint (and optionally wider ecological impact), so consumers can take that into account.'),
      new TranslatedText('fr', 'L’affichage de l’impact environnemental d’un produit nous paraît être un levier important de sensibilisation et d’information du consommateur. Ne souhaitant pas contraindre le consommateur dans ses choix, nous considérons qu’il est nécessaire de lui donner l’information appropriée à une prise de conscience de l’impact de ses choix afin de l’orienter vers des pratiques plus vertueuses.')
    ],
    slug: [
      new TranslatedText('nl', 'obligatory-display-of-carbon-footprint-on-products-and-services'),
      new TranslatedText('nl', 'verplicht-weergeven-koolstofvoetafdruk-producten-en-diensten'),
      new TranslatedText('fr', 'obligation-d-affichage-de-l-impact-carbone-des-produits-et-services'),
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.industry,
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/eco-shopping-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('en', 'Starting 2025, limited'),
          new TranslatedText('nl', 'Vanaf 2025, beperkt'),
          new TranslatedText('fr', 'À partir de 2025, limité'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, warehouses are only required to start applying the eco-score starting in 2025, the footprint is only limited to CO2-emissions, and only food and consumable products have to be labeled.'),
        ],
        impacts: [
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.somewhatNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 4000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('en', 'Starting 2024, limited, eco-score'),
          new TranslatedText('nl', 'Vanaf 2024, beperkt, eco-score'),
          new TranslatedText('fr', 'À partir de 2024, limité, eco-score'),
        ],
        description: [
          new TranslatedText('en', 'In this more ambitious scenario, warehouses are required to start applying the eco-score starting in 2024, the footprint not only limited to CO2-emissions but also a couple of other ecological impacts such as potential biodiversity loss. Only food and consumable products must be labeled.'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.phosphorusPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.somewhatNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 5000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 200000,
        title: [
          new TranslatedText('en', 'Starting 2024, complete, eco-score'),
          new TranslatedText('nl', 'Vanaf 2024, compleet, eco-score'),
          new TranslatedText('fr', 'À partir de 2024, complèt, eco-score'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, warehouses are required to start applying the eco-score starting in 2023, the footprint not only limited to CO2-emissions but also its exhaustive ecological and social impact. All products must be labeled (albeit with different starting dates as feasible for the sector).'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.phosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.somewhatNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 7000 }),
        ]
      })
    ]
  }),
  new ProposalDetail({
    id: 3,
    title: [
      new TranslatedText('en', 'Some other proposal'),
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ],
    slug: [
      new TranslatedText('en', 'some-other-proposal'),
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.agriculture,
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/agriculture-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 0,
        costPerYearVariable: { 2022: 2000000, 2023: 2000000, 2024: 2000000, 2025: 2000000, 2026: 2000000 },
        title: [
          new TranslatedText('en', 'A basic target'),
        ],
        description: [
          new TranslatedText('en', 'Quite the basic target, suspendisse vitae metus suscipit urna tempor tincidunt vel ut velit. Proin accumsan erat vestibulum erat consequat tempus. Suspendisse potenti. Maecenas ultricies rutrum nunc, non tempus dolor convallis sit amet. Suspendisse posuere ex a lectus eleifend facilisis a sed sem.'),
        ],
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 15000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 5000 }),
          new Target({ type: TargetType.renewableEnergy, amount: 5000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 15000000,
        title: [
          new TranslatedText('en', 'A more ambitious target'),
        ],
        description: [
          new TranslatedText('en', 'This is a more ambitious target. Maecenas lacinia enim dictum tortor tincidunt finibus. Pellentesque vitae lorem ac nibh convallis efficitur. Etiam sapien turpis, varius sit amet commodo ac, vulputate et ex. Curabitur consequat justo at justo gravida, ut lacinia arcu consectetur. Nunc suscipit nulla et tempor semper. Morbi faucibus elit congue, porta velit non, pulvinar mauris.'),
        ],
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 25000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 10000 }),
          new Target({ type: TargetType.renewableEnergy, amount: 10000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 20000000,
        costPerYearVariable: { 2022: 3000000, 2023: 3000000, 2024: 800000 },
        title: [
          new TranslatedText('en', 'A very ambitious target'),
        ],
        description: [
          new TranslatedText('en', 'In this very ambitious target, lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis, libero maximus mattis pulvinar, nisi lorem luctus metus, in pulvinar mauris odio at arcu. Proin faucibus quam id nunc gravida imperdiet. Morbi suscipit sagittis sapien a ornare. Donec accumsan pharetra pellentesque. Donec eleifend erat vel neque gravida sagittis. Aenean vestibulum tristique ex at congue. Integer quis ipsum in nunc condimentum dignissim sed quis nisl.'),
        ],
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 30000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 15000 }),
          new Target({ type: TargetType.renewableEnergy, amount: 15000 }),
        ]
      })
    ]
  }),
  new ProposalDetail({
    id: 4,
    title: [
      new TranslatedText('en', 'Single-variant proposal'),
    ],
    summary: [
      new TranslatedText('en', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
    ],
    slug: [
      new TranslatedText('en', 'single-variant-proposal')
    ],
    policyLevel: PolicyLevel.flemish,
    sector: Sector.buildings,
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/construction-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 20000000,
        costPerYearVariable: { 2022: 2000000, 2023: 2000000, 2024: 2000000, 2025: 2000000, 2026: 2000000 },
        title: [
          new TranslatedText('en', 'The only target'),
        ],
        impacts: [
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 10000 }),
          new Target({ type: TargetType.renewableEnergy, amount: 5000 }),
        ]
      }),
    ]
  })
]
