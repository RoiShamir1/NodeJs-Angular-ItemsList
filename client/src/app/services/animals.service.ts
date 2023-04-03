import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Animal from '../model/animal.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  private url = 'http://localhost:8080/animals';
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get(this.url);
  }

  getById(id: string) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  post(animal: Animal) {
    return this.httpClient.post(this.url, animal);
  }

  put(id: number, animal: Animal) {
    return this.httpClient.put(`${this.url}/${id}`, animal);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
