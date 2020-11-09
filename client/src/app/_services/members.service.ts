import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MemberModel} from '../_models/member';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import set = Reflect.set;
import {PaginatedResult} from '../_models/pagination';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: MemberModel[] = [];
  paginatedResult: PaginatedResult<MemberModel[]> = new PaginatedResult<MemberModel[]>()

  constructor(private http: HttpClient) {
  }

  getMembers(page?: number, itemsPerPage?: number){
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<MemberModel[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      map ( response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null){
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          return this.paginatedResult;
        }
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);
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
}
