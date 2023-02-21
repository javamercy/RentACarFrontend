import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  add(key: string, value: any): void {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(...keys: string[]): void {
    for (let key of keys) {
      localStorage.removeItem(key);
    }
  }

  update(key: string, value: any): void {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
