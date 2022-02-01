import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { of , lastValueFrom, Observable, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    //return  of(DISHES).pipe(delay(2000)); //------3rd return promise from observable 
    return this.http.get<Dish[]>(BaseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));//server side URL to fetch data
  }
    /* //
    return new Promise(resolve => {
      //without timeout
      //return Promise.resolve(DISHES); //---1st method
      //simulate server latency with 2 second delay-short delay
      //
      setTimeout(()=>resolve(DISHES),2000) //----2nd 
    }
    );
  }*/
  /*
  getDishes(): Promise<Dish[]> {
    const getdishes$ = of(DISHES).pipe(delay(2000)); //------3d return promise from observable
    return lastValueFrom(getdishes$);
  }
  */
  getDish(id: string): Observable<Dish>{
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(BaseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));//server side URL to fetch data
  }
   /* //without timeout
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
    return new Promise(resolve => {
      //simulate server latency with 2 second delay-short delay
      setTimeout(()=>resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000)
    }
    );
  }*/

  /*
    getDish(id: string): Promise<Dish>{
    const getdish$ = of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)); //-----3rd return promise from observable
    return lastValueFrom(getdish$);
  }
  */
   
  getFeaturedDish(): Observable<Dish>{
   // return  of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
   return this.http.get<Dish[]>(BaseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
   .pipe(catchError(this.processHTTPMsgService.handleError)); //server side URL to fetch data
    }
    /*//without timeout
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    return new Promise(resolve => {
      //simulate server latency with 2 second delay-short delay
      setTimeout(()=>resolve(DISHES.filter((dish) => dish.featured)[0]),2000)
    }
    );
  }*/

  /*
  getFeaturedDish(): Promise<Dish>{
    const getfeatureddish$ = of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));//----3rd return promise from observable
    return lastValueFrom(getfeatureddish$);
    }
    */

    getDishIds(): Observable<string[] | any>{
     // return of(DISHES.map(dish  => dish.id));
     return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
     .pipe(catchError(error => error));
    }

    //save changes to server
    putDish(dish: Dish):Observable<Dish>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      };

      return this.http.put<Dish>(BaseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

}