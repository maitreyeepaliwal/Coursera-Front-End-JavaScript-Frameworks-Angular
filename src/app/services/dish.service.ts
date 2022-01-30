import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes() : Observable<Dish[]> {
    return this.http.get<Dish[]>(BaseURL + 'dishes');
    //return of(DISHES).pipe(delay(2000));
    /*
    // return Promise.resolve(DISHES);
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES), 2000);
    }); */
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(BaseURL + 'dishes/' + id);

    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    /*// return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]); //arrow function
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    }); */
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(BaseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))

    //return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000));
    /* //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    }); */
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));

    //return of(DISHES.map(dish => dish.id ));
  }

}
