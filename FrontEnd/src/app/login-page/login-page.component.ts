declare var google: any;
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { UserTaskService } from '../user-task.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  title = 'ServiceStation';
  username = 'Guest'
  password = ''
  loginError = false;
  
  constructor(private router: Router, private http: HttpClient, private user: UserTaskService, private user1 : UserService) { }

  // ngOnInit(): void {
  //   google.accounts.id.initialize({
  //     client_id: '1087117397851-rhvhc5heoqaiir5nn2hdeogoa1bhgk8q.apps.googleusercontent.com',
  //     callback: (resp: any) => this.handleLogin(resp)
  //   });

  //   google.accounts.id.renderButton(document.getElementById("google-btn"), {
  //     theme : 'filled_blue',
  //     size : 'large', 
  //     shape : 'rectangle',
  //     width: 250
  //   });
  // }

  handleLogin(): void {
    this.loginWithGoogle();
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const response: any = await this.http.get('http://localhost:3000/api/login').toPromise();
      console.log(response.authUrl);
      window.location.href = response.authUrl;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  

  checkLogin(event: Event) {
    event.preventDefault();

    // Use the service to check the validity of the username
    this.user.checkUsernameValidity(this.username).subscribe(
      (response: { isValid: any; }) => {
        console.log(response)
        if (response.isValid) {
            this.user1.setUsername(this.username);
            this.router.navigate(['main']);
        } else {
          this.loginError = true;
        }
      },
      (error: any) => {
        console.error('Error checking username validity:', error);
        // Handle error as needed
      }
    );
  }

  // handleLogin(response : any) {
  //   console.log(response);
  // }
}
