import { Component } from '@angular/core';
import { UserTaskService } from '../user-task.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {
  username = ''

  openHtmlFile() {
    this.userTaskService.openHtmlFile("task1",  this.username).subscribe(
      () => {
        console.log('Task marked and points incremented successfully.');

        const url = 'http://127.0.0.1:5000/';

        // Open the URL in a new window
        window.open(url, '_blank');
        this.fetchUserPoints();
      },
      (error) => {
        console.error('Error marking task and incrementing points:', error);
        // Handle error as needed
      }
    );
    
  }
  constructor(private user : UserService, private userTaskService: UserTaskService) {}
  todayPoints = 0
  totalPoints = 0
  ngOnInit() {
    // Fetch points when the component is initialized
    this.user.username$.subscribe((username) => {
      this.username = username;
    });
    this.fetchUserPoints();
    
  }

  fetchUserPoints() {
    this.userTaskService.getUserPoints(this.username).subscribe(
      (response) => {
        this.todayPoints = response.todayPoints;
        this.totalPoints = response.totalPoints;
      },
      (error) => {
        console.error('Error fetching user points:', error);
        // Handle error as needed
      }
    );
  }

  openHtmlFileMed() {
    this.userTaskService.openHtmlFile("task2", this.username).subscribe(
      () => {
        console.log('Task marked and points incremented successfully.');
        const newWindow = window.open('assets/meditation.html', '_blank');
        if (newWindow) {
          // You can customize the properties of the new window, if needed
          newWindow.focus();
          this.fetchUserPoints();
        } else {
          alert('Please allow pop-ups for this site to open the new window.');
        }
      },
      (error) => {
        console.error('Error marking task and incrementing points:', error);
        // Handle error as needed
      }
    );
    
  }
}
