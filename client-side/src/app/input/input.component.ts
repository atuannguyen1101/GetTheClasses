import { Component, OnInit } from '@angular/core';
import { Criteria } from '../models/criteria';
import { HttpMethodService } from '../http-method.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  constructor(private methodHelper: HttpMethodService) { }

  criteria: Criteria = {
    major: '',
    courseNumber: ''
  }

  getMajor(event: any): void {
    this.criteria.major = event.target.value;
  }

  getCourseNumber(event: any): void {
    this.criteria.courseNumber = event.target.value;
  }

  submit(): any {
    console.log(123);
    return this.methodHelper.get('http://localhost:8000/api/cats');
  }
}
