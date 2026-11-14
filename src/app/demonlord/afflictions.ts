export interface AfflictionDef {
  key: string;
  emoji: string;
  label: string;
}

export const ALL_AFFLICTIONS: AfflictionDef[] = [
  { key: 'a-terre', emoji: '⬇️', label: 'À terre' },
  { key: 'affaibli', emoji: '📉', label: 'Affaibli' },
  { key: 'assourdi', emoji: '🔇', label: 'Assourdi' },
  { key: 'aveugle', emoji: '🙈', label: 'Aveuglé' },
  { key: 'charme', emoji: '💖', label: 'Charmé' },
  { key: 'contraint', emoji: '⛓️', label: 'Contraint' },
  { key: 'effraye', emoji: '😱', label: 'Effrayé' },
  { key: 'empoisonne', emoji: '🤢', label: 'Empoisonné' },
  { key: 'endormi', emoji: '💤', label: 'Endormi' },
  { key: 'etourdi', emoji: '💫', label: 'Étourdi' },
  { key: 'fatigue', emoji: '😫', label: 'Fatigué' },
  { key: 'hebeté', emoji: '😵‍💫', label: 'Hébété' },
  { key: 'immobilise', emoji: '⚓', label: 'Immobilisé' },
  { key: 'inconscient', emoji: '💀', label: 'Inconscient' },
  { key: 'malade', emoji: '🦠', label: 'Malade' },
  { key: 'ralenti', emoji: '🐌', label: 'Ralenti' },
  { key: 'saisi', emoji: '✊', label: 'Saisi' },
  { key: 'sans-defense', emoji: '🛡️', label: 'Sans défense' },
  { key: 'surpris', emoji: '❗', label: 'Surpris' },
];

/** Check if a key is in the list of all afflictions */
export function isAffliction(key: string): boolean {
  return ALL_AFFLICTIONS.some((a) => a.key === key);
}

/** Get all affliction keys */
export function allAfflictionKeys(): string[] {
  return ALL_AFFLICTIONS.map((a) => a.key);
}
