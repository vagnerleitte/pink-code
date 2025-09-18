import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settings, scan, images, flash, create, time, close } from 'ionicons/icons';
import { Qr } from '../services/qr';
import { Storage } from '../services/storage';
import { Router } from '@angular/router';

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
    IonIcon,
    IonButtons,
    IonFab,
    IonFabButton,
    CommonModule,
    FormsModule,
  ],
})
export class ScanPage {
  private qr = inject(Qr);
  private store = inject(Storage);
  private router = inject(Router);

  isScanning = false;
  lastResult: string | null = null;

  constructor() {
    addIcons({ settings, scan, images, flash, create, time, close });
  }

  async onFabClick() {
    if (this.isScanning) return this.cancel();
    await this.start();
  }

  async start() {
    this.isScanning = true;
    this.lastResult = null;
    try {
      const content = await this.qr.startScan();
      if (content) {
        this.lastResult = content;
        await this.store.addEntry(content);
      }
    } finally {
      this.isScanning = false;
    }
  }

  async cancel() {
    await this.qr.stopScan();
    this.isScanning = false;
  }

  goHistory() {
    this.router.navigateByUrl('/history');
  }
}
