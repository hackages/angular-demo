import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
  initialNames = ['Bob', 'Davy'];
  search(term: string) {
    return this.initialNames.filter((val) =>
      val.toLowerCase().includes(term.toLowerCase())
    );
  }
}
