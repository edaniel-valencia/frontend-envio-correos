import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../interfaces/email';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Category } from '../interfaces/category';

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


  ReadAll(page: number = 1, size: number = 10): Observable<User[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}/readAll`, { params })
  }

  ReadUserCategoryId(page: number = 1, size: number = 10, CategoryId: number): Observable<User[]> {
    const params = new HttpParams().set('CategoryId', CategoryId.toString())
      .set('page', page.toString())
      .set('size', size.toString())
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}/readAllId/${CategoryId}`, { params })
  }



  createUserFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('excel', file);
    console.log(formData);

    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/create`, formData);
  }

}
