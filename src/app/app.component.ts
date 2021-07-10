import { Component } from '@angular/core';
import { DarkThemeService } from './darktheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'EPaper - Janno Tjarks';
  usingDarkTheme = false;
  year = new Date().getFullYear();

  constructor(private darkTheme: DarkThemeService) {}

  ngOnInit(): void {    
    if(this.darkTheme.isDarkThemeActive$.getValue() === true) {
      document.body.classList.toggle("bg-dark");
      document.body.classList.toggle("text-white");
    }        

    this.usingDarkTheme = this.darkTheme.isDarkThemeActive$.getValue();
  }

  toggleDarkTheme(): void {    
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");
    this.darkTheme.toggleDarkTheme();
    this.usingDarkTheme = this.darkTheme.isDarkThemeActive$.getValue();    
  }  
}
