import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AllocationPageComponent } from './allocation-page/allocation-page.component';
import { GraphComponent } from './graph/graph.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { FitnessPageComponent } from './fitness-page/fitness-page.component';
import { MeditationPageComponent } from './meditation-page/meditation-page.component';
import { PushUpPageComponent } from './push-up-page/push-up-page.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'allocate', component: AllocationPageComponent},
  { path: 'graph', component: GraphComponent},
  { path: 'leaderBoard', component: LeaderBoardComponent},
  { path: 'task', component: TaskBoardComponent},
  { path: 'fitness', component: FitnessPageComponent},
  { path: 'meditation', component: MeditationPageComponent},
  { path: 'pushup', component: PushUpPageComponent},
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
