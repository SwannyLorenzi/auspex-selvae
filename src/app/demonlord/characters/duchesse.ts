import type { Character } from '../demonlord-models';

export const characterData: Character = {
  id: 'duchesse',
  name: 'Duchesse',
  nickname: '',
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
  mainAttributes: [
    { name: 'Force', value: 12, bonus: '+2', bonusText: '' },
    { name: 'Intellect', value: 11, bonus: '+1', bonusText: '' },
    { name: 'Perception', value: 11, bonus: '+1', bonusText: '' },
    { name: 'Volonté', value: 11, bonus: '+1', bonusText: '' },
    { name: 'Agilité', value: 13, bonus: '+3', bonusText: '' },
  ],
  derivedAttributes: [
    { name: 'Taille/Gabarit', value: 1, formula: '' },
    { name: 'Défense', value: 13, formula: '' },
    { name: 'Puissance', value: 0, formula: '' },
    { name: 'Santé', value: 15, formula: '' },
    { name: 'Vitesse de guérison', value: 0, formula: '' },
    { name: 'Folie', value: 6, formula: '' },
    { name: 'Corruption', value: 2, formula: '' },
    { name: 'Dégâts', value: 0, formula: '' },
  ],
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
      name: 'Dose de poison (x2)',
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
  ],
  money: { couronnes: 2, chelins: 0, sous: 8, eclats: 0 },
};
