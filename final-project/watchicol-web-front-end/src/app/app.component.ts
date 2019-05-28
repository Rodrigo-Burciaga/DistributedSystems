import { Component } from '@angular/core';
import { ShowButtonServiceService } from './services/show-button-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  footerText = `Derechos Reservados © ${new Date().getFullYear()}`;

  constructor(public showButtonService: ShowButtonServiceService) {

  }
}
