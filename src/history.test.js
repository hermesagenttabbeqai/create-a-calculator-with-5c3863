import { describe, it, expect, beforeEach } from 'vitest';
import { addEntry, getEntries, clearHistory } from './history.js';

beforeEach(() => {
  clearHistory();
});

describe('history store', () => {
  it('getEntries returns empty array initially', () => {
    expect(getEntries()).toEqual([]);
  });

  it('after addEntry, getEntries returns array with that entry', () => {
    addEntry('1+1', '2');
    const entries = getEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].expression).toBe('1+1');
    expect(entries[0].result).toBe('2');
  });

  it('entry has correct expression and result fields', () => {
    addEntry('3*4', '12');
    const entries = getEntries();
    expect(entries[0]).toEqual({ expression: '3*4', result: '12' });
  });

  it('multiple entries are returned in insertion order', () => {
    addEntry('1+1', '2');
    addEntry('2+2', '4');
    addEntry('3+3', '6');
    const entries = getEntries();
    expect(entries).toHaveLength(3);
    expect(entries[0].expression).toBe('1+1');
    expect(entries[1].expression).toBe('2+2');
    expect(entries[2].expression).toBe('3+3');
  });

  it('clearHistory empties the array', () => {
    addEntry('5+5', '10');
    clearHistory();
    expect(getEntries()).toEqual([]);
  });

  it('getEntries returns a copy (mutating it does not affect the store)', () => {
    addEntry('7+7', '14');
    const copy = getEntries();
    copy.push({ expression: 'injected', result: '999' });
    expect(getEntries()).toHaveLength(1);
  });

  it('mutating a returned entry object does not affect the store', () => {
    addEntry('9+9', '18');
    const copy = getEntries();
    copy[0].expression = 'mutated';
    expect(getEntries()[0].expression).toBe('9+9');
  });
});
