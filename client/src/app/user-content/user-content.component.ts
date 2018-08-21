import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { StaredRepoService } from './services/stared-repo.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {

  private searchedUser: any;
  private searchedUserName: string;
  private searchedUserStaredRepos: any[] = [];

  private currentUserStaredRepos: any[] = [];

  constructor(private userService: UserService,
    private staredRepoService: StaredRepoService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.searchedUserName = params['username'];
      this.getUserData();
    });
  }

  ngOnInit() {

  }

  private getUserData() {
    this.userService.getUserByUserName(this.searchedUserName).subscribe((user) => {
      this.searchedUser = user;
      Observable.forkJoin([
        this.staredRepoService.getSearchedUserStaredRepos(this.searchedUserName),
        this.staredRepoService.getCurrentUserStaredRepos()
      ]).subscribe((repos: any[]) => {
        const searchedUserRepos: any[] = repos[0];
        const currentUserRepos: any[] = repos[1];

        searchedUserRepos.forEach((repo: any) => {
          if (currentUserRepos.find((userRepo: any) => userRepo.id === repo.id)) {
            repo.stared = true;
          }
        });

        this.searchedUserStaredRepos = searchedUserRepos;
      });
    });
  }

  private starRepo(repo: any, star: boolean) {
    this.staredRepoService.starRepo(repo, star).subscribe((res) => {
      repo.stared = star;
      if (star) {
        this.snackBar.open("Repo starred with success!", "dismiss", {
          duration: 2000,
        });
      }
    });
  }

}
