import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() eventLink = new EventEmitter<any>();
  data:any;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  getData(){
    this.auth.getData().subscribe({
      next: (response) => {
        this.data = response
        this.eventLink.emit(this.data.message)
      },
      error: (err) => {
        console.log(err);
      },
    });




  }

}
