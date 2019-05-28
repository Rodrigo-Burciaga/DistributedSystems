import { Component, OnInit } from '@angular/core';
import { ShowButtonServiceService } from '../../services/show-button-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showSideBar = false;

  constructor(private showButtonService: ShowButtonServiceService) { }

  ngOnInit() {
  }

  public changeState(): void {
    this.showSideBar = !this.showSideBar;
    this.showButtonService.changeState(this.showSideBar);
  }

}
