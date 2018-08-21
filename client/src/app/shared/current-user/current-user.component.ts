import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  private currentUser: any
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

}
