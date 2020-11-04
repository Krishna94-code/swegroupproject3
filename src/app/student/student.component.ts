import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service'
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../title.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentId
  student
  loadingFailure
  constructor(private titleService:TitleService,private studentService: StudentService, private activatedRoute: ActivatedRoute) {
   this.studentId = this.activatedRoute.snapshot.params.studentId;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Student Record")
    this.studentService.getStudent(this.studentId)
      .subscribe((data: any[]) => {
        console.log(data);
        this.student = data;
       },
      (error) => {                              //Error callback
        console.error('error with backend call')
        this.loadingFailure=true;
      });
  }

}
