import { Component, OnInit } from '@angular/core';
import { ComicService }  from '../comic.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private comicService: ComicService
  ) { }

  ngOnInit() {
  }

  login(user_name:string){
    toast(`Welcome User test`, 4000);
    // this.comicService.getUser(user_name)
    // .subscribe();
  }
}
