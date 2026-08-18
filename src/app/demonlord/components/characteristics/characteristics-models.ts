export interface Attribute {
  name: string;
  value: number;
  bonus?: string;
  bonusText?: string;
}

export interface DerivedAttribute {
  name: string;
  value: number;
  formula: string;
}
