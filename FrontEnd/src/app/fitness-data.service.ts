// fitness-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FitnessDataService {

  constructor(private http: HttpClient) {}

  fetchFitnessData(): Observable<any> {
    const url = 'http://localhost:3000/fetch-data';

    return this.http.get(url);
  }
}
