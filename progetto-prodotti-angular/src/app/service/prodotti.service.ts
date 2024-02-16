import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdottiInterface } from '../models/prodotti.interface';


@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private baseURL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  // CREA PRODOTTO
  creaProdotto(prodotto: ProdottiInterface): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/prodotti/crea`, prodotto);
  }

 // OTTIENI LISTA PRODOTTI
  getProdotti(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/prodotti/all?page=${page}&size=${size}`);
  }

  // CANCELLA PRODOTTO
  deleteProdotto(prodotto_id: string): Observable<void> {
  return this.http.delete<any>(`${this.baseURL}/prodotti/elimina/${prodotto_id}`);
  }

  // MODIFICA PRODOTTO
  updateProdotto(prodotto_id:string, nuovoProdotto: ProdottiInterface): Observable<any> {
  return this.http.put<any>(`${this.baseURL}/prodotti/modifica/${prodotto_id}`, nuovoProdotto);
  }
}
