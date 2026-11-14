export const IMMUNITY_EMOJI: Record<string, string> = {
  'maladies': '🦠',
  'poison': '☠️',
  'empoisonné': '☠️',
  'endormi': '😴',
  'fatigué': '😴',
  'malade': '🤢',
  'immobilisé': '⛓️',
  'ralenti': '🐌',
  'dégâts du froid': '❄️',
};

export function immunityEmoji(name: string): string {
  return IMMUNITY_EMOJI[name.toLowerCase()] ?? '🛡️';
}
