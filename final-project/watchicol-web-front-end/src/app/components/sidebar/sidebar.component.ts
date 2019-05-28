import { Component, Input, OnInit } from '@angular/core';
import { ShowButtonServiceService } from '../../services/show-button-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public showButtonService: ShowButtonServiceService) { }

  ngOnInit() {
  }
}
