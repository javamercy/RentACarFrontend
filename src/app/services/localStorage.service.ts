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

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  removeAtSpesificTime(key: string, expiration: string) {
    let miliseconds: number = new Date(expiration).getTime() - Date.now();

    setTimeout(() => {
      localStorage.removeItem(key);
    }, miliseconds);
  }

  update(key: string, value: any): void {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
