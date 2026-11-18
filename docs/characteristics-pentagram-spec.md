# Spécification — Pentagramme des Caractéristiques

## Contexte

Refactorer le composant `CharacteristicsComponent` pour reproduire la pentagramme du sheet officiel Demonlord.

## Décisions clés

### 1. Structure géométrique

**Pentagramme inversé** : 2 sommets en haut, 1 pointe unique en bas.

```
              Force          Intellect
                 ●              ●
                   \            /
                    \          /
                 Agilité    Volonté
                     ●          ●
                        \      /
                         Santé
                            ●
```

| Sommet | Angle | Position |
|--------|-------|----------|
| Force | 324° (-36°) | haut-gauche |
| Intellect | 36° | haut-droite |
| Agilité | 252° (-108°) | milieu-gauche |
| Volonté | 108° | milieu-droite |
| Santé | 180° | bas-centre |

### 2. Attributs par sommet

| Sommet | Secondaire |
|--------|------------|
| Force | Gabarit |
| Intellect | Perception |
| Agilité | Vitesse |
| Volonté | Folie |
| Santé | Guérison |

### 3. Positions spéciales

| Cercle | Position |
|--------|----------|
| Dégâts | Centre géométrique (cercle inscrit) |
| Défense | Entre Agilité et Santé |
| Corruption | Entre Santé et Volonté |

### 4. Style visuel

- **Pentagramme** : lignes rouges (`#a02020`)
- **Cercles de caractéristiques** : bordures gris-doré (`rgba(184,168,136,0.7)`)
- **Fond** : sombre (`#0e0e1a`)
- **Police** : sans-serif (system-ui, -apple-system, Roboto, Arial)
- **Textes** : blanc/crème (`#e0d6c8`) pour les valeurs, doré (`#c9b47a`) pour les bonus

### 5. État KO (Dégâts = Santé)

Quand Dégâts ≥ Santé :
- Tous les cercles passent en rouge (`#a02020`)
- Tous les textes passent en rouge
- Badge "Hors Combat" avec animation pulsante

### 6. Labels sur courbe (SVG `<textPath>`)

Chaque label suit la courbe de son cercle :
- **Au-dessus** du cercle (partie supérieure)
- **Tangent** à la bordure
- **S** et **É** bas, **T** au sommet

Exemple pour Santé (centre 350, 610, rayon 40) :
```html
<path id="arc-sante" d="M 310 610 A 40 40 0 0 1 390 610" />
```

### 7. Z-index (3 couches)

| Z-index | Élément |
|---------|---------|
| **1** | Pentagramme SVG (lignes + cercles décoratifs) |
| **2** | Cercles de caractéristiques (HTML) |
| **3** | Labels SVG (`<textPath>`) |

**Important** : Les labels doivent être dans un **SVG séparé** du pentagramme pour que le z-index fonctionne.

### 8. Structure de données

Les données doivent être regroupées par sommet :

```typescript
interface CharacteristicVertex {
  name: string;        // "Force", "Intellect", etc.
  value: number;
  bonus?: string;
  secondary?: {
    name: string;      // "Gabarit", "Perception", etc.
    value: number;
    bonus?: string;
  };
}
```

### 9. Références

- Sheet officiel : `docs/demonlord-sample-sheet.jpg`
- Mockup normal : `docs/pentagram-spec.html`
- Mockup KO : `docs/pentagram-spec-ko.html`
