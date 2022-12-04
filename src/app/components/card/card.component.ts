import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: string;
  cardUrl: string;

  constructor() { 
  }

  ngOnInit(): void {
    this.cardUrl = 'assets/img/deck/' + this.card + '.png';
  }

}
