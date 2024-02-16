import { Component, OnInit } from '@angular/core';
import { ProdottiInterface } from 'src/app/models/prodotti.interface';
import { ProdottiService } from 'src/app/service/prodotti.service';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss'],
})
export class ProdottiComponent implements OnInit {
  prodotti: ProdottiInterface[] = [];
  page: number = 0;
  isLoading: boolean = false;

  constructor(private prodottiService: ProdottiService) {}

  ngOnInit(): void {
    this.loadProdotti();
  }

  // IMPAGINAZIONE
  nextPage() {
    this.page++;
    this.loadProdotti();
  }

  previusPage() {
    if (this.page > 0) {
      this.page--;
      this.loadProdotti();
    }
  }

  // GET ALL PRODOTTI
  loadProdotti() {
    this.isLoading = true;
    this.prodottiService.getProdotti(this.page, 12).subscribe(
      (data) => {
        console.log(data);
        if (Array.isArray(data)) {
          this.prodotti = data;
        } else {
          console.error('Formato dati inaspettato:', data);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Errore nella chiamata al servizio', error);
        this.isLoading = false;
      }
    );
  }

  // CANCELLA PRODOTTO
  deleteProdotto(prodotto_id: string | undefined) {
    if (prodotto_id) {
      // Chiedi conferma all'utente prima di procedere con l'eliminazione
      if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
        // Effettua l'operazione di eliminazione solo se l'utente conferma
        this.prodottiService.deleteProdotto(prodotto_id).subscribe(
          () => {
            // Rimuovi il prodotto dalla lista dopo la cancellazione
            this.prodotti = this.prodotti.filter(prodotto => prodotto.id !== prodotto_id);
            console.log('Prodotto eliminato:', prodotto_id);
            alert('Prodotto eliminato con successo');
          },
          (error) => {
            console.error('Errore durante l eliminazione del prodotto:', error);
            alert('Si è verificato un errore durante l\'eliminazione del prodotto. Si prega di riprovare più tardi.');
          }
        );
      }
    }
  }
}
