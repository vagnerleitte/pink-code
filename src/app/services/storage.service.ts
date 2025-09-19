import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const KEY = 'history';

@Injectable({ providedIn: 'root' })
export class StorageService {
  async all(): Promise<string[]> {
    const { value } = await Preferences.get({ key: KEY });
    return value ? JSON.parse(value) : [];
  }

  async save(item: string) {
    const list = await this.all();
    list.unshift(item);
    await Preferences.set({
      key: KEY,
      value: JSON.stringify(list.slice(0, 50)),
    });
  }

  async clear() {
    await Preferences.remove({ key: KEY });
  }
}
