/**
 * Filters and sorts guest list based on search query and selected table filter.
 *
 * @param {Array<{name: string, table: string}>} guests - List of guest objects
 * @param {string} nameQuery - Full name search string
 * @param {string} selectedTable - Selected table filter ("All Tables" or specific table name)
 * @returns {Array<{name: string, table: string}>} - Filtered and sorted guest array
 */
export function filterGuests(guests = [], nameQuery = '', selectedTable = 'All Tables') {
  const normalizedQuery = nameQuery.trim().toLowerCase();

  return guests
    .filter((guest) => {
      // Name filter check (case-insensitive partial match against entire full name)
      const matchesName =
        !normalizedQuery || guest.name.toLowerCase().includes(normalizedQuery);

      // Table filter check (AND logic)
      const matchesTable =
        !selectedTable ||
        selectedTable === 'All Tables' ||
        guest.table === selectedTable;

      return matchesName && matchesTable;
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
}
