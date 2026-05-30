# DemonLord — Shadow of the Demon Lord Character Sheet Rules

Structuring a character sheet for the TTRPG **Shadow of the Demon Lord** (system by Free League Publishing, using the Demon Core engine).

## Character Sheet Structure

A character sheet follows this section order:

### 1. Personnage

- **Joueur:** (1 line text) Name of the player interpreting the character
- **Nom:** (1 line text) Character name, optionally with a nickname/dit
- **Description:** (multi line text) Physical appearance and key traits

### 2. Progression

Track character advancement with these fields (in order):

| Field          | Data type     |  Description                                                  |
| -------------- | ------------- | ------------------------------------------------------------- |
| **Niveau**     | Integer       | Current level (integer). Determines general character power   |
| **Ascendance** | One line text | Character race/ancestry (e.g., Automate, Humain).             |
| **Apprenti**   | One line text | Class or class archetype (e.g., Magicienne).                  |
| **Expert**     | One line text | Specialization or feat choice (e.g., Grand Brasseur).         |
| **Maître**     | One line text | Master-level advancement (e.g., Technomancien).               |

### 3. Professions

List professions or general fields of knowledge the character has.
These professions are only usefull on roleplay style: it is usually considered that the character success in any attempt of action (outside combat) when it depends on one of its professions.
In some particularly risky / uncertain situations, it gives advantages to the corresponding roll.
The Game master judges how and when professions apply.

Data type for each profession is one line text :

```
ProfessionName (optional precision)
```

Examples:
- `Science (connaissance académique)`
- `Alchimiste`
- `Tavernier`
- `Astrologie (connaissance académique)`

### 4. Caractéristiques

#### Principales (Primary Attributes)

Five core attributes, each expressed as a **value** with a **modifier** and optional **advantage** or **disadvantages**:

```
**AttributeName Value** +/-Modifier (+advantages) (-disadvantages)
```

| Attribute      | Notes                              |
| -------------- | ---------------------------------- |
| **Force**      | Physical power, combat             |
| **Intellect**  | Mental stat, spellcasting          |
| **Perception** | Awareness                          |
| **Volonté**    | Willpower, also spellcasting       |
| **Agilité**    | Dexterity, reflexes, also combat   |

Attributes consist of these values :
- Base value: integer between 1 (lowest) and 20 (highest allowed). It represents the core value for the character and can be used as roll threshold for opponents' skill tests.
- Modifier: integer between -10 and +10, exact formula is `Modifier = (base value) - 10`. Is used as direct bonus/malus for the corresponding skill test.

Optional bonuses :
- Advantages: integer value usually bewteen 0 (no advantage - show nothing) to 5 (very very rare).
  Explanation: Sometimes the character has permanent bonus to a specific skill test. Advantages give one additional dice for the test, tracking them alongside skill modifier allows the player to not forget about dices to throw.

#### Dérivées (Derived Statistics)

Computed from primary attributes and equipment:

| Stat                    | Formula                                  | Example |
| ----------------------- | ---------------------------------------- | ------- |
| **Vitesse**             | Based on Agilité                         | 8       |
| **Taille/Gabarit**      | Sert at creation                         | 1       |
| **Défense**             | Base + armor/boost + shield bonuses      | 14+2    |
| **Puissance**           | Based on character progression           | 3       |
| **Santé**               | Force + level bonuses                    | 23      |
| **Vitesse de guérison** | Santé / 4                                | 5       |

### 5. Talents

List talents/abilities granted by character proogression (ancestry, classes, etc.)
Data type : title + description

Examples:
- **Immunités**: List of conditions the character is immune to (maladies, poison, endormi, etc.)
- **Clef**: Key talents (signature abilities)
- **Corps mécanique**: Passive/built-in abilities
- **Tour de magie**: Per-spell abilities (e.g., +1 spell per tradition on discovery)
- Other named talent categories

Format each talent as a bullet point with name and optional effect description.

### 6. Magie

Organize spells by **Tradition** (magic school):

```
## (TraditionName)

### **SpellName** (level) Uses [][][]
decription / effect of the spell
```

- Spells have a **tradition** (school) and a **level** (0-based integer in parentheses)
- Spells can also be **Hors tradition** (outside any tradition)
- Examples of traditions: Alchimie, Enchantement, Divination, Illusion

Each spell can be used a several number of times per day, based on character Puissance.

### 7. Livre du Grand-Brasseur

Potion recipes (special class feature). Format:

```
**RecipeName** cost, effectDescription, effectDuration
```

- **RecipeName** one line text, name of the potion
- `effectDescription` multi line text, describe the effect of the potion (damage, heal, etc.)
- `cost` integer + currency, cost of the potion in currency (example: 1 argent, 2 gold, 3 cuivre)
- `effectDuration` integer or diceNotation, duration of the potion. may be constant (--> integer) or random (nulber of dices to throw, example 3d6)

### 8. Equipement

Track equipment in sub-categories:

- **Argent**: Currency with denominations (or, argent, cuivre, éclat)
  1 Or = 10 Argent, 1 Argent = 10 Cuivre, 1 Cuivre = 10 Eclat
- **Objets/Capacités**: Passive items with bonuses
- **Armes**: Name + damage dice (e.g., `1d6+2 dégâts`)
- **Armures/ boucliers**: Defense bonuses
- **Objets de quête**: Narrative items with special authority

Format:

```
**ItemName** : description or bonus
**WeaponName** : damageDice+modifier dégâts
```

## Rule Summary

- **Attributes** range around 5–15 for typical characters; modifiers range from -5 to +5
- **Health** = Core Attribute (Force) + level bonuses
- **Healing rate** = Health / 4 (per minute)
- **Defense** = Base (10 + Agilité modifier) + armor/boost + shield
- **Damage** = Weapon dice + attribute modifier (Force for melee)
- **Spell levels** are 0-based integers
- **Advantages** replace disadvantages on affected rolls (re-roll, take best)
- **Immunities** negate specific condition types
