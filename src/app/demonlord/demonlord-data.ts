import { Character } from './demonlord-models';
import { SourceBook, SpellType } from './components/magic/magic-models';
import {
  Alchimie,
  Aucune,
  Divination,
  Enchantement,
  Illusion,
} from './components/magic/references/traditions';

export const characterData: Character = {
  name: '7 7',
  nickname: 'La Tavernière',
  description:
    '7 7 est une femme humaine de taille moyenne et de corpulence un peu forte. Cheveux roux mi longs, yeux verts',
  progression: {
    level: '5',
    ascendance: 'Automate',
    apprentice: 'Magicienne',
    expert: 'Grand Brasseur',
    master: '-',
  },
  professions: [{ name: 'Sciences (académique)' }, { name: 'Alchimiste' }],
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
  immunities: [
    'maladies',
    'poison',
    'endormi',
    'fatigué',
    'malade',
    'empoisonné',
  ],
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
  magic: {
    power: 3,
    spells: [
      {
        name: 'Perception de la magie',
        level: 0,
        tradition: Aucune,
        type: SpellType.UTILITY,
        currentUses: 0,
        areaOfEffect:
          'Une sphère de 5 m de rayon centrée sur un point de votre espace.',
        effect:
          'Vous savez s’il y a des effets magiques actifs dans la zone et d’où ils proviennent.',
        foundIn: SourceBook.CORE,
      },
      {
        name: 'Identification de substance',
        level: 0,
        tradition: Alchimie,
        type: SpellType.UTILITY,
        currentUses: 0,
        target: 'Une substance que vous pouvez voir à portée courte.',
        effect: `
          Vous découvrez le nom de la cible et ce qu’elle fait.
          Si la cible est une potion vous découvrez aussi la formule pour la préparer avec le sort <em>concoction de potion</em>
        `,
        foundIn: SourceBook.COMPANION,
      },
      {
        name: 'Globe acide',
        level: 0,
        tradition: Alchimie,
        type: SpellType.ATTACK,
        currentUses: 0,
        target: 'Une créature ou un objet à portée courte',
        effect: `
          Un globe luisant de matière corrosive apparaît dans votre main et vous le lancez sur une cible.
          Effectuez un jet d’attaque d’Intellect contre son Agilité.
          En cas de succès, elle subit 1d6 +2 dégâts.
        `,
        bonus20Plus: 'La cible subit 1d6 dégâts supplémentaires.',
        foundIn: SourceBook.COMPANION,
      },
      {
        name: 'Concoction de potion',
        level: 1,
        tradition: Alchimie,
        type: SpellType.UTILITY,
        currentUses: 0,
        conditions:
          'Vous devez avoir une trousse d’alchimiste, un petit récipient vide et des ingrédients spéciaux d’une valeur égale à la moitié du prix de la potion.',
        effect: `
          Choisissez une potion que vous avez précédemment identifiée avec une utilisation du sort <em>identification de substance</em> puis concentrez‐vous pendant 1 heure en travaillant avec votre trousse d’alchimiste.
          Une fois ce délai écoulé, vous remplissez le récipient avec une dose de la potion choisie.',
        `,
        foundIn: SourceBook.COMPANION,
      },
      {
        name: "Nappe d'huile",
        level: 2,
        tradition: Alchimie,
        type: SpellType.ATTACK,
        currentUses: 0,
        areaOfEffect:
          'Cercle d’un rayon de 5 m centré sur un point\n' +
          'du sol à portée courte',
        duration: '10 min',
        effect: `
         <p>Une pluie d’huile s’abat sur toute la zone.
         Elle est extrêmement glissante et la transforme en terrain difficile.
         Une fois par round, lorsqu’une créature se déplace sur une surface de cette zone autrement qu’en rampant ou tente de s’y mettre debout,
         elle doit réussir un test d’Agilité avec 3 désavantages ou tomber à terre.
         Toute créature qui tente de ramasser un objet dans l’huile doit réussir un test d’Agilité avec 3 désavantages.
         En cas d’échec, l’objet lui échappe et atterrit à 1d3 m dans une direction aléatoire.</p>
         <p>L’huile est inflammable.
         Si un objet de la zone subit des dégâts de feu, la zone entière s’enflamme et brûle pendant 1d6 min, remplissant l’air d’une fumée âcre.
         La fumée obscurcit fortement la zone, et toute créature qui respire et se trouve là doit réussir un test de Force ou subir 1d6 dégâts.
         De plus, à la fin de chaque round, le feu inflige 1d6 dégâts à tout ce qui se trouve dans sa zone d’effet.
         Une fois le feu éteint, l’huile disparaît.</p>
        `,
        foundIn: SourceBook.PHILOSOPHY,
      },
      {
        name: 'Présence',
        level: 0,
        tradition: Enchantement,
        type: SpellType.UTILITY,
        currentUses: 0,
        duration: '1 min',
        effect:
          'Pendant la durée du sort, les créatures habituellement attirées par des membres de votre espèce effectuent leurs jets d’attaque contre vous avec 1 désavantage.',
        foundIn: SourceBook.CORE,
      },
      {
        name: 'Propos convainquants',
        level: 0,
        tradition: Enchantement,
        type: SpellType.ATTACK,
        currentUses: 0,
        target: 'Une créature à portée courte qui vous voit et vous entend',
        effect:
          'Effectuez un jet d’attaque d’Intellect contre la Volonté de la cible. Sur un succès, la cible est charmée pendant 1 round.',
        triggered:
          'À votre tour, vous pouvez utiliser une action déclenchée pour lancer ce sort.',
        bonus20Plus: 'La cible est charmée pendant 1 min.',
        foundIn: SourceBook.PHILOSOPHY,
      },
      {
        name: 'Charme',
        level: 1,
        tradition: Enchantement,
        type: SpellType.ATTACK,
        currentUses: 0,
        target: 'Une créature à portée courte qui peut vous voir',
        effect: `
          Effectuez un jet d’attaque d’Intellect contre la Volonté de la cible.
          Si vous, ou un membre de votre groupe avez attaqué la cible depuis la dernière fois que vous vous êtes reposé, vous effectuez le jet d’attaque avec 1 désavantage.
          Sur un succès, elle est charmée pendant 1 h ou jusqu’à ce qu’elle subisse des dégâts.
        `,
        bonus20Plus:
          'La cible est à la place charmée pendant 1d6 heures ou jusqu’à ce qu’elle subisse des dégâts.',
        foundIn: SourceBook.CORE,
      },
      {
        name: 'Éveiller la passion',
        level: 2,
        tradition: Enchantement,
        type: SpellType.UTILITY,
        currentUses: 0,
        target: 'Jusqu’à trois créatures à portée courte',
        duration: 'Concentration, jusqu’à 1 min ; voir l’effet',
        effect: `
          Chaque cible devient passionnée pour la durée du sort.
          Jusqu’à la fin de l’effet, la cible effectue ses jets d’attaque et ses tests avec 2 avantages.
          Lorsqu’une cible obtient un échec sur un jet d’attaque ou un test, elle peut transformer cet échec en succès, mais le sort prend alors fin immédiatement pour toutes les cibles affectées par le sort.
        `,
        foundIn: SourceBook.PHILOSOPHY,
      },

      {
        name: 'Epiphanie',
        level: 0,
        tradition: Divination,
        type: SpellType.UTILITY,
        currentUses: 0,
        effect: '',
        triggered: `
          Vous pouvez utiliser une action déclenchée pour lancer ce sort quand vous effectuez un test ou un jet d’attaque.
          Vous lancez le d20 deux fois et vous choisissez le meilleur résultat.
        `,
        foundIn: SourceBook.CORE,
      },
      {
        name: 'Indiscrétion',
        level: 0,
        tradition: Divination,
        type: SpellType.UTILITY,
        currentUses: 0,
        duration: 'Concentration, jusqu’à 1 min',
        effect: `
          Choisissez un point dans un espace que vous pouvez voir à portée longue.
          Pendant la durée du sort, vous pouvez entendre comme si vous vous trouviez à l’emplacement du point choisi.
        `,
        foundIn: SourceBook.CORE,
      },

      {
        name: 'Clameur',
        level: 0,
        tradition: Illusion,
        type: SpellType.UTILITY,
        currentUses: 0,
        target: 'Un point dans un espace situé jusqu’à portée moyenne',
        duration: '1 min',
        effect: `
          Un son de votre choix est émis à partir du point ciblé.
          Il peut s’agir d’un bruit ou d’une voix qui s’exprime dans une langue que vous connaissez et son volume peut être aussi doux qu’un murmure ou aussi bruyant qu’un coup de tonnerre.
          Pendant la durée du sort, vous pouvez modifier le son pour simuler des effets comme des épées qui s’entrechoquent, une conversation ou des bruits de pas qui approchent ou s’éloignent.
        `,
        foundIn: SourceBook.CORE,
      },
      {
        name: 'Dissimuler un objet',
        level: 0,
        tradition: Illusion,
        type: SpellType.UTILITY,
        currentUses: 0,
        target: 'Un objet de Gabarit 1/2 ou inférieur à portée courte',
        duration: '1 min',
        effect: `
        Vous faites en sorte que l’objet soit caché pour la durée du sort.
        Lorsqu’une créature devrait prendre conscience de la cible par l’intermédiaire de l’un de ses sens,
        par exemple en la touchant ou en la voyant, elle doit faire un test de Perception avec 1 désavantage.
        Sur un succès, elle perçoit l’objet normalement.
        Sur un échec, elle ne peut plus le percevoir jusqu’à la fin du sort.
        `,
        sacrifice: `
        Lorsqu’une créature dans votre champ de vision vous attaque,
        vous pouvez utiliser une action déclenchée et dépenser une utilisation de ce sort pour imposer 1 désavantage au jet d’attaque déclencheur.
        `,
        foundIn: SourceBook.PHILOSOPHY,
      },
      {
        name: 'Fantasme',
        level: 3,
        tradition: Illusion,
        type: SpellType.UTILITY,
        currentUses: 0,
        areaOfEffect:
          'Un cube de 4 m de côté ayant pour origine un point que vous pouvez voir jusqu’à portée longue.',
        duration: '1 h ; voir l’effet',
        effect: `
        <p>Une illusion d’une créature, d’un objet ou d’une force
qui semble en tous points réelle apparaît dans la zone.
Si vous ne pouvez la voir à la fin du round, l’effet cesse
immédiatement.</p>
<p>Si vous créez l’illusion d’une force dangereuse, comme du
feu ou de l’eau bouillante, une créature se déplaçant dans cet
espace doit réussir un test de Perception ou subir 3d6 dégâts.</p>
<p>Si vous créez l’illusion d’une créature, elle se déplace et se
comporte de manière réaliste et utilise votre valeur d’Intellect pour ses caractéristiques, sa Défense et sa Santé. Elle
ignore toutes les afflictions et disparaît quand elle est neutralisée, ce qui met un terme à l’effet. Pendant la durée du
sort, vous pouvez utiliser une action pour déplacer l’illusion
jusqu’à 10 m et attaquer une créature à 1 m d’elle qui peut la
voir et qui pense qu’elle est réelle. Effectuez un jet d’attaque
d’Intellect contre sa Perception. Sur un succès, la cible croit
qu’elle a été blessée, brûlée ou affectée d’une autre manière
par l’illusion et subit 4d6 dégâts.</p>
        `,
        bonus20Plus: '',
        foundIn: SourceBook.CORE,
      },
    ],
  },
  potions: [
    {
      name: 'Cocktail de Caecras',
      cost: 'rayon de 5m',
      effect: '2d6 dégâts + feu agi + 1 désavantage pour ½ dégâts',
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
      effect: 'soin = vitesse de guerison',
    },
    {
      name: 'Potion de Croissance',
      cost: '5ca',
      effect: 'Gabarit -> 2 ou +1, +2d6 santé +1d6 dégâts pendant 1d6 minutes',
    },
    { name: 'Potion de Vision', cost: '5ca', effect: '' },
    { name: 'Potion Anti toxine', cost: '5ca', effect: '' },
  ],
  equipment: [
    { name: 'Argent', effect: '28 or, 3 argent, 4 cuivre, 0 éclat' },
    {
      name: 'Amplificateur de force',
      effect: '+1 avantage aux tests de Force, +1 dégâts au corps à corps',
    },
    {
      name: 'Stabilisateur gyroscopique',
      effect: "+1 avantage aux tests d'Agilité, +1 Défense",
    },
    { name: 'Module de sens supérieur', effect: '+2 Perception' },
    { name: "Trousse d'Alchimiste", effect: '' },
    { name: 'Hache de bataille', effect: '1d6+2 dégâts' },
    { name: 'Grand Bouclier', effect: 'Defense + 2' },
    {
      name: 'Insigne du Duc de la butée du bouclier',
      effect: "Agit avec l'autorité du Duc",
    },
  ],
  currency: '28 or, 3 argent, 4 cuivre, 0 éclat',
};
