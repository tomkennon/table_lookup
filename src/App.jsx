import React, { useState, useMemo } from 'react';
import guestsData from './data/guests.json';
import { filterGuests } from './utils/filterGuests';
import './App.css';

const TABLES_LIST = [
  'All Tables',
  'Table 1',
  'Table 2',
  'Table 3',
  'Table 4',
  'Table 5',
  'Table 6',
  'Table 7',
  'Table 8',
  'Table 9',
  'Table 10',
  'Table 11',
  'Table 12',
  'Table 13',
  'Table 14',
  'Table 15',
  'Table 16',
  'Table 17',
  'Table 18',
  'Table 19',
  'SH Table'
];

export function App() {
  const [nameQuery, setNameQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState('All Tables');

  const filteredGuests = useMemo(() => {
    return filterGuests(guestsData, nameQuery, selectedTable);
  }, [nameQuery, selectedTable]);

  return (
    <div className="app-container">
      <header>
        <h1 className="header-title">Find Your Table</h1>
        <p className="header-subtitle">Search your name to find your seating table</p>
      </header>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="name-search" className="filter-label">
            Full Name
          </label>
          <input
            id="name-search"
            type="text"
            className="filter-input"
            placeholder="Search by name..."
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            aria-label="Search by name"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="table-select" className="filter-label">
            Table Number
          </label>
          <select
            id="table-select"
            className="filter-select"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            aria-label="Filter by table number"
          >
            {TABLES_LIST.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-meta">
        <span>
          Showing {filteredGuests.length} {filteredGuests.length === 1 ? 'guest' : 'guests'}
        </span>
      </div>

      {filteredGuests.length > 0 ? (
        <div className="guest-table-container">
          <table className="guest-table">
            <thead>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col" className="guest-table-cell">
                  Table
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest, index) => (
                <tr key={`${guest.name}-${index}`}>
                  <td className="guest-name">{guest.name}</td>
                  <td className="guest-table-cell">
                    <span
                      className={`table-badge ${
                        guest.table === 'SH Table' ? 'sh-table' : ''
                      }`}
                    >
                      {guest.table}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No guests found.</p>
        </div>
      )}
    </div>
  );
}

export default App;
