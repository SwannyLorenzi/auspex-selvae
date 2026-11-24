import type { Character } from '../demonlord-models';

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
  equipment: [
    {
      name: 'Armure légère en cuir bouilli',
      effect: 'Def = Agi +2 = 15',
    },
    { name: 'Vêtements de courtisane', effect: '' },
    { name: 'Manteau d\'hiver avec capuche', effect: '' },
    { name: 'Gants raffinés', effect: '' },
    {
      name: 'Tour de cou en broderie + pierre',
      effect: '',
    },
    {
      name: 'Fouet',
      effect: 'Dégâts 1d3, main faible, finesse, allonge +1',
    },
    {
      name: 'Rapière',
      effect: 'Dégâts 1d6+1, 1 main, finesse',
    },
    {
      name: 'Dague (x3)',
      effect: 'Dégâts 1d3, main faible, finesse, de jet, portée courte',
    },
    {
      name: 'Dose de poison (x1)',
      effect: 'pour enduire les armes',
    },
    {
      name: 'Corde 20m',
      effect: '',
    },
    { name: 'Grappin', effect: '' },
    { name: 'Menottes', effect: '' },
    {
      name: 'Sac d’aventurier',
      effect: 'réparti sur l’armure',
    },
    { name: 'Faucon', effect: '' },
    { name: 'Fronde', effect: 'dégats 2d6, main faible, portée moyenne, imprécis (1 désavantage)' };
  ],
  defense: 13,
  money: { totalShards: 3930 },
};
