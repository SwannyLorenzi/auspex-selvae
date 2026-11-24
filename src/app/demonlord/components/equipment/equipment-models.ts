export type EquipmentCategory = 'weapon' | 'armor' | 'inventory';

export interface BaseEquipment {
  name: string;
  category: EquipmentCategory;
  quantity: number;
}

export interface WeaponEquipment extends BaseEquipment {
  category: 'weapon';
  damage: string;           // ex: "1d3", "1d6+1", "2d6"
  hands: 'one' | 'two' | 'weak';
  properties: string[];     // ex: ["finesse", "allonge +1", "de jet"]
}

export interface ArmorEquipment extends BaseEquipment {
  category: 'armor';
  defenseBonus?: string;    // ex: "Agi +2", "Defense + 2"
}

export interface InventoryEquipment extends BaseEquipment {
  category: 'inventory';
  description?: string;     // ex: "pour enduire les armes", "Agit avec l'autorité du Duc"
}

export type Equipment =
  | WeaponEquipment
  | ArmorEquipment
  | InventoryEquipment;
