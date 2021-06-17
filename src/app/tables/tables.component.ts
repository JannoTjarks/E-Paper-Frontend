import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DarkThemeService } from '../darktheme.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})

export class TablesComponent implements OnInit {
  isDarkThemeActiv: boolean = false;
  dataSourceEPapers: EPaper[] = [];

  constructor(private http: HttpClient, private darkTheme: DarkThemeService) { }

  ngOnInit(): void {  
     
    this.getEpaperInfos();
  }  

  getEpaperInfos(): void {
    this.darkTheme.isDarkThemeActive$.subscribe(value => this.isDarkThemeActiv = value)

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