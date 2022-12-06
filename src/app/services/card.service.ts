import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const { api_cards } = environment;

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(protected http: HttpClient,) { 
  }

  initGame(): Observable<any> {
    return this.http.get<any>(api_cards);
  }

  getCard(): Observable<any> {
    return this.http.get<any>(api_cards + '/hit');
  }
}
