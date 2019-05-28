import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/ui/content.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  constructor(private contentService: ContentService) {
    this.contentService.changeState('Ayuda');
  }

  ngOnInit() {
  }

}
