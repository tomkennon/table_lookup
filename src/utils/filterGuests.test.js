import { describe, it, expect } from 'vitest';
import { filterGuests } from './filterGuests';
import guestsData from '../data/guests.json';

describe('filterGuests utility logic', () => {
  it('1. Empty filters return all guests', () => {
    const results = filterGuests(guestsData, '', 'All Tables');
    expect(results).toHaveLength(112);
  });

  it('2. "Hild" returns Abby Hilditch', () => {
    const results = filterGuests(guestsData, 'Hild', 'All Tables');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Abby Hilditch');
    expect(results[0].table).toBe('Table 14');
  });

  it('3. "Abby" returns exactly Abby Hilditch and Abby Jackson', () => {
    const results = filterGuests(guestsData, 'Abby', 'All Tables');
    expect(results).toHaveLength(2);
    const names = results.map((g) => g.name);
    expect(names).toContain('Abby Hilditch');
    expect(names).toContain('Abby Jackson');
  });

  it('4. "Abby" + Table 8 returns exactly Abby Jackson', () => {
    const results = filterGuests(guestsData, 'Abby', 'Table 8');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Abby Jackson');
    expect(results[0].table).toBe('Table 8');
  });

  it('5. Empty name + Table 8 returns all Table 8 guests', () => {
    const results = filterGuests(guestsData, '', 'Table 8');
    const expectedGuests = guestsData.filter((g) => g.table === 'Table 8');
    expect(results).toHaveLength(expectedGuests.length);
    results.forEach((g) => expect(g.table).toBe('Table 8'));
  });

  it('6. "Hild" + Table 8 returns zero results', () => {
    const results = filterGuests(guestsData, 'Hild', 'Table 8');
    expect(results).toHaveLength(0);
  });

  it('7. Search is case-insensitive', () => {
    const upper = filterGuests(guestsData, 'ABBY', 'All Tables');
    const lower = filterGuests(guestsData, 'abby', 'All Tables');
    const mixed = filterGuests(guestsData, 'AbBy', 'All Tables');

    expect(upper).toEqual(lower);
    expect(lower).toEqual(mixed);
    expect(upper).toHaveLength(2);
  });

  it('8. Partial matching works', () => {
    const results = filterGuests(guestsData, 'ackson', 'All Tables');
    // Jackson entries: Abby Jackson, Becca Jackson, Dave Jackson, Sonya Jackson, Tanner Jackson, Tyler Jackson
    expect(results.length).toBeGreaterThanOrEqual(6);
    results.forEach((g) => expect(g.name.toLowerCase()).toContain('ackson'));
  });

  it('9. Table filter works independently', () => {
    const results = filterGuests(guestsData, '', 'Table 1');
    expect(results.length).toBeGreaterThan(0);
    results.forEach((g) => expect(g.table).toBe('Table 1'));
  });

  it('10. Alphabetical sorting works', () => {
    const results = filterGuests(guestsData, '', 'All Tables');
    for (let i = 0; i < results.length - 1; i++) {
      const current = results[i].name;
      const next = results[i + 1].name;
      expect(current.localeCompare(next, undefined, { sensitivity: 'base' })).toBeLessThanOrEqual(0);
    }
  });

  it('11. SH Table works', () => {
    const results = filterGuests(guestsData, '', 'SH Table');
    expect(results).toHaveLength(2);
    const names = results.map((g) => g.name);
    expect(names).toContain('LAUREN KENNON');
    expect(names).toContain('TOM KENNON');
  });

  it('12. Names containing apostrophes, hyphens, and parentheses display and search correctly', () => {
    // Apostrophe: Ethan D'Orio
    const resultApostrophe = filterGuests(guestsData, "D'Orio", 'All Tables');
    expect(resultApostrophe).toHaveLength(1);
    expect(resultApostrophe[0].name).toBe("Ethan D'Orio");

    // Hyphen: Cassandra Zuluaga - Archibald & Susan Cornell-Kennon
    const resultHyphen = filterGuests(guestsData, 'Cornell-Kennon', 'All Tables');
    expect(resultHyphen).toHaveLength(1);
    expect(resultHyphen[0].name).toBe('Susan Cornell-Kennon');

    // Parentheses: Thomas Kennon (Dad)
    const resultParen = filterGuests(guestsData, '(Dad)', 'All Tables');
    expect(resultParen).toHaveLength(1);
    expect(resultParen[0].name).toBe('Thomas Kennon (Dad)');
  });
});
