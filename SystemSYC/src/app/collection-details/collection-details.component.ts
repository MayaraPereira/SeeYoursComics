import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toast } from 'angular2-materialize';

import { ComicService }  from '../comic.service';
import { Collection } from '../collection';
import { Comic } from '../comic';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {

  collection:Collection;
  comics:Comic[];
  amount:number;

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService
  ) { }

  ngOnInit() {
    this.comics = new Array();
    this.amount = 0;
    this.getCollection();
  }

  getCollection(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.comicService.getCollection(id)
        .subscribe(collection => {this.collection = collection, this.getComics()});
  }

  getComics():void {
    for (let i = 0; i < this.collection.comics.length; i++)
        this.getComic(this.collection.comics[i]);
  }

  getComic(id_comic:number): void {
    this.comicService.getComic(id_comic)
        .subscribe(comic => {this.comics.push(comic), this.countAmount()});
  }

  countAmount(){
    this.amount = 0;
    for (let i = 0; i < this.comics.length; i++)
        this.amount = this.amount + parseFloat(this.comics[i].price);
  }

  delete(): void {
    this.comicService.deleteCollection(this.collection)
      .subscribe();
    toast(`Delete!`, 4000);
  }
}
