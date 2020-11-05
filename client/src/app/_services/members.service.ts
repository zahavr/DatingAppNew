import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MemberModel} from '../_models/member';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import set = Reflect.set;


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: MemberModel[] = [];

  constructor(private http: HttpClient) {
  }

  getMembers(): Observable<MemberModel[]> {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<MemberModel[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
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
