export type EquipmentCategory = 'weapon' | 'armor' | 'inventory';

export interface BaseEquipment {
  name: string;
  category: EquipmentCategory;
  quantity?: number;  // default 1
}

export interface WeaponEquipment extends BaseEquipment {
  category: 'weapon';
  damage: string;
  hands: 'one' | 'two' | 'weak';
  properties: string[];
}

export interface ArmorEquipment extends BaseEquipment {
  category: 'armor';
  defenseBonus?: string;
}

export interface InventoryEquipment extends BaseEquipment {
  category: 'inventory';
  description?: string;
}

export type Equipment =
  | WeaponEquipment
  | ArmorEquipment
  | InventoryEquipment;
