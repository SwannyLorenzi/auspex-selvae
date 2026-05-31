import { Component } from '@angular/core';
import { Identity } from './identity/identity';
import { Progression } from './progression/progression';
import { Professions } from './professions/professions';
import { Characteristics } from './characteristics/characteristics';
import { Talents } from './talents/talents';
import { Magic } from './magic/magic';
import { Potions } from './potions/potions';
import { Equipment } from './equipment/equipment';

interface Attribute {
  name: string;
  value: number;
  modifier: number;
  advantages: number;
}

interface DerivedStat {
  name: string;
  value: number | string;
  formula: string;
}

interface Spell {
  name: string;
  level: number;
  uses: number;
}

interface SpellTradition {
  name: string;
  spells: Spell[];
}

interface Talent {
  name: string;
  description?: string;
}

interface Potion {
  name: string;
  cost: string;
  effect: string;
}

interface EquipmentItem {
  name: string;
  description: string;
}

@Component({
  selector: 'app-character-sheet',
  imports: [Identity, Progression, Professions, Characteristics, Talents, Magic, Potions, Equipment],
  templateUrl: './character-sheet.html',
  styleUrl: './character-sheet.scss',
})
export class CharacterSheet {
  character = {
    playerName: '',
    name: '7 7',
    nickname: 'La Tavernière',
    description:
       '7 7 est une femme humaine de taille moyenne et de corpulence un peu forte. Cheveux roux mi longs, yeux verts',
   };

  progression = {
    level: 5,
    ancestry: 'Automate',
    apprentice: 'Magicienne',
    expert: 'Grand Brasseur',
    master: '',
   };

  professions = ['Science (Académique)', 'Alchimiste'];

  attributes: Attribute[] = [
     { name: 'Force', value: 11, modifier: 1, advantages: 1 },
     { name: 'Intellect', value: 13, modifier: 3, advantages: 0 },
     { name: 'Perception', value: 15, modifier: 5, advantages: 0 },
     { name: 'Volonté', value: 9, modifier: -1, advantages: 0 },
     { name: 'Agilité', value: 8, modifier: -2, advantages: 1 },
   ];

  derivedStats: DerivedStat[] = [
     { name: 'Vitesse', value: 8, formula: 'Basé sur Agilité' },
     { name: 'Taille/Gabarit', value: 1, formula: 'Création' },
     {
      name: 'Défense',
      value: '14+2',
      formula: '13 base + 1 boost + 2 bouclier',
     },
     { name: 'Puissance', value: 3, formula: 'Progression' },
     { name: 'Santé', value: 23, formula: 'Force + bonus de niveaux' },
     {
      name: 'Vitesse de guérison',
      value: 5,
      formula: 'Santé/4',
     },
   ];

  talents: Talent[] = [
     {
      name: 'Immunités',
      description: 'maladies, poison, endormi, fatigué, malade, empoisonné',
     },
     { name: 'Clef' },
     { name: 'Corps mécanique' },
     {
      name: 'Tour de magie',
      description: '+1 sort niv 0 à chaque découverte d\'une tradition',
     },
     { name: 'Perception de la magie' },
     { name: 'Récupération de sorts' },
     { name: 'Livre du Grand-Brasseur' },
     { name: 'Se référer à la recette' },
     { name: 'Contresort' },
   ];

  traditions: SpellTradition[] = [
     {
      name: 'Hors tradition',
      spells: [
         { name: 'Perception de la magie', level: 0, uses: 0 },
       ],
     },
     {
      name: 'Alchimie',
      spells: [
         { name: 'Identification de substance', level: 0, uses: 0 },
         { name: 'Globe acide', level: 0, uses: 0 },
         { name: 'Concoction de potion', level: 1, uses: 1 },
         { name: 'Nappe d\'huile', level: 2, uses: 2 },
       ],
     },
     {
      name: 'Enchantement',
      spells: [
         { name: 'Présence', level: 0, uses: 0 },
         { name: 'Propos convaincants', level: 0, uses: 0 },
         { name: 'Charme', level: 1, uses: 1 },
         { name: 'Éveiller la passion', level: 2, uses: 2 },
       ],
     },
     {
      name: 'Divination',
      spells: [
         { name: 'Epiphanie', level: 0, uses: 0 },
         { name: 'Indiscrétion', level: 0, uses: 0 },
       ],
     },
     {
      name: 'Illusion',
      spells: [
         { name: 'Clameur', level: 0, uses: 0 },
         { name: 'Dissimuler un objet', level: 0, uses: 0 },
         { name: 'Fantasme', level: 3, uses: 3 },
       ],
     },
   ];

  potions: Potion[] = [
     {
      name: 'Cocktail de Caecras',
      cost: '5ca',
      effect: 'rayon de 5m, 2d6 dégâts + feu agi + 1 désavantage pour ½ dégâts',
     },
     {
      name: 'Potion de Puissance',
      cost: '5ca',
      effect: 'Force +1 pendant 3d6 minutes',
     },
     {
      name: 'Potion de Sagacité',
      cost: '5ca',
      effect: 'Intellect +1 pendant 3d6 minutes',
     },
     {
      name: 'Potion de soin',
      cost: '2ca',
      effect: 'soin = vitesse de guérison',
     },
     {
      name: 'Potion de Croissance',
      cost: '5ca',
      effect: 'Gabarit -> 2 ou +1, +2d6 santé +1d6 dégâts pendant 1d6 minutes',
     },
     {
      name: 'Potion de Vision',
      cost: '5ca',
      effect: '',
     },
     {
      name: 'Potion Anti-toxine',
      cost: '5ca',
      effect: '',
     },
   ];

  equipment: EquipmentItem[] = [
     { name: 'Argent', description: '28 or, 3 argent, 4 cuivre, 0 éclat' },
     {
      name: 'Amplificateur de force',
      description: '+1 avantage aux tests de Force, +1 dégâts au corps à corps',
     },
     {
      name: 'Stabilisateur gyroscopique',
      description: '+1 avantage aux tests d\'Agilité, +1 Défense',
     },
     {
      name: 'Module de sens supérieur',
      description: '+2 Perception',
     },
     { name: 'Trousse d\'Alchimiste', description: '' },
     {
      name: 'Hache de bataille',
      description: '1d6+2 dégâts',
     },
     {
      name: 'Grand Bouclier',
      description: 'Defense + 2',
     },
     {
      name: 'Insigne du Duc',
      description: 'de la butée du bouclier : Agit avec l\'autorité du Duc',
     },
   ];
}
