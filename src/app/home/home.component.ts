import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotinService } from '../services/promotin.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;

  constructor(private dishservice: DishService,
    private promotinservice: PromotinService) { }

  ngOnInit(): void {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotinservice.getFeaturedPromotion();
  }

}
