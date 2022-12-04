import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { api_cards } = environment;

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(protected http: HttpClient,) { 
  }

  getCards() {
    return this.http.get(api_cards).subscribe((data) => {
      console.log(data);
    });
  }
}
