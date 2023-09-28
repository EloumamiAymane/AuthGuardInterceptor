import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  data: any
  constructor() { }

  ngOnInit(): void {
  }

  getDataEmitted(event:any) {
   this.data=event
  }

}
