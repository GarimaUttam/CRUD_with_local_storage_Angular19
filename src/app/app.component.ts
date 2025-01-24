import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  localKey: string = "angular19User";

  ngOnInit(): void {
    debugger;
    const localData = localStorage.getItem('localKey');
    if(localData != null){
      this.userList = JSON.parse(localData);
    }
  }

  isNewUser: boolean = false;

  userObj: User = new User();
  userList: User[] = [];

  changeView() {
    this.isNewUser = !this.isNewUser;
  }

  onSave() {
    debugger;
    this.userObj.userId = this.userList.length + 1;
    this.userList.push(this.userObj);
    this.userObj = new User();
    localStorage.setItem('localKey', JSON.stringify(this.userList));
    this.changeView();
  }

  onEdit(data: User){
    this.userObj = data;
    this.changeView();
  }
  onUpdate(){
    const record = this.userList.find(m=>m.userId == this.userObj.userId);
    if(record != undefined){
      record.fName = this.userObj.fName;
      record.lName = this.userObj.lName;
      record.uName = this.userObj.uName;
      record.city = this.userObj.city;
      record.state = this.userObj.state;
      record.zipCode = this.userObj.zipCode;
      record.isAgree = this.userObj.isAgree;
    }
    localStorage.setItem('localKey', JSON.stringify(this.userList));
    this.changeView();
  }
  onDelete(userId: number){
    const isDelete = confirm("Are yoy=u sure to delete this card ?");
    if(isDelete){
      const index = this.userList.findIndex(m => m.userId == userId);
      this.userList.splice(index, 1);
      localStorage.setItem('localKey', JSON.stringify(this.userList));
    }

  }
}


class User {
  userId: number;
  fName: string;
  lName: string;
  uName: string;
  city: string;
  state: string;
  zipCode: string;
  isAgree: boolean;

  constructor(){
    this.userId = 0;
    this.fName = "";
    this.lName = "";
    this.uName = "";
    this.city = "";
    this.state = "";
    this.zipCode = "";
    this.isAgree = false;
  }
}