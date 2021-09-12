import { CustomDateAdapter } from './custom-date-adapter';

describe('CustomDateAdapter', () => {
  it('toLocaleDate() should convert native date type to javascript Date type', () => {
    // should handle null value
    [null, undefined, ''].forEach((value) => {
      expect(CustomDateAdapter.toLocaleDate(value)).toBeNull();
    });

    // should throw error for invalid value
    ['invalid', new Date('invalid')].forEach((value) => {
      expect(() => CustomDateAdapter.toLocaleDate(value)).toThrow();
    });

    // should convert native date to Date type
    const now = new Date();
    [
      // short date format
      { value: '03/06/2021', expected: '2021-03-06T05:00:00.000Z' },
      // ISO format
      {
        value: '2021-03-06',
        expected: '2021-03-06T00:00:00.000Z',
      },
      {
        value: '2021-03-06T00:00:00.000Z',
        expected: '2021-03-06T00:00:00.000Z',
      },
      {
        value: '2021-03-06T05:00:00.000Z',
        expected: '2021-03-06T05:00:00.000Z',
      },
      {
        value: '2021-03-06T05:20:19.000Z',
        expected: '2021-03-06T05:20:19.000Z',
      },
      // Date type
      {
        value: now,
        expected: now.toJSON(),
      },
      {
        value: new Date('03/06/2021'),
        expected: '2021-03-06T05:00:00.000Z',
      },
      {
        value: new Date('2021-03-06'),
        expected: '2021-03-06T00:00:00.000Z',
      },
      {
        value: new Date('2021-03-06T00:00:00.000Z'),
        expected: '2021-03-06T00:00:00.000Z',
      },
      {
        value: new Date('2021-03-06T05:00:00.000Z'),
        expected: '2021-03-06T05:00:00.000Z',
      },
    ].forEach((t) => {
      expect(CustomDateAdapter.toLocaleDate(t.value).toJSON()).toBe(t.expected);
    });
  });

  it(`formatUtcDateToLocaleShortDate() should format native date type that is in UTC to locale short date 'MM/dd/yyyy'`, () => {
    // should format null value to empty string
    [null, undefined, ''].forEach((value) => {
      expect(CustomDateAdapter.formatUtcDateToLocaleShortDate(value)).toBe('');
    });

    // should format native date
    [
      {
        value: '03/06/2021',
        expected: '03/06/2021',
      },
      {
        value: '2021-03-06T00:00:00.000Z',
        expected: '03/06/2021',
      },
      {
        value: '2021-03-06T05:00:00.000Z',
        expected: '03/06/2021',
      },
      {
        value: new Date('03/06/2021'),
        expected: '03/06/2021',
      },
      {
        value: new Date('2021-03-06'),
        expected: '03/06/2021',
      },
      {
        value: new Date('2021-03-06T00:00:00.000Z'),
        expected: '03/06/2021',
      },
      {
        value: new Date('2021-03-06T05:00:00.000Z'),
        expected: '03/06/2021',
      },
    ].forEach((t) => {
      expect(CustomDateAdapter.formatUtcDateToLocaleShortDate(t.value)).toBe(
        t.expected,
      );
    });
  });
});
