import { Component, OnInit } from '@angular/core';
import {MemberModel} from '../../../_models/member';
import {MembersService} from '../../../_services/members.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members$: Observable<MemberModel[]>;


  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }
}
