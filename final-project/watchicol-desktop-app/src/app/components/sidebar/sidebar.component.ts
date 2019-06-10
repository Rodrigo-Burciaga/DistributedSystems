import { Component, OnInit } from '@angular/core';
import { ShowButtonServiceService } from '../../services/show-button-service.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public showButtonService: ShowButtonServiceService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    AuthService.logOut();
    this.router.navigate(['login'], {
      queryParams: {response_type: 'token', scope: 'email', state: 'ap123', client_id: 'api123'}
    });
  }
}
