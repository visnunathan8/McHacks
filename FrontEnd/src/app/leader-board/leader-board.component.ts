import { Component } from '@angular/core';
import { UserTaskService } from '../user-task.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent {
  users: any[] = [];
  profilePics: string[] = [
    'https://randomuser.me/api/portraits/men/44.jpg',
    'https://randomuser.me/api/portraits/men/31.jpg',
    'https://randomuser.me/api/portraits/women/91.jpg',
    'https://randomuser.me/api/portraits/women/30.jpg',
    'https://randomuser.me/api/portraits/men/44.jpg',
'https://randomuser.me/api/portraits/men/31.jpg&#39',
'https://randomuser.me/api/portraits/women/91.jpg',

  ];

  constructor(private userTaskService: UserTaskService) {}

  ngOnInit() {
    // Fetch users when the component is initialized
    this.fetchUsers();
  }

  fetchUsers() {
    this.userTaskService.getUsersSortedByPoints().subscribe(
      (response) => {
        this.users = response.users.map((user: any, index: number) => ({
          ...user,
          profilePic: this.profilePics[index % this.profilePics.length ] // Repeat profile pics
        }));
      },
      (error) => {
        console.error('Error fetching users:', error);
        // Handle error as needed
      }
    );
  }
}


