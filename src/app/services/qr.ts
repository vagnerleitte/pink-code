import { Injectable } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class Qr {
  private active = false;

  async startScan(): Promise<string | null> {
    this.active = true;
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: (17 as CapacitorBarcodeScannerTypeHint), // ALL
        scanInstructions: '',
        scanButton: false,
      });
      const content = (result as any)?.ScanResult ?? null;
      return content ?? null;
    } catch (e) {
      return null;
    } finally {
      this.active = false;
    }
  }

  async stopScan(): Promise<void> {
    // Plugin atual não expõe stop; manter no-op para compatibilidade
    this.active = false;
  }
}
