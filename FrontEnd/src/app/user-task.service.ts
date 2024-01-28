
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {

  constructor(private http: HttpClient) {}

  incrementPoints(username: string, task: string, todayPoints: number): Observable<any> {
    return this.http.post('http://localhost:3000/increment_points', { username, task, todayPoints });
  }

  checkUsernameValidity(username: string): Observable<any> {
    const url = "http://localhost:3000/check_username/"+username;
    return this.http.get(url);
  }

  getUserPoints(username: string): Observable<any> {
    return this.http.get("http://localhost:3000/get_user_points/"+username);
  }

  openHtmlFile(task: string, username: string): Observable<any> {
    return this.http.post("http://localhost:3000/open_html_file", { 'task':task, 'username':username });
  }

  getUsersSortedByPoints(): Observable<any> {
    return this.http.get("http://localhost:3000/get_users_sorted_by_points");
  }
}