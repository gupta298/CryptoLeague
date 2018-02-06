import { Component, OnInit } from '@angular/core';
declare var UIkit: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showAlert(): void {
    UIkit.modal.alert('UIkit alert!');
  }
}
