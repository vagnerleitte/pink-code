import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash, copy, time } from 'ionicons/icons';
import { Storage, ScanEntry } from '../services/storage';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
  ],
})
export class HistoryPage implements OnInit {
  items: ScanEntry[] = [];
  loading = false;

  private store = inject(Storage);

  constructor() {
    addIcons({ trash, copy, time });
  }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.loading = true;
    try {
      this.items = await this.store.getHistory();
    } finally {
      this.loading = false;
    }
  }

  async clear() {
    await this.store.clearHistory();
    await this.load();
  }

  copy(text: string) {
    if (navigator?.clipboard) navigator.clipboard.writeText(text).catch(() => {});
  }
}
