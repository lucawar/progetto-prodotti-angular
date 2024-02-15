import { TipologiaProdotti } from "../enums/tipologia-prodotti";

export interface ProdottiInterface {

  id? : string;
  nome : string;
  marca : string;
  descrizione : string;
  prezzo : number;
  tipoProd : TipologiaProdotti;
  immagine? : string;
}
