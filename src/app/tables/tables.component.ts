import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})

export class TablesComponent implements OnInit {
  dataSourceEPapers: EPaper[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {  
    this.detectColorScheme();      
    this.getEpaperInfos();
  }

  toggleDarkTheme(): void {         
    document.getElementById("newspapers-table")?.classList.toggle("table-dark")
    document.getElementById("brochures-table")?.classList.toggle("table-dark")
  }

  detectColorScheme(): void {
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

  getEpaperInfos(): void {
    this.http.get<EPaper[]>('https://api.jtjarks.de/api/epaper/newest').subscribe(data => {
      let ePapers: EPaper[] = [];
      data.forEach(element => {
        let epaper: EPaper = {
          "category": element.category,
          "filePath": element.filePath,
          "imagePath": element.imagePath,
          "name": element.name,
          "publicationDate": formatDate(element.publicationDate, 'dd.MM.yyyy', 'en-US'),
          "weekday": element.weekday
        } 

        ePapers.push(epaper);
      });
      
      this.dataSourceEPapers = ePapers;
    })
  }
}

export interface EPaper {
  category: string;
  filePath: number;
  imagePath: number;
  name: string;
  publicationDate: string;
  weekday: string;
}