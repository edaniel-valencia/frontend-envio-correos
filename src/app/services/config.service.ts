import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../interfaces/email';
import { Observable } from 'rxjs';
import { Config } from '../interfaces/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = "http://localhost:3001/"
    this.myApiUrl = "api/config"
   }


   GetServerEmail(): Observable<Config[]>{
    return this.http.get<Config[]>(`${this.myAppUrl}${this.myApiUrl}/read`,)
   }

   PostServerEmail(config: Config): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/create`, config)
   }

}
