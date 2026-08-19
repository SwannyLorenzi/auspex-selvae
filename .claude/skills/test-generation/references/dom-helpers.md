# Querying the DOM in tests

## Why not `@testing-library/angular`

It is the obvious candidate and the wrong one here. It has a history of lagging behind Angular majors,
and this project deliberately tracks the latest version of everything — so the library that would make
queries nicer is also the library most likely to block `ng update`. The alternative costs about thirty
lines that we own outright.

## The helper

Create `src/testing/dom.ts` if it does not exist:

```ts
/** Query helpers that target what a user (or a screen reader) perceives, not the markup. */

const IMPLICIT_ROLES: Record<string, string> = {
  BUTTON: 'button',
  A: 'link',
  H1: 'heading',
  H2: 'heading',
  H3: 'heading',
  H4: 'heading',
  H5: 'heading',
  H6: 'heading',
  LI: 'listitem',
  UL: 'list',
  OL: 'list',
  TABLE: 'table',
  INPUT: 'textbox',
  SELECT: 'combobox',
  IMG: 'img',
  NAV: 'navigation',
  MAIN: 'main',
  SECTION: 'region',
};

function roleOf(element: Element): string | null {
  return element.getAttribute('role') ?? IMPLICIT_ROLES[element.tagName] ?? null;
}

/** The name a screen reader would announce: aria-label, then aria-labelledby, then text content. */
export function accessibleName(element: Element): string {
  const label = element.getAttribute('aria-label');
  if (label) return label.trim();

  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const target = element.ownerDocument.getElementById(labelledBy);
    if (target) return (target.textContent ?? '').trim();
  }

  return (element.textContent ?? '').replace(/\s+/g, ' ').trim();
}

export function queryAllByRole(root: ParentNode, role: string, name?: string | RegExp): Element[] {
  return [...root.querySelectorAll('*')]
    .filter((element) => roleOf(element) === role)
    .filter((element) => {
      if (name === undefined) return true;
      const actual = accessibleName(element);
      return typeof name === 'string' ? actual === name : name.test(actual);
    });
}

/** Single match or null. Throws on multiple matches: an ambiguous query is a test that will rot. */
export function byRole(root: ParentNode, role: string, name?: string | RegExp): Element | null {
  const matches = queryAllByRole(root, role, name);
  if (matches.length > 1) {
    throw new Error(
      `Ambiguous query: ${matches.length} elements with role "${role}"` +
        (name ? ` named ${name}` : '') +
        '. Narrow the query or scope the root.',
    );
  }
  return matches[0] ?? null;
}
```

The map covers the roles this project needs; extend it when a scenario needs a role that is missing,
rather than falling back to a CSS selector.

## How to use it

```ts
Then('the reset control is available', () => {
  const reset = byRole(host(), 'button', 'Réinitialiser toutes les utilisations de sorts');
  expect(reset).not.toBeNull();
  expect((reset as HTMLButtonElement).disabled).toBe(false);
});

Then('the three spells are listed', () => {
  expect(queryAllByRole(host(), 'listitem')).toHaveLength(3);
});
```

Note the expected name is **French**: the application renders French and has no i18n layer, so an
English expected string would make the test permanently red for the wrong reason. The step *phrase* is
English; the *data* is whatever is on screen.

## Why role-based queries, specifically

Written before the template exists, `byRole(host(), 'button', '…')` can only be satisfied by markup
with a real button and a real accessible name. So the test *is* the accessibility specification, and
this project's AXE / WCAG AA requirement stops being an audit at the end and becomes a condition of
being done.

The secondary benefit is durability: a restyle or a markup refactor does not touch these tests,
whereas `querySelectorAll('.tradition-section')` breaks on a CSS rename and passes on an accessibility
regression — exactly backwards.

`data-testid` remains available as a last resort, for elements with no role and no stable visible text.
Reach for it after trying role and text, not before.
