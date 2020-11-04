import {Component, Input, OnInit} from '@angular/core';
import {MemberModel} from '../../../_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() member: MemberModel;

  constructor() { }

  ngOnInit(): void {
  }

}
