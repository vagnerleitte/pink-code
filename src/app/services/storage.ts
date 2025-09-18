import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface ScanEntry {
  content: string;
  timestamp: number; // epoch ms
}

@Injectable({
  providedIn: 'root'
})
export class Storage {
  private readonly HISTORY_KEY = 'scan_history';

  async getHistory(): Promise<ScanEntry[]> {
    const { value } = await Preferences.get({ key: this.HISTORY_KEY });
    if (!value) return [];
    try {
      const parsed = JSON.parse(value) as ScanEntry[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async addEntry(content: string): Promise<void> {
    const history = await this.getHistory();
    history.unshift({ content, timestamp: Date.now() });
    await Preferences.set({ key: this.HISTORY_KEY, value: JSON.stringify(history) });
  }

  async clearHistory(): Promise<void> {
    await Preferences.remove({ key: this.HISTORY_KEY });
  }
}
