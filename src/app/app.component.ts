import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  selection = 'recipes';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBTdANPqItGm5us3yIjQWdzHIXYoKbhLPM',
      authDomain: 'ng-recipe-book-b5dac.firebaseapp.com',
    });
  }

  onSelectionChanged(selection) {
    console.log('onSelectionChanged', selection);
    this.selection = selection;
  }

}
