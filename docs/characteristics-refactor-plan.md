# Plan de refactor — Caractéristiques du personnage

## Contexte

Refactorer la structure de données des attributs de personnage pour le jeu Demonlord.
Le composant `CharacteristicsComponent` doit gérer le mapping entre les données
plates et le rendu du pentagramme.

## Décisions clés

### 1. Structure de données — Option 2 (propriétés nommées fixes)

Supprimer la distinction `mainAttributes` / `derivedAttributes` au profit d'une
interface plate avec des propriétés nommées.

```typescript
export interface CharacterData {
  // Core stats (jet de dé)
  force: number;
  intellect: number;
  agility: number;
  willpower: number;
  perception: number;

  // Static values
  health: number;
  speed: number;
  size: number;
  spellpower: number;
  healingRate: number;
  defense: number;

  // Dynamic values
  damage: number;
  madness: number;
  corruption: number;
}
```

**13 propriétés nommées, pas de type explicite.**
Le composant se charge de distinguer statique vs dynamique.

### 2. Classification des attributs

#### Type 1a — Core stats (jet de dé)
**Force, Intellect, Agilité, Volonté, Perception**
- Ont un **bonus au jet de dé** calculé : `<valeur> - 10`
- Exemple : Force 12 → `+2`, Agilité 8 → `-2`
- Utilisés pour les jets de dé : `1d20 + stat - 10`

#### Type 1b — Valeurs figées (non-jet)
**Santé, Vitesse, Taille/Gabarit, Spellpower, Vitesse de guérison, Défense**
- Figées à la création
- Pas de bonus au jet de dé

#### Type 2 — Dynamiques
**Dégâts, Folie, Corruption**
- Changent pendant une partie de jeu
- Dégâts : mis à jour via les boutons +/- dans le cercle centre
- Folie / Corruption : modifiables ailleurs (afflictions, etc.)

### 3. Suppressions

- **`bonusText`** supprimé (les "+1 avantage")
- **`formula`** supprimé (les "= Santé/4")
- **`withArmor` / `withArmorAndShield`** supprimés de `defense` (gestion future)
- **`defense`** devient un simple `number`

### 4. Mapping pentagramme

| Sommet Principal | Secondaire | Propriété |
|---|---|---|
| Force | Gabarit | `size` |
| Intellect | Perception | `perception` |
| Agilité | Vitesse | `speed` |
| Volonté | Folie | `madness` |
| Santé | Guérison | `healingRate` |

Positions spéciales :
- **Dégâts** → cercle centre (dynamique)
- **Défense** → entre Agilité et Santé (statique)
- **Corruption** → entre Santé et Volonté (dynamique)

## Implémentation

### Étape 1 : Nouveau modèle

**`characteristics-models.ts`** :
```typescript
export interface CharacterData {
  // Core stats (jet de dé)
  force: number;
  intellect: number;
  agility: number;
  willpower: number;
  perception: number;

  // Static values
  health: number;
  speed: number;
  size: number;
  spellpower: number;
  healingRate: number;
  defense: number;

  // Dynamic values
  damage: number;
  madness: number;
  corruption: number;
}
```

### Étape 2 : Mise à jour des character files

**`duchesse.ts`** :
```typescript
export const characterData: CharacterData = {
  force: 12, intellect: 11, agility: 13, willpower: 11, perception: 11,
  health: 15, speed: 12, size: 1, spellpower: 0, healingRate: 0, defense: 13,
  damage: 0, madness: 6, corruption: 2,
};
```

**`77.ts`** :
```typescript
export const characterData: CharacterData = {
  force: 11, intellect: 13, agility: 8, willpower: 9, perception: 15,
  health: 23, speed: 8, size: 1, spellpower: 3, healingRate: 5, defense: 14,
  damage: 0, madness: 0, corruption: 0,
};
```

### Étape 3 : Refactor du composant

**`characteristics.ts`** :
- Supprimer `mainAttributes` / `derivedAttributes` inputs
- Ajouter un seul input `data: input.required<CharacterData>()`
- `vertices()` computed : grouper les attributs par sommet du pentagramme
- `isKO()` computed : `data().damage >= data().health`
- `isCore()` helper : `['force', 'intellect', 'agility', 'willpower', 'perception']`

**`characteristics.html`** :
- Utiliser `data()` au lieu de `mainAttributes()` / `derivedAttributes()`
- Calculer les bonus à la volée : `value - 10`
- Afficher les boutons +/- pour les attributs dynamiques

### Étape 4 : Mise à jour des templates parents

**`demonlord.html`** :
- Remplacer `[mainAttributes]="..."` et `[derivedAttributes]="..."`
- Par `[data]="character()"`

### Étape 5 : Nettoyage

- Supprimer `mainAttributes` et `derivedAttributes` du composant
- Supprimer `bonusText` et `formula` des interfaces
- Supprimer `withArmor` et `withArmorAndShield` de `defense`
- Mettre à jour les tests

## Ordre d'exécution

1. Nouveau modèle `characteristics-models.ts`
2. Mise à jour `duchesse.ts` et `77.ts`
3. Refactor `characteristics.ts`
4. Refactor `characteristics.html`
5. Refactor `characteristics.scss`
6. Mise à jour `demonlord.html`
7. Mise à jour `characteristics.spec.ts`
8. Validation `tsc --noEmit` + `ng build`
