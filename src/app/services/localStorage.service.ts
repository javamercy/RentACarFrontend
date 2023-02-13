import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  add(key: string, value: string): void {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }

    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  removeAtSpesificTime(key: string, expiration: string) {
    let miliseconds: number =
      new Date(expiration).getMilliseconds() - Date.now();

    setTimeout(() => {
      localStorage.removeItem(key);
    }, miliseconds);
  }

  update(key: string, value: string): void {
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    return localStorage.getItem(key);
  }
}
