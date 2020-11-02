import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MemberModel} from '../_models/member';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(): Observable<MemberModel[]> {
    return this.http.get<MemberModel[]>(this.baseUrl + 'users');
  }

  getMember(username: string) {
    return this.http.get<MemberModel>(this.baseUrl + 'users/' + username);
  }

}
