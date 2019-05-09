import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { toast } from 'angular2-materialize';

import { ComicService }  from '../comic.service';
import { Comic } from '../comic';

@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.css']
})
export class ComicDetailsComponent implements OnInit {

  comic:Comic;

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getComic();
  }

  getComic(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.comicService.getComic(id)
        .subscribe(comic => this.comic = comic);
  }

  save(title:String, superhero:String, date:string, borrowed_name:string): void {
    title = title.trim();
    superhero = superhero.trim();
    if (!title || !superhero) {
      toast(`Data Missing`, 4000);
      return;
    }
    this.stateLoan(date);
    this.comicService.update(this.comic)
      .subscribe();
     toast(`Saved!`, 4000);
  }

  delete(): void {
    this.comicService.delete(this.comic)
      .subscribe();
    toast(`Delete!`, 4000);
  }

  stateLoan(date:string){
    if(!date.trim()) this.comic.loan = null;
      else
    if(new Date(this.comic.date) <= new Date())
      this.comic.loan = 2;
    else this.comic.loan = 1;

  }
}
