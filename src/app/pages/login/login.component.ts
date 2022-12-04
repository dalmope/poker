import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dealerCards = [];

  ngOnInit() {
    this.getDealerCards();
  }

  getDealerCards() {
    this.dealerCards = [
      {
        name: 'A5',
      },
      {
        name: 'A5',
      }
    ];
  }

  pedir() {
    this.dealerCards.push({
      name: 'A5',
    });
  }

  parar() {
    this.dealerCards = [];
  }

}
