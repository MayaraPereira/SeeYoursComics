import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicsComponent }      from './comics/comics.component';
import { NewComicComponent } from './new-comic/new-comic.component';
import { ComicDetailsComponent } from './comic-details/comic-details.component';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about/about.component';
import {CollectionsComponent} from './collections/collections.component';
import {NewCollectionComponent} from './new-collection/new-collection.component';
import {CollectionDetailsComponent} from './collection-details/collection-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'comics', component: ComicsComponent},
  { path: 'new-comic', component: NewComicComponent },
  { path: 'comic-details/:id', component: ComicDetailsComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'new-collection', component: NewCollectionComponent },
  { path: 'collection-details/:id', component: CollectionDetailsComponent },
];

@NgModule({
   imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
