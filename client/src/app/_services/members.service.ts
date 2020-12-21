import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MemberModel} from '../_models/member';
import {Observable, of} from 'rxjs';
import {map, take} from 'rxjs/operators';
import set = Reflect.set;
import {PaginatedResult} from '../_models/pagination';
import {UserParams} from '../_models/userParams';
import {AccountService} from './account.service';
import {User} from '../_models/user';
import {getPaginatedResult, getPaginationHeaders} from './paginationHelper';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: MemberModel[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    const response = this.memberCache.get(Object.values(userParams).join('-'));

    if (response)
      return of(response);

    console.log(Object.values(userParams).join('-'));
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<MemberModel[]>(this.baseUrl + 'users', params, this.http)
      .pipe(
        map(res => {
          this.memberCache.set(Object.values(userParams).join('-'), res);
          return res;
        })
      );
  }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: MemberModel) => member.username === username);

    if (member) {
      return of(member);
    }
    return this.http.get<MemberModel>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: MemberModel) {
    return this.http.put<MemberModel>(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deleteUserPhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber, pageSize){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<MemberModel[]>>(this.baseUrl + 'likes', params, this.http);
  }

}
