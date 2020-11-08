import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const backendUrl = 'http://ec2-3-238-132-231.compute-1.amazonaws.com:31750/SWE645_RestBackend/student/survey';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public getStudentIds(){
    return this.http.get(backendUrl).pipe(catchError(this.handleError));
  }

  public getStudent(id:string){
    return this.http.get(backendUrl+"/"+id).pipe(catchError(this.handleError));
  }

  public postStudent(student:object){
    return this.http.post(backendUrl,student).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
