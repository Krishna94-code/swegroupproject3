import { Component, OnInit,Input } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {
  title
  constructor(private titleService:TitleService) { }

  ngOnInit(): void {
   
      this.title = this.titleService.getTitle()
    
  }

}
