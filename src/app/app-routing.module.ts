import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcknowledgeComponent } from './acknowledge/acknowledge.component';
import { StudentComponent } from './student/student.component';
import { SurveyComponent } from './survey/survey.component';


const routes: Routes = [{
  path:'acknowledge',
  component: AcknowledgeComponent
},{
  path:'student/:studentId',
  component: StudentComponent
},{
  path:'',
  component: SurveyComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

