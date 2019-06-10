import { Component, OnInit } from '@angular/core';
import { ShowButtonServiceService } from '../../../services/show-button-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public showButtonService: ShowButtonServiceService) {
  }

  ngOnInit() {
  }

}
