import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { Comic } from '../comic';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  comics:Comic[];
  amount:number;
  constructor(
    private comicService: ComicService
  ) {}

  ngOnInit() {
    this.amount = 0;
    this.getComics();
  }

  getComics():void {
    this.comicService.getComics()
        .subscribe(comics => {this.comics = comics, this.countAmount()});
  }

  ngDoCheck(){
    if(this.comics == null) this.getComics();
  }

  ngOnDestroy(){
    this.comics = null;
  }

  countAmount(){
    this.amount = 0;
    for (let i = 0; i < this.comics.length; i++) {
        this.amount = this.amount + parseFloat(this.comics[i].price);
    }
  }
}
