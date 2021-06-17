import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DarkThemeService {
  public isDarkThemeActive$ = new BehaviorSubject(false);

  public toggleDarkTheme() {
    if(this.isDarkThemeActive$.getValue() === true) {
      this.isDarkThemeActive$.next(false);
    }
    else {      
      this.isDarkThemeActive$.next(true);      
    }
  }
  
  constructor() {
    //local storage is used to override OS theme settings
    if(localStorage.getItem("theme")){
      if(localStorage.getItem("theme") == "dark"){
        this.toggleDarkTheme();
      }
    } else if(!window.matchMedia) {
        //matchMedia method not supported
        return;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        this.toggleDarkTheme()
    }
  }
}
