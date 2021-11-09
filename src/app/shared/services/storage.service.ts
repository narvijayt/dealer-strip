import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    // private nativeStorage: NativeStorage
  ) { }

  async store(storageKey: string, value: any) {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }
    
  // Get the value
  async get(storageKey: string) {
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
