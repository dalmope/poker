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
  cards: any;
  playerScore: number;
  dealerScore: number;

  error = false;
  errorMessage = '';

  constructor(
    public cardService: CardService,
  ) { }

  ngOnInit() {
    this.cardService.initGame().subscribe((data) => {
      this.cards = data;
      this.dealerCards = this.cards.croupierHand;
      this.playerCards = this.cards.playerHand;
      this.calculateHandScore(this.dealerCards);
      this.calculateHandScore(this.playerCards);
    });
  }

  calculateHandScore(cards) {
    let score = 0;
    cards.forEach((card) => {
      score += card.value;
    });
    this.playerScore = score;
  }

  // getDealerCards() {
  //   this.cardService.getCards().playerCards.forEach((card) => {
  //     this.dealerCards.push(card);
  //   });
  // }

  pedirDealer() {
    this.cardService.getCard().subscribe((data) => {
      this.dealerCards.push(data.card);
      this.dealerScore += data.card.value;
    });
  }

  pararDealer() {
    this.dealerCards = [];
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
    this.cardService.getCard().subscribe((data) => {
      this.playerCards.push(data.card);
      this.playerScore += data.card.value;
    });
  }

  parar() {
    this.playerScore = 0;
    this.playerCards = [];
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
