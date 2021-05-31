import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, Input } from '@angular/core';
import { SearchService } from './app/search.service';

@Component({
  selector: 'app-list-names',
  template: `
    <div *ngIf="names.length">
      <h2>List of names</h2>
      <ul>
        <li *ngFor="let whatever of names">{{ whatever }}</li>
      </ul>
    </div>
  `,
})
export class ListNamesComponent {
  @Input()
  listOfNames;
}

@Component({
  selector: 'app-comp-a', // <app-comp-a></app-comp-a>
  providers: [{ provide: SearchService, useClass: SearchService }],
  template: `
    <h1>Hello {{ name }}</h1>
    <input [(ngModel)]="name" (input)="search()" />
    <!-- <button (click)="search()">Search name</button> -->
    <app-list-names [listOfNames]="names"></app-list-names>
  `,
})
export class CompAComponent {
  constructor(private searchService: SearchService) {} // DI: Dependency Injection

  names = this.searchService.initialNames;
  // this
  name: string = '';
  search() {
    //comes server
    this.names = this.searchService.search(this.name);
  }
}

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [CompAComponent, ListNamesComponent],
  bootstrap: [CompAComponent],
})
export class ModuleAModule {}

platformBrowserDynamic().bootstrapModule(ModuleAModule);
