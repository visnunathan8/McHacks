import { Component } from '@angular/core';
import { FitnessDataService } from '../fitness-data.service';

@Component({
  selector: 'app-fitness-page',
  templateUrl: './fitness-page.component.html',
  styleUrls: ['./fitness-page.component.css']
})
export class FitnessPageComponent {
  fitnessData: any;
  constructor(private fitnessDataService: FitnessDataService) {}

  ngOnInit(): void {
    this.fetchData();
    console.log("AL : "+this.fitnessData)
  }

  fetchData(): void {
    this.fitnessDataService.fetchFitnessData().subscribe(
      (data) => {
        // Handle the received fitness data
        this.fitnessData = data.formattedData;
      },
      (error) => {
        console.error('Error fetching fitness data:', error);
      }
    );
  }
}


