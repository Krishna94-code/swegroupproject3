import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  title

  constructor() { }

  getTitle(){
    return this.title
  }

  setTitle(titleval){
    this.title = titleval
  }
}
