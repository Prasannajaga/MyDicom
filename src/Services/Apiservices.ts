import { HttpClient, HttpClientModule, HttpEvent, HttpResponse, } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, debounceTime } from "rxjs/operators";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn :'root'
})
export class ApiService {


  constructor(private http : HttpClient){ }

  readonly  serverUrl = environment.server;

  getRequest(url : string = '', pathvariable : string = '') : Observable<HttpResponse<any>>{
    alert
     return this.http.get<any>(this.serverUrl + url + pathvariable ,{
      observe :'response'
    }).pipe(
       catchError(error =>  throwError(error))
    );
  }

  postRequest(url : string , payloadData : any) : Observable<HttpEvent<any>>{
    return this.http.post<any>(this.serverUrl+url, payloadData , {
      observe :'events'
    }).pipe(
      catchError(error => throwError(error))
    );
  }

  updateRequest(url : string , payloadData : any) : Observable<any> {
    return this.http.put<any>(this.serverUrl+url, payloadData).pipe(
      catchError(error => throwError(error))
    );
  }

}