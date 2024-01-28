import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllocationServiceService } from '../allocation-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username  = "Guest"
  constructor(private user: UserService, private router: Router, private allocationService: AllocationServiceService) { }

  ngOnInit() {
    // Subscribe to the username observable to get updates
    this.user.username$.subscribe((username) => {
      this.username = username;
    });
  }

  home() {
    this.router.navigate(['main'])
  }

  logout() {
    this.router.navigate([''])
  }
  task() {
    this.router.navigate(['task'])
  }
  leaderboard(){
    this.router.navigate(['leaderBoard'])
  }

  graph() {
    this.router.navigate(['graph'])
  }
  
  homes() {
    this.router.navigate(['home'])
  }

  sendSms() {
    this.allocationService.sendSMS(this.username).subscribe(
      (msg: string) => {
        console.log(msg);
      },
      (error) => {
        console.log('Error occurred while retrieving flight list:', error);
      }
    );
  }

}
