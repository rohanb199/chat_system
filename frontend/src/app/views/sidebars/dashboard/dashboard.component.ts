import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../controls/auth/auth.service';
import {User} from '../../../models/user';
import {GroupService} from '../../../controls/conversation/group.service';
import {Conversation} from '../../../models/conversation';
import {MatDialog} from '@angular/material';
import {AddUserComponent} from '../../dialogs/add-user/add-user.component';
import {UserService} from '../../../controls/conversation/user.service';
import {ChannelService} from '../../../controls/conversation/channel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  groups: Conversation[];
  channels: Conversation[];
  users: User[];

  constructor(
    // tslint:disable-next-line:variable-name
    private _authService: AuthService,
    // tslint:disable-next-line:variable-name
    private _groupService: GroupService,
    // tslint:disable-next-line:variable-name
    private _channelService: ChannelService,
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
    // tslint:disable-next-line:variable-name
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._authService.user$.subscribe((res: User) => {
      this.user = res;
      this.getGroupList();
      this.getChannelList();
      this.getUserList();
    });
  }

  getGroupList() {
    this._groupService.getGroupList(this.user.id).subscribe((res: any) => {
      this.groups = res.list;
      this.groups.forEach((group, index) => {
        this.groups[index].participants = JSON.parse(group.participants);
      });
    });
  }

  getChannelList() {
    this._channelService.getChannelList(this.user.id).subscribe((res: any) => {
      this.channels = res.list;
    });
  }

  getUserList() {
    this._userService.getUserList(this.user.id).subscribe((res: any) => {
      this.users = res.list;
    });
  }

  addGroup(conversation) {
    conversation.participants.push({fullName: this.user.firstName + ' ' + this.user.lastName, id: this.user.id});
    switch (conversation.conversationType) {
      case 'CONV_GROUP':
        this._groupService.addGroup(this.user.id,  conversation).subscribe((res: any) => {
          if (res.status.code === 'STATUS_OK') {
            this.getGroupList();
          }
        });
        break;
      case 'CONV_CHNNL':
        this._channelService.addChannel(this.user.id,  conversation).subscribe((res: any) => {
          if (res.status.code === 'STATUS_OK') {
            this.getChannelList();
          }
        });
        break;
    }
  }

  addCGDConversation(conversationType) {
    this._dialog.open(AddUserComponent, {
      width: '380px',
      data: {
        userId: this.user.id,
        convType: conversationType
      }
    }).afterClosed().subscribe((conv: any) => {
      this.addGroup(conv);
    });
  }

  signOut() {
    this._authService.signOut().subscribe();
  }
}
