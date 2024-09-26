import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../interfaces/email';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = "http://localhost:3001/"
    this.myApiUrl = "api/user"
   }


   ReadAll(): Observable<User[]>{
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}/readAll`)
   }


  createUserFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('excel', file);
    console.log(formData);


  return this.http.post(`${this.myAppUrl}${this.myApiUrl}/create`, formData);
}

}
