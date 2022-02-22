import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService} from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    ) { }
  
 
  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post<Feedback>(BaseURL + 'feedback/', feedback, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}