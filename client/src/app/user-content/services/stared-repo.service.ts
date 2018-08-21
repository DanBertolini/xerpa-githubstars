import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { BehaviorSubject } from "rxjs";
import { UserDataUtils } from "../../utils/UserDataUtils";

@Injectable()
export class StaredRepoService {

    constructor(private http: Http) {

    }

    public getSearchedUserStaredRepos(userName: string): Observable<Response> {
        return this.http.post(`http://localhost:3000/api/repo/stared/${userName}`, UserDataUtils.getUserData()).map((res) => {
            return res.json();
        });
    }

    public getCurrentUserStaredRepos(): Observable<Response> {
        return this.http.post(`http://localhost:3000/api/repo/stared`, UserDataUtils.getUserData()).map((res) => {
            return res.json();
        });
    }

    public starRepo(repo: any, star: boolean): Observable<Response> {
        const owner = repo.full_name.split('/')[0];
        const repoName = repo.full_name.split('/')[1];
        const api = `http://localhost:3000/api/repo/${star ? 'star' : 'unstar'}/${owner}/${repoName}`;
        return this.http.post(api, UserDataUtils.getUserData());
    }
}