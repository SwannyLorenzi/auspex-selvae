import type { Character } from '../demonlord-models';
import { SourceBook } from '../components/magic/magic-models';
import type {
  Equipment,
  WeaponEquipment,
  ArmorEquipment,
  InventoryEquipment,
} from '../components/equipment/equipment-models';

const weapons: WeaponEquipment[] = [
  {
    name: 'Fouet',
    category: 'weapon',
    quantity: 1,
    damage: '1d3',
    hands: 'weak',
    properties: ['finesse', 'allonge +1'],
  },
  {
    name: 'Rapière',
    category: 'weapon',
    quantity: 1,
    damage: '1d6+1',
    hands: 'one',
    properties: ['finesse'],
  },
  {
    name: 'Dague',
    category: 'weapon',
    quantity: 3,
    damage: '1d3',
    hands: 'weak',
    properties: ['finesse', 'de jet', 'portée courte'],
  },
  {
    name: 'Fronde',
    category: 'weapon',
    quantity: 1,
    damage: '2d6',
    hands: 'weak',
    properties: ['portée moyenne', 'imprécis'],
  },
];

const armors: ArmorEquipment[] = [
  {
    name: 'Armure légère en cuir bouilli',
    category: 'armor',
    quantity: 1,
    defenseBonus: 'Agi +2',
  },
];

const inventory: InventoryEquipment[] = [
  {
    name: 'Dose de poison',
    category: 'inventory',
    quantity: 1,
    description: 'pour enduire les armes',
  },
  {
    name: 'Potion de Sang',
    category: 'inventory',
    quantity: 2,
  },
  {
    name: 'Corde 20m',
    category: 'inventory',
    quantity: 1,
  },
  {
    name: 'Grappin',
    category: 'inventory',
    quantity: 1,
  },
  {
    name: 'Menottes',
    category: 'inventory',
    quantity: 1,
  },
  {
    name: 'Vêtements de courtisane',
    category: 'inventory',
    quantity: 1,
  },
  {
    name: "Manteau d'hiver avec capuche",
    category: 'inventory',
    quantity: 1,
  },
  {
    name: 'Gants raffinés',
    category: 'inventory',
    quantity: 1,
  },
  {
    name: "Tour de cou en broderie + pierre",
    category: 'inventory',
    quantity: 1,
  },
  {
    name: "Sac d'aventurier",
    category: 'inventory',
    quantity: 1,
    description: "réparti sur l'armure",
  },
  {
    name: 'Faucon',
    category: 'inventory',
    quantity: 1,
  },
];

export const characterData: Character = {
  id: 'duchesse',
  name: 'Duchesse',
  description:
    'Jeune adulte svelte de taille moyenne, plusieurs traits physiques très attrayants. Se préoccupe avant tout de ses intérêts et de ceux de ses amis. Éduquée sous le culte du nouveau Dieu, sait lire la langue commune. Transformée en vampire par son amant pour avoir une compagne éternelle. Des spirales et autres motifs recouvrent sa peau, semblables à des tatouages.',
  progression: {
    level: '2',
    ascendance: 'Vampire',
    apprentice: 'Roublarde',
    expert: '',
    master: '',
  },
  professions: [
    { name: 'Apothicaire' },
    { name: 'Étiquette' },
    { name: 'Médecine' },
    { name: 'Meurrière' },
  ],
  attributes: {
    force: 12, intellect: 11, agility: 13, willpower: 11, perception: 11,
    health: 18, speed: 12, size: 1, spellpower: 0, healingRate: 0, defense: 13,
    damage: 0, madness: 6, corruption: 2,
  },
  immunities: [
    'dégâts du froid',
    'maladies',
    'poison',
    'endormi',
    'malade',
    'fatigué',
    'immobilisé',
    'empoisonné',
    'ralenti',
  ],
  activeAfflictions: [],
  talents: [
    { name: 'Peur superstitieuse : Argent', description: '', source: SourceBook.ARCANES },
    {
      name: "Saisir l'opportunité",
      description: "Une fois par round, quand le total de votre jet d'attaque est au moins de 20 et qu'il est supérieur d'au moins 5 points au seuil de difficulté, vous pouvez effectuer un autre tour à n'importe quel moment avant la fin du round.",
      source: SourceBook.CORE,
    },
    {
      name: 'Talent : escarmouche',
      description: "Vous pouvez utiliser une action pour vous déplacer à la moitié de votre Vitesse. Ce déplacement ne déclenche pas d'attaques gratuites. Pendant ce déplacement, vous pouvez effectuer une attaque. Vous effectuez ce jet d'attaque avec 1 désavantage mais l'attaque inflige 1d6 dégâts supplémentaires. Si vous choisissez ce talent une seconde fois vous pouvez vous déplacer à votre Vitesse normale et non la moitié.",
      source: SourceBook.CORE,
    },
    {
      name: 'Habile récupération',
      description: "Vous pouvez utiliser une action pour soigner un nombre de dégâts égal à votre vitesse de guérison et vous déplacer à la moitié de votre Vitesse sans déclencher d'attaques gratuites. Une fois que vous avez utilisé ce talent, vous ne pouvez plus le faire tant que vous ne vous êtes pas complètement reposé.",
      source: SourceBook.CORE,
    },
    {
      name: 'Ruse',
      description: "Une fois par round, vous pouvez effectuer un jet d'attaque ou un test avec 1 avantage. Si vous attaquez avec 1 avantage grâce à ce talent, votre attaque inflige 1d6 dégâts supplémentaires.",
      source: SourceBook.CORE,
    },
  ],
  magic: {
    power: 0,
    spells: [],
  },
  potions: [],
  equipment: [...weapons, ...armors, ...inventory],
  defense: 13,
  money: { totalShards: 3930 },
};
