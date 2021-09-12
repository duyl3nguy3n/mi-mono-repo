import { formatDate } from '@angular/common';

export type NativeDate = Date | string | number | null;

export class CustomDateAdapter {
  static readonly SHORT_DATE_FORMAT = 'MM/dd/yyyy';

  /**
   * Check if native date is a valid native date type
   */
  static isValidNativeDate(nativeDate: NativeDate): boolean {
    if (!nativeDate) {
      return true;
    }

    const date = nativeDate instanceof Date ? nativeDate : new Date(nativeDate);
    return date.toString() !== 'Invalid Date';
  }

  /**
   * Convert native date type to javascript Date type
   */
  static toLocaleDate(nativeDate: NativeDate): Date | null {
    if (!nativeDate) {
      return null;
    }

    const date = nativeDate instanceof Date ? nativeDate : new Date(nativeDate);
    if (date.toString() === 'Invalid Date') {
      throw new Error('Invalid Date');
    }

    return date;
  }

  /**
   * Format native date type that is in UTC to locale short date 'MM/dd/yyyy'
   */
  static formatUtcDateToLocaleShortDate(nativeDate: NativeDate): string {
    return nativeDate && this.isValidNativeDate(nativeDate)
      ? formatDate(nativeDate, this.SHORT_DATE_FORMAT, 'en', 'UTC')
      : '';
  }
}
