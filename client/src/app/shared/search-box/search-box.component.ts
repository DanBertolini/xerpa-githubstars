import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() mainLayout: boolean;
  @Input() searchedUserName: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.searchedUserName) {
      this.search();
    }
  }


  search() {
    if (this.searchedUserName) {
      this.userService.getUsersByName(this.searchedUserName).subscribe((result: any) => {
        if (result) {
          this.router.navigate(['user', result.username]);
        } else {
          this.router.navigate(['not-found']);
        }

        this.searchedUserName = "";
      }, () => {
        this.router.navigate(['not-found']);
      });
    }
  }

  private onEnterPressed(event){
    if(event.keyCode == 13){
      this.search();
    }
  }

}
