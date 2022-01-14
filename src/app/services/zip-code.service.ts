import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  private static readonly ZIP_CODE_STORAGE_KEY = 'weatherZipCodes';

  constructor() {
  }

  addZipCode(zipCode: string): void {
    const currentZipCodes = this.getZipCodes();
    if (currentZipCodes.includes(zipCode)) {
      return;
    }
    currentZipCodes.push(zipCode);
    localStorage.setItem(ZipCodeService.ZIP_CODE_STORAGE_KEY, JSON.stringify(currentZipCodes));
  }

  getZipCodes(): string[] {
    const currentZipCodesStored = localStorage.getItem(ZipCodeService.ZIP_CODE_STORAGE_KEY);
    return currentZipCodesStored ? JSON.parse(currentZipCodesStored) : [];
  }
}
