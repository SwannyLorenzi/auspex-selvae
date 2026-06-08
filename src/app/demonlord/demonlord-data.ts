import { Character } from './demonlord-models';

export const characterData: Character = {
  name: '7 7',
  nickname: 'La Tavernière',
  description: '7 7 est une femme humaine de taille moyenne et de corpulence un peu forte. Cheveux roux mi longs, yeux verts',
  progression: {
    level: '5',
    ascendance: 'Automate',
    apprentice: 'Magicienne',
    expert: 'Grand Brasseur',
    master: '-',
  },
  professions: [
    { name: 'Sciences (académique)' },
    { name: 'Alchimiste' },
  ],
  mainAttributes: [
    { name: 'Force', value: 11, bonus: '+1', bonusText: '+1 avantage' },
    { name: 'Intellect', value: 13, bonus: '+3', bonusText: '' },
    { name: 'Perception', value: 15, bonus: '+5', bonusText: '' },
    { name: 'Volonté', value: 9, bonus: '-1', bonusText: '' },
    { name: 'Agilité', value: 8, bonus: '-2', bonusText: '+1 avantage' },
  ],
  derivedAttributes: [
    { name: 'Vitesse', value: 8, formula: '' },
    { name: 'Taille/Gabarit', value: 1, formula: '' },
    { name: 'Défense', value: 14, formula: '' },
    { name: 'Défense avec bouclier', value: 16, formula: '' },
    { name: 'Puissance', value: 3, formula: '' },
    { name: 'Santé', value: 23, formula: '(= Force + bonus de niveaux)' },
    { name: 'Vitesse de guérison', value: 5, formula: '(= Santé/4)' },
  ],
  immunities: ['maladies', 'poison', 'endormi', 'fatigué', 'malade', 'empoisonné'],
  talents: [
    'Corps mécanique',
    'Tour de magie',
    'Perception de la magie',
    'Récupération de sorts',
    'Livre du Grand-Brasseur',
    'Se référer à la recette',
    'Contresort',
    'Clef',
  ],
  magic: [
    {
      tradition: 'Hors tradition',
      isHorsTradition: true,
      spells: [
        { name: 'Perception de la magie', level: 0 },
      ],
    },
    {
      tradition: 'Alchimie',
      spells: [
        { name: 'Identification de substance', level: 0 },
        { name: 'Globe acide', level: 0 },
        { name: 'Concoction de potion', level: 1 },
        { name: 'Nappe d\'huile', level: 2 },
      ],
    },
    {
      tradition: 'Enchantement',
      spells: [
        { name: 'Présence', level: 0 },
        { name: 'Propos convaincants', level: 0 },
        { name: 'Charme', level: 1 },
        { name: 'Éveiller la passion', level: 2 },
      ],
    },
    {
      tradition: 'Divination',
      spells: [
        { name: 'Epiphanie', level: 0 },
        { name: 'Indiscrétion', level: 0 },
      ],
    },
    {
      tradition: 'Illusion',
      spells: [
        { name: 'Clameur', level: 0 },
        { name: 'DIssimuler un objet', level: 0 },
        { name: 'Fantasme', level: 3 },
      ],
    },
  ],
  potions: [
    { name: 'Cocktail de Caecras', cost: 'rayon de 5m', effect: '2d6 dégâts + feu agi + 1 désavantage pour ½ dégâts' },
    { name: 'Potion de Puissance', cost: '5ca', effect: 'Force +1 pendant 3d6 minutes' },
    { name: 'Potion de Sagacité', cost: '5ca', effect: 'Intellect +1 pendant 3d6 minutes' },
    { name: 'Potion de soin', cost: '2ca', effect: 'soin = vitesse de guerison' },
    { name: 'Potion de Croissance', cost: '5ca', effect: 'Gabarit -> 2 ou +1, +2d6 santé +1d6 dégâts pendant 1d6 minutes' },
    { name: 'Potion de Vision', cost: '5ca', effect: '' },
    { name: 'Potion Anti toxine', cost: '5ca', effect: '' },
  ],
  equipment: [
    { name: 'Argent', effect: '28 or, 3 argent, 4 cuivre, 0 éclat' },
    { name: 'Amplificateur de force', effect: '+1 avantage aux tests de Force, +1 dégâts au corps à corps' },
    { name: 'Stabilisateur gyroscopique', effect: '+1 avantage aux tests d\'Agilité, +1 Défense' },
    { name: 'Module de sens supérieur', effect: '+2 Perception' },
    { name: 'Trousse d\'Alchimiste', effect: '' },
    { name: 'Hache de bataille', effect: '1d6+2 dégâts' },
    { name: 'Grand Bouclier', effect: 'Defense + 2' },
    { name: 'Insigne du Duc de la butée du bouclier', effect: 'Agit avec l\'autorité du Duc' },
  ],
  currency: '28 or, 3 argent, 4 cuivre, 0 éclat',
};
