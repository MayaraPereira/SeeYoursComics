import { Component, OnInit } from '@angular/core';
import { ComicService }  from '../comic.service';
import { Collection } from '../collection';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.css']
})
export class NewCollectionComponent implements OnInit {

  constructor(
    private comicService: ComicService
  ) {}

  ngOnInit() {
  }

  add(title:string, publishing_company:string, amount_comics:number):void {
    title = title.trim();
    publishing_company = publishing_company.trim();
    if (!title || !publishing_company) {
      toast(`Data Missing`, 4000);
      return;
    }
    var amount_comics_current = 0;
    var mean_rating = 0;
    var comics:number[];
    this.comicService.postCollection({ title, publishing_company, amount_comics, amount_comics_current, mean_rating, comics} as Collection)
    .subscribe();
    toast(`Saved!`, 4000);
  }
}
