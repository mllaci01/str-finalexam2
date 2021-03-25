import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();

  selectedUserToDelete: User = new User();

  filterPhrase: string = '';
  filterKey: string = 'name';

  // sorter
  sortby: string = 'id';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  setToDelete(user: User): void {
    this.selectedUserToDelete = user;
  }

  deleteItem(): void {
    this.userService.remove(this.selectedUserToDelete).subscribe(
      () => {
        this.users$ = this.userService.getAll();
      }
    );
  }
  sortData(param: string): void {
    this.sortby = param;
    let tableHeaders = document.querySelectorAll('th');
    tableHeaders.forEach( item => item.classList.remove('active'));
    document.querySelector('#'+param)?.classList.add('active');
  }

}
