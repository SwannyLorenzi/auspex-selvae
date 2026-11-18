export interface Attribute {
  name: string;
  value: number;
  bonus?: string;
  bonusText?: string;
  secondary?: {
    name: string;
    value: number;
    bonus?: string;
  };
}

export interface DerivedAttribute {
  name: string;
  value: number;
  formula: string;
}

export interface CharacteristicVertex {
  name: string;        // "Force", "Intellect", etc.
  value: number;
  bonus?: string;
  secondary?: {
    name: string;      // "Gabarit", "Perception", etc.
    value: number;
    bonus?: string;
  };
}
