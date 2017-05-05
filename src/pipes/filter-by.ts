import { User } from '../models/user';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterBy pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'filterBy',
})
export class FilterBy implements PipeTransform {

  transform(value: any, filterBy: string): any {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

    return filterBy ? value.filter((user: User) =>
      user.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }

}
