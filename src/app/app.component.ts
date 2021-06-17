
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'EPaper - Janno Tjarks';
  usingDarkTheme = false;
  year = new Date().getFullYear();

  ngOnInit(): void {    
    this.detectColorScheme();
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle("bg-dark")
    document.body.classList.toggle("text-white")                  
  }

  detectColorScheme(): void {
    //local storage is used to override OS theme settings
    if(localStorage.getItem("theme")){
      if(localStorage.getItem("theme") == "dark"){
          this.usingDarkTheme = true;
      }
    } else if(!window.matchMedia) {
        //matchMedia method not supported
        return;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        this.usingDarkTheme = true;
    }

    if(this.usingDarkTheme === true) {      
      this.toggleDarkTheme()
    }
  }
}
