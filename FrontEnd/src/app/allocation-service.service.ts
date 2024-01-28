import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

export class Allocation {
  constructor(
    public start?: Date,
    public end?: Date,
    public type?: string,
    public station?: number
  ) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class AllocationServiceService {
  constructor(private http: HttpClient) {}
  getAllocationData() {
    return this.http.get<string[]>('http://localhost:3000/allocationData/')
  }


  sendSMS(username: string): Observable<any> {
    return this.http.get<string>('http://localhost:3000/send_sms/'+username);
  }
}


