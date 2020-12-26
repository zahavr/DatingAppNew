import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {MemberModel} from '../_models/member';
import {Injectable} from '@angular/core';
import {MembersService} from '../_services/members.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<MemberModel>{
  constructor(private membersService: MembersService) {

  }
  resolve(route: ActivatedRouteSnapshot): Observable<MemberModel> {
    return this.membersService.getMember(route.paramMap.get('username'));
  }

}
