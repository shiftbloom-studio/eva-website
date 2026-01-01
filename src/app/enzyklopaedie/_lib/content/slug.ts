export function slugify(input: string): string {
  return (
    input
      .trim()
      .toLowerCase()
      // German sharp-s is not decomposed by NFKD in a useful way for URLs.
      .replace(/ß/g, 'ss')
      .normalize('NFKD')
      // Strip diacritics.
      .replace(/[\u0300-\u036f]/g, '')
      // Replace anything non-alphanumeric with hyphens.
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  )
}

export function normalizeLookupKey(input: string): string {
  return slugify(input)
}
