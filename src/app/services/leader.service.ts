import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }


  getLeaders() : Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));
    /*return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS), 2000);
    }); */
  }

  getfeaturedleader() : Observable<Leader>{
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    /* return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    }); */
  }
}
