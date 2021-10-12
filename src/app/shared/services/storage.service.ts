import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    // private nativeStorage: NativeStorage
  ) { }

  async store(storageKey: string, value: any) {
    // const encryptedValue = btoa(escape(JSON.stringify(value)));
    // localStorage.setItem(storageKey, encryptedValue);
    localStorage.setItem(storageKey, JSON.stringify(value));
  }
    
    // Get the value
    async get(storageKey: string) {
      // const ret = localStorage.getItem(storageKey);
      // return JSON.parse(unescape(atob(ret)));
      let value = JSON.parse(localStorage.getItem(storageKey));
      return value;
    }
    
    async removeStorageItem(storageKey: string) {
      localStorage.removeItem(storageKey);
    }
    
    // Clear storage
    async clear() {
      localStorage.clear();
    }
}
