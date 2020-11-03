import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service'
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { TitleService } from '../title.service';



@Component({
  selector: 'app-acknowledge',
  templateUrl: './acknowledge.component.html',
  styleUrls: ['./acknowledge.component.css']
})
export class AcknowledgeComponent implements OnInit {
  studentIds = [];
  mean
  stdDev
  loadingFailure
  constructor(private titleService: TitleService, private dataService: DataService, private studentService: StudentService, private router: Router) {
    if (this.dataService.getMean() > 90) {
      this.titleService.setTitle("You have won 2 Movie Tickets")
    } else {
      this.titleService.setTitle("Thanks for your Feedback")
    }
  }

  gotoDetails(studentId: any) {
    this.router.navigateByUrl(studentId);
  }

  ngOnInit(): void {
    this.mean = this.dataService.getMean()
    this.stdDev = this.dataService.getStandardDeviation()
    this.studentService.getStudentIds()
      .subscribe((data: any[]) => {
        console.log(data);
        this.studentIds = data;
      },
        (error) => {                              //Error callback
          console.error('error with backend call')
          this.loadingFailure = true;
        });
  }




}
