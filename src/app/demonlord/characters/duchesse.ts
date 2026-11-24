import type { Character } from '../demonlord-models';
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
    damage: '1d3',
    hands: 'weak',
    properties: ['finesse', 'allonge +1'],
  },
  {
    name: 'Rapière',
    category: 'weapon',
    damage: '1d6+1',
    hands: 'one',
    properties: ['finesse'],
  },
  {
    name: 'Dague',
    category: 'weapon',
    damage: '1d3',
    hands: 'weak',
    properties: ['finesse', 'de jet', 'portée courte'],
    quantity: 3,
  },
  {
    name: 'Fronde',
    category: 'weapon',
    damage: '2d6',
    hands: 'weak',
    properties: ['portée moyenne', 'imprécis (1 désavantage)'],
  },
];

const armors: ArmorEquipment[] = [
  {
    name: 'Armure légère en cuir bouilli',
    category: 'armor',
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
  },
  {
    name: "Manteau d'hiver avec capuche",
    category: 'inventory',
  },
  {
    name: 'Gants raffinés',
    category: 'inventory',
  },
  {
    name: "Tour de cou en broderie + pierre",
    category: 'inventory',
  },
  {
    name: "Sac d'aventurier",
    category: 'inventory',
    description: "réparti sur l'armure",
  },
  {
    name: 'Faucon',
    category: 'inventory',
  },
];

export const characterData: Character = {
  id: 'duchesse',
  name: 'Duchesse',
  description:
    'Jeune adulte svelte de taille moyenne, plusieurs traits physiques très attrayants. Se préoccupe avant tout de ses intérêts et de ceux de ses amis. Éduquée sous le culte du nouveau Dieu, sait lire la langue commune. Transformée en vampire par son amant pour avoir une compagne éternelle. Des spirales et autres motifs recouvrent sa peau, semblables à des tatouages.',
  progression: {
    level: '1',
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
    health: 15, speed: 12, size: 1, spellpower: 0, healingRate: 0, defense: 13,
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
  talents: ['Peur superstitieuse : Argent'],
  magic: {
    power: 0,
    spells: [],
  },
  potions: [],
  equipment: [...weapons, ...armors, ...inventory],
  defense: 13,
  money: { totalShards: 3930 },
};
