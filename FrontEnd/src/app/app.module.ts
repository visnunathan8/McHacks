import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter'; // Import the appropriate module
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AllocationPageComponent } from './allocation-page/allocation-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { GraphComponent } from './graph/graph.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatTabsModule} from '@angular/material/tabs';
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import { DataService } from './data.service';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { FitnessPageComponent } from './fitness-page/fitness-page.component';
import { MeditationPageComponent } from './meditation-page/meditation-page.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, LoginPageComponent, AllocationPageComponent, HeaderComponent, GraphComponent, LeaderBoardComponent, TaskBoardComponent, FitnessPageComponent, MeditationPageComponent],
  imports: [DayPilotModule, MatTabsModule, CanvasJSAngularChartsModule, HttpClientModule, MatDatepickerModule, ReactiveFormsModule, BrowserModule, BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, AppRoutingModule,  MatInputModule, MatFormFieldModule, MatMomentDateModule],
  bootstrap: [AppComponent],
  exports:      [ AllocationPageComponent ],
  providers:    [ DataService ]
})
export class AppModule {}
