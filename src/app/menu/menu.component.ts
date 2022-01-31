import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  dishes : Dish[];
  errMess: string;

  //selectedDish : Dish;

  /* onSelect(dish: Dish) {
      this.selectedDish = dish;
    } */
  constructor(private dishservice : DishService, @Inject('BaseURL') public BaseURL: string) {
    
   }

  ngOnInit(): void {
    // without promise -> this.dishes = this.dishservice.getDishes();
    // this.dishservice.getDishes().subscribe(dishes => this.dishes = dishes);

    this.dishservice.getDishes()//returning immediately
    .subscribe({next:(dishes) => this.dishes = dishes,
    error: errmess => this.errMess = <any>errmess});

  }

}
