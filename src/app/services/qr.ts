import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class Qr {
  private active = false;

  async ensurePermission(): Promise<boolean> {
    const status = await BarcodeScanner.checkPermission({ force: true });
    return status.granted === true;
  }

  private setBackground(active: boolean) {
    const body = document.querySelector('body');
    if (!body) return;
    if (active) {
      body.classList.add('scanner-active');
    } else {
      body.classList.remove('scanner-active');
    }
  }

  async startScan(): Promise<string | null> {
    const granted = await this.ensurePermission();
    if (!granted) return null;

    this.active = true;
    this.setBackground(true);
    await BarcodeScanner.hideBackground();

    try {
      const result = await BarcodeScanner.startScan();
      const content = (result as any)?.content;
      return content ?? null;
    } finally {
      await this.stopScan();
    }
  }

  async stopScan(): Promise<void> {
    if (!this.active) return;
    this.active = false;
    try {
      await BarcodeScanner.showBackground();
    } catch {}
    try {
      await BarcodeScanner.stopScan();
    } catch {}
    this.setBackground(false);
  }
}
