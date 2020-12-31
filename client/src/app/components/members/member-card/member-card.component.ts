import {Component, Input, OnInit} from '@angular/core';
import {MemberModel} from '../../../_models/member';
import {MembersService} from '../../../_services/members.service';
import {ToastrService} from 'ngx-toastr';
import {PresenceService} from '../../../_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() member: MemberModel;

  constructor(private  membersService: MembersService,
              private  toastr: ToastrService,
              public presenceService: PresenceService) { }

  ngOnInit(): void {
  }

  public addLike(member: MemberModel) {
    this.membersService.addLike(member.username).subscribe(res => {
      this.toastr.success('You have liked' + member.knownAs);
    });
  }

}
