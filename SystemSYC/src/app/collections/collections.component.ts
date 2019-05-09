import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  collections:Collection[];

  constructor(
    private comicService: ComicService
  ) { }

  ngOnInit() {
    this.getCollections();
  }

  getCollections():void {
    this.comicService.getCollections()
        .subscribe(collections => this.collections = collections);
  }

  ngDoCheck(){
    if(this.collections == null) this.getCollections();
  }

  ngOnDestroy(){
    this.collections = null;
  }

}
