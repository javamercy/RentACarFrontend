import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }


  add(key: string, value: any): void {
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
    }

    sessionStorage.setItem(key, JSON.stringify(value));
  }

  remove(...keys: string[]): void {
    for (let key of keys) {
      sessionStorage.removeItem(key);
    }
  }

  update(key: string, value: any): void {
    sessionStorage.removeItem(key);
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }
}
