import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../../../controls/conversation/user.service';
import {User} from '../../../models/user';
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface SelectUsers {
  userId: string;
  convType: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  users: User[];

  convForm = new FormGroup({
    participants: new FormControl([], Validators.required),
    conversationType: new FormControl(this.data.convType, Validators.required),
    conversationName: new FormControl('', Validators.required)
  });

  constructor(public dlg: MatDialogRef<AddUserComponent>,
              @Inject(MAT_DIALOG_DATA) private data: SelectUsers,
              private userService: UserService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUserList(this.data.userId).subscribe((res: any) => {
      this.users = res.list;
    });
  }

  create() {
    this.dlg.close(this.convForm.value);
  }
}
