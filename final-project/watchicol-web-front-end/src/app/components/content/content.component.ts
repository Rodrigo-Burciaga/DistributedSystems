import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/ui/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(public contentService: ContentService) {
  }

  ngOnInit() {
  }

}
