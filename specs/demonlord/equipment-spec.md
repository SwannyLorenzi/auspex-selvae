# Spécification — Équipement

## Contexte

Refactorer le modèle et le composant d'équipement pour structurer l'inventaire du personnage en 3 catégories distinctes, avec des comportements et un affichage adaptés à chaque type.

## Décisions clés

### 1. Les 3 catégories d'équipement

| Catégorie | Interactivité | Affiche | Impact sur la fiche |
|-----------|---------------|---------|---------------------|
| **Armes** | Équipable / déséquipable | Dégâts (xdy+z), Main occupée, Propriétés (tags) | Affichage structuré en plusieurs champs |
| **Armures** | Équipable / déséquipable | Bonus de Défense | Modifie la Défense totale |
| **Inventaire** | Compteur modifiable | Quantité, Description / Effet | Suit le stock disponible |

Tous les items ont un champ `quantity` (par défaut 1). En théorie, tout équipement peut être perdu lors d'une partie.

### 2. Affichage quantité

La quantité `Nx` n'est affichée **que si strictement supérieure à 1** (donc 2, 3, etc.).
Si `quantity === 1` ou non définie, la quantité n'apparaît pas.

### 3. Modèle TypeScript

```typescript
export type EquipmentCategory = 'weapon' | 'armor' | 'inventory';

export interface BaseEquipment {
  name: string;
  category: EquipmentCategory;
  quantity?: number;  // default 1
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
```

### 4. Données de test

**Duchesse** (15 items) :
| Catégorie | Count | Items |
|-----------|-------|-------|
| Armes (4) | 4 | Fouet, Rapière, Dague (x3), Fronde |
| Armures (1) | 1 | Armure légère en cuir bouilli |
| Inventaire (11) | 11 | Dose de poison (x1), Potion de Sang (x2), Corde 20m, Grappin, Menottes, Vêtements de courtisane, Manteau d'hiver, Sac d'aventurier, Gants raffinés, Tour de cou, Faucon |

**7 7** (7 items) :
| Catégorie | Count | Items |
|-----------|-------|-------|
| Armes (1) | 1 | Hache de bataille |
| Armures (1) | 1 | Grand Bouclier |
| Inventaire (5) | 5 | Amplificateur de force, Stabilisateur gyroscopique, Module de sens supérieur, Trousse d'Alchimiste, Insigne du Duc |

### 5. Structure de fichiers

```
src/app/demonlord/
├── components/
│   └── equipment/
│       ├── equipment-models.ts    # Types Equipment
│       ├── equipment.ts           # Composant principal
│       ├── equipment.html         # Template
│       ├── equipment.scss         # Styles
│       └── equipment.spec.ts      # Tests
```
