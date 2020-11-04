import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { TitleService } from '../title.service';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css']
})

export class SurveyComponent implements OnInit {
    numbers
    numberArr
    validNumber
    loadingFailure
    radioOptions = ["friends", "television", "internet", "other"]
    options = [{ name: 'students', checked: false }, { name: 'location', checked: false }, { name: 'campus', checked: false }, { name: 'atmosphere', checked: false }, { name: 'dorm rooms', checked: false }, { name: 'sports', checked: false }]
    constructor(private titleService: TitleService, private dataService: DataService, private studentService: StudentService, private router: Router) { }

    ngOnInit(): void {
        this.titleService.setTitle("Survey Form");
    }

    validateTextAreaInput() {
        try {
            var numberArr = this.getArray()
            var length = numberArr.length
            return (length == 10);
        } catch (error) {
            return false;
        }

    }

    onSubmit(surveyForm: any) {
        /*
        * calculate mean and standard deviation
        */
        this.numberArr = this.getArray()
        this.dataService.setMean(this.numberArr)
        this.dataService.setStandardDeviation(this.numberArr)
        //convert the options for likes to have only name for database insert
        surveyForm.studentData.likedMost = this.options
            .filter(opt => opt.checked)
            .map(opt => opt.name);
        // make the rest Post student call with the studentData
        this.studentService.postStudent(surveyForm.studentData)
            .subscribe((data: any[]) => {
                console.log(data);
                this.router.navigate(['/acknowledge']);
            },
                (error) => {                              //Error callback
                    console.error('error with backend call')
                    this.loadingFailure = true;
                });
    }

    getArray() {
        return this.numbers.split(",");
    }


    onSubmit1(surveyForm: NgForm) {

        // Validation for atleast 2 checkbox selected
        var checked = 0;
        var c = surveyForm.value;
        for (var i = 0; i < c.length; i++) {
            if (c[i].checked)
                checked++;
        }
        document.getElementById("checkbox_error").innerHTML = ""
        if (checked < 2) {
            document.getElementById("checkbox_error").innerHTML = "You should choose atleast 2 selections.";
            return false;
        }
        // Validation for atleast 1 radiobutton selected
        document.getElementById("radio_error").innerHTML = ""
        var radios = surveyForm.value;
        var result = false
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                result = true;
                break;
            }
        }
        if (result == false) {
            document.getElementById("radio_error").innerHTML = "Select atleast one interest";
            return false;
        }

    }

}
