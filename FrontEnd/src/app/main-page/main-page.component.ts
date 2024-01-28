import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AllocationServiceService } from '../allocation-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  SelectedDate: string = '';
  constructor(private fb: FormBuilder, private router: Router, private allocationService: AllocationServiceService) {

  }

  onDateChange(newDate: string) {
    console.log('Selected Date changed:', newDate);
  }

  submitCall() {
      console.log("pppp"+this.SelectedDate)
      sessionStorage.setItem('SelectedDate', JSON.stringify(this.SelectedDate));
      this.router.navigate(['allocate'])

  }
}
