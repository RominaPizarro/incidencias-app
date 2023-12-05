import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioApiService {
  constructor(
    private http: HttpClient
  ) {
  }

  consumirAPI(): Observable<any> {
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    return this.http.get(baseUrl).pipe(retry(3));
  }
}
