import { Component, OnInit } from '@angular/core';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faPhoneAlt = faPhoneAlt;
  faMapMarkerAlt = faMapMarkerAlt;

  constructor() {}

  ngOnInit(): void {}
}
