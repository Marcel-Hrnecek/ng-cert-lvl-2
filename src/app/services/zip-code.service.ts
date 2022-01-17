import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  private static readonly ZIP_CODE_STORAGE_KEY = 'weatherZipCodes';

  constructor() {
  }

  addZipCode(zipCode: string): void {
    if (this.isZipCodeAlreadyStored(zipCode)) {
      return;
    }
    const currentZipCodes = this.getZipCodes();
    currentZipCodes.push(zipCode);
    localStorage.setItem(ZipCodeService.ZIP_CODE_STORAGE_KEY, JSON.stringify(currentZipCodes));
  }

  removeZipCode(zipCode: string): void {
    let currentZipCodes = this.getZipCodes();
    currentZipCodes = currentZipCodes.filter(zc => zc !== zipCode);
    localStorage.setItem(ZipCodeService.ZIP_CODE_STORAGE_KEY, JSON.stringify(currentZipCodes));
  }

  getZipCodes(): string[] {
    const currentZipCodesStored = localStorage.getItem(ZipCodeService.ZIP_CODE_STORAGE_KEY);
    return currentZipCodesStored ? JSON.parse(currentZipCodesStored) : [];
  }

  isZipCodeAlreadyStored(zipCode: string): boolean {
    const currentZipCodes = this.getZipCodes();
    return currentZipCodes.includes(zipCode);
  }
}
