import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { EPaper } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'e-paper-frontend';
  usingDarkTheme = false;
  year = new Date().getFullYear();

  dataSourceNewsPapers: EPaper[] = [];
  dataSourceBrochures: EPaper[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {    
    this.detectColorScheme();

    this.http.get<EPaper[]>('https://api.jtjarks.de/api/epaper/newest').subscribe(data => {
        let newsPapers: EPaper[] = [];
        let brochures: EPaper[] = [];
        data.forEach(element => {
          let epaper: EPaper = {
            "category": element.category,
            "filePath": element.filePath,
            "imagePath": element.imagePath,
            "name": element.name,
            "publicationDate": formatDate(element.publicationDate, 'yyyy-MM-dd', 'en-US'),
            "weekday": element.weekday
          } 
          console.log(epaper)

          if(epaper.category == "Zeitungen") {
            newsPapers.push(epaper);
          }                   
          else if (epaper.category == "Prospekte") {
            
            brochures.push(epaper);
          }
        });
        
        this.dataSourceNewsPapers = newsPapers;
        this.dataSourceBrochures = brochures;
        
    })     
  } 

  toggleDarkTheme(): void {
    document.body.classList.toggle("bg-dark")
    document.body.classList.toggle("text-white")        
    document.getElementById("newspapers-table")?.classList.toggle("table-dark")
    document.getElementById("brochures-table")?.classList.toggle("table-dark")
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
