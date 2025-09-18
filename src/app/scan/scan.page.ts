import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, close, checkmark, copy, time, trash } from 'ionicons/icons';
import { Qr } from '../services/qr';
import { Storage, ScanEntry } from '../services/storage';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
  ],
})
export class ScanPage {
  isScanning = false;
  lastResult: string | null = null;
  saving = false;

  private qr = inject(Qr);
  private store = inject(Storage);

  constructor() {
    addIcons({ camera, close, checkmark, copy, time, trash });
  }

  async start() {
    this.isScanning = true;
    this.lastResult = null;
    try {
      const content = await this.qr.startScan();
      if (content) {
        this.lastResult = content;
        await this.save(content);
      }
    } finally {
      this.isScanning = false;
    }
  }

  async cancel() {
    await this.qr.stopScan();
    this.isScanning = false;
  }

  async save(content: string) {
    this.saving = true;
    try {
      await this.store.addEntry(content);
    } finally {
      this.saving = false;
    }
  }

  copyToClipboard(text: string) {
    if (navigator?.clipboard) navigator.clipboard.writeText(text).catch(() => {});
  }
}
