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
    {
      name: 'Vision des ténèbres',
      description: "À portée moyenne, vous voyez dans des zones d'ombres ou de ténèbres comme si elles étaient éclairées. Au-delà de cette distance, vous considérez les zones d'ombres comme des ombres et les ombres comme étant éclairées.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Lié au sire',
      description: "Vous êtes lié au vampire qui vous a créé jusqu'à ce qu'il utilise une action pour vous libérer ou qu'il soit détruit. Vous ne pouvez pas attaquer votre procréateur et devez lui obéir tant qu'il est à portée courte.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Apparence effrayante',
      description: "Lorsque vous attaquez une créature vivante qui peut vous voir, la cible doit effectuer un test de Volonté. La cible est effrayée pendant 1 min en cas d'échec. En cas de succès, elle est immunisée contre votre Apparence effrayante jusqu'à ce qu'elle se soit reposée.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Arme naturelle',
      description: "Vous avez de longs crocs considérés comme une arme rapide dotée de la propriété finesse qui inflige 1d6 dégâts.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Existence contre nature',
      description: "Votre vitesse de guérison est égale à 0 et vous ne pouvez pas soigner. Votre vitesse de guérison est égale à 0 et vous ne pouvez pas soigner naturellement.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Réserve de sang',
      description: "Vous mesurez le sang que vous avez accumulé grâce à une réserve de points de sang. Lors de votre transformation en vampire, vous gagnez 1 point de sang par le biais du vampire qui vous a engendré. Vous ajoutez des points de sang dans votre réserve en utilisant le talent Absorption de sang (voir ci-après), jusqu'à un nombre maximum égal à 1 + le niveau de votre groupe. Chaque fois que vous vous reposez, vous devez dépenser 1 point de votre réserve de sang. Si votre réserve ne contient plus aucun point, vous cumulez 1 Folie et subissez un malus de -1d6 à votre Santé (minimum 0 ; voir Torpeur ci-après). Le malus est cumulatif et vous êtes affaibli tant que vous le subissez. Vous pouvez supprimer ce malus cumulé en utilisant une action pour dépenser 1 point de sang.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Guérison par le sang',
      description: "Vous pouvez utiliser une action ou une action déclenchée à votre tour pour dépenser 1 point de sang et soigner un montant de dégâts égal à 1 + le niveau de votre groupe.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Torpeur',
      description: "Quand le malus infligé par le trait Réserve de sang réduit votre Santé à 0, vous tombez inconscient en prenant l'aspect d'un cadavre. Si vous subissez des dégâts lorsque vous êtes inconscient, vous êtes instantanément détruit. Par une action, une créature peut vous faire boire le sang d'une créature vivante pour supprimer le malus cumulé sur votre Santé et mettre fin à cette affliction.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Absorption de sang',
      description: "Quand une créature vivante que vous avez saisie subit les dégâts d'une attaque avec vos crocs, elle subit pendant un round un malus à sa Santé égal à sa vitesse de guérison, et vous ajoutez 1 point à votre réserve de sang. La créature est fatiguée tant qu'elle subit ce malus.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Superstition : Argent métal',
      description: "Tant que l'objet de votre peur superstitieuse (voir p. 129) se trouve dans votre champ de vision, vous faites vos jets d'attaque et vos tests avec 3 désavantages.",
      source: SourceBook.ARCANES,
    },
    {
      name: 'Brûlé par le soleil',
      description: "Vous subissez 2d6 dégâts et réduisez de 1 votre réserve de sang à la fin de chaque round pendant lequel vous êtes dans une zone éclairée par la lumière du soleil. De même, les sorts Célestes vous infligent le double des dégâts, et vous effectuez vos tests pour vous en protéger avec 1 désavantage.",
      source: SourceBook.ARCANES,
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
