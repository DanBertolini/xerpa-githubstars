import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private userName: string;
  private userPassword: string
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login({ userName: this.userName, userPassword: this.userPassword })
      .subscribe((res) => {
        if(res) {
          this.router.navigate(['']);
        }
      });
  }

}
