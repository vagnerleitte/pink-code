import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonNote,
  IonToggle,
  IonItem,
  IonListHeader,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonNote,
    IonToggle,
    IonLabel,
    IonItem,
    IonListHeader,
    CommonModule,
    FormsModule,
  ],
})
export class SettingsPage {
  constructor() {}
}
