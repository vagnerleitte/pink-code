import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  IonButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonToolbar,
  IonContent,
  IonTitle,
  ViewWillEnter,
} from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';

@Component({
  standalone: true,
  selector: 'app-history',
  templateUrl: './history.page.html',

  imports: [
    IonHeader,
    IonIcon,
    IonButton,
    IonList,
    IonToolbar,
    IonItem,
    IonLabel,
    IonTitle,
    IonContent,
    CommonModule,
  ],
})
export class HistoryPage implements ViewWillEnter {
  list = signal<Record<string, string[]>>({}); // group by section
  items: any = [];

  constructor(private store: StorageService) {}
  ionViewWillEnter(): void {
    this.load();
  }
  async load() {
    this.items = (await this.store.all()) || [];
    const sections: Record<string, string[]> = {};
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 864e5).toDateString();

    this.items.forEach((code: string | number | Date) => {
      const key =
        new Date(code).toDateString() === today
          ? 'Today'
          : new Date(code).toDateString() === yesterday
          ? 'Yesterday'
          : 'Last 7 Days';
      sections[key] ??= [];
      sections[key].push(code as unknown as string);
    });
    this.list.set(sections);
  }

  clear() {
    console.log(`clear`);
  }

  copy(content: string) {
    console.log(`copied`);
  }
}
