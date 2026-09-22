import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component UI tests', () => {
  it('renders header title and search inputs', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /find your table/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /filter by table number/i })).toBeInTheDocument();
  });

  it('filters by name input in UI', () => {
    render(<App />);
    const nameInput = screen.getByPlaceholderText(/search by name/i);

    fireEvent.change(nameInput, { target: { value: 'Hild' } });

    expect(screen.getByText('Abby Hilditch')).toBeInTheDocument();
    expect(screen.getAllByText('Table 14').length).toBeGreaterThan(0);
    expect(screen.queryByText('Abby Jackson')).not.toBeInTheDocument();
  });

  it('filters by table select in UI', () => {
    render(<App />);
    const tableSelect = screen.getByRole('combobox', { name: /filter by table number/i });

    fireEvent.change(tableSelect, { target: { value: 'SH Table' } });

    expect(screen.getByText('LAUREN KENNON')).toBeInTheDocument();
    expect(screen.getByText('TOM KENNON')).toBeInTheDocument();
    expect(screen.queryByText('Abby Hilditch')).not.toBeInTheDocument();
  });

  it('shows "No guests found." when no matching results', () => {
    render(<App />);
    const nameInput = screen.getByPlaceholderText(/search by name/i);
    const tableSelect = screen.getByRole('combobox', { name: /filter by table number/i });

    fireEvent.change(nameInput, { target: { value: 'Hild' } });
    fireEvent.change(tableSelect, { target: { value: 'Table 8' } });

    expect(screen.getByText('No guests found.')).toBeInTheDocument();
  });
});
