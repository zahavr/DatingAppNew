import { Component, OnInit } from '@angular/core';
import {MemberModel} from '../../_models/member';
import {MembersService} from '../../_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: MemberModel[];


  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
     this.membersService.getMembers().subscribe(members => {
      this.members = members;
    });
  }
}
