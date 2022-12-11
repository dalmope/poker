import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dealerCards = [];
  playerCards = [];
  secretCard = {};
  cards: any;
  playerScore: number;
  dealerScore: number;
  isJoker: boolean = true;

  error = false;
  errorMessage = '';

  constructor(
    public cardService: CardService,
  ) { }

  ngOnInit() {
    this.cardService.initGame().subscribe((data) => {
      this.playerCards = JSON.parse(JSON.stringify(data.playerHand));
      this.dealerCards = JSON.parse(JSON.stringify(data.croupierHand));
      this.secretCard = JSON.parse(JSON.stringify(data.croupierHand[1]));
      this.dealerCards[1].name = 'Joker';
      this.dealerScore = this.calculateHandEscore(this.dealerCards);
      this.playerScore = this.calculateHandEscore(this.playerCards);
    });
  }

  calculateHandEscore(cards): number {
    let score = 0;
    cards.forEach((card) => {
      score += card.value;
    });
    return score;
  }

  llamarApiHastaEncontrarValorMenorA17(caller) {
    this.cardService.getCard(caller).subscribe({
      next: (response) => {
        if (response.handValue <= 17) {
          this.dealerCards.push(response.card);
          console.log('dealerCards', this.dealerCards);
          this.llamarApiHastaEncontrarValorMenorA17(caller);
        }
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    })
  }

  parar() {
    this.cambiarJokerToCard();
    this.llamarApiHastaEncontrarValorMenorA17("croupier");
  }

  cambiarJokerToCard() {
    if (this.isJoker) {
      this.dealerCards.pop();
      this.dealerCards.push(this.secretCard);
      this.isJoker = false;
    }
  }

  pedir() {
    if (this.playerCards.length >= 6) {
      this.sendError('No puedes pedir más cartas');
      return { error: this.errorMessage };
    }
    if (this.playerScore >= 21) {
      this.sendError('No puedes pedir más cartas');
      return { error: this.errorMessage };
    }
    this.cardService.getCard("player").subscribe((data) => {
      this.playerCards.push(data.card);
      this.playerScore += data.card.value;
    });
  }

  sendError(errorMessage): string {
    this.error = true;
    this.errorMessage = errorMessage;
    return errorMessage
  }

  resetError(): string {
    this.error = false;
    this.errorMessage = '';
    return '';
  }

}
