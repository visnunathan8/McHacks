import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
      <section class="listing">
        <div class="container">
          <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
           <div class="top-right">{{ housingLocation.couponsAvailable }} Coupons Available</div>
        </div>
        <h2 class="listing-heading">{{ housingLocation.name }}</h2>
        <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
        <a (click)="goToDetailsPage(housingLocation.id)">Learn More</a>
      </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})

export class HousingLocationComponent {


  @Input() housingLocation!: HousingLocation;
  constructor(private router: Router) {
  }
  goToDetailsPage(id: number): void {
    this.router.navigate(['/details', id]);
  }
}
