import { Component, OnInit } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFax } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope as faEnvelopeS } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope as faEnvelopeR } from '@fortawesome/free-regular-svg-icons'; 
import { faSkype } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  faPh=faPhone;
  faFx=faFax;
  faEnv=faEnvelopeS;
  faSky=faSkype;
  faEnvR=faEnvelopeR;
  constructor() { }

  ngOnInit(): void {
  }

}
