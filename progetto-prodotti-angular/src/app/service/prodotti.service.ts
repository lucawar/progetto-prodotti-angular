import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private baseURL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

 // OTTIENI LISTA PRODOTTI
  getProdotti(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/prodotti/all?page=${page}&size=${size}`)
  }
}
