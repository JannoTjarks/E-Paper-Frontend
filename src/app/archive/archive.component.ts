import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  dataSourceEPapers: EPaper[] = [];  

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe(params => {
        if(params.get("all") != null) {
          console.log("not null")
          this.getEpaperInfos(params.get('epaper'), true);
        } 
        else {
          console.log("null")
          this.getEpaperInfos(params.get('epaper'), false);
        }        
      }
    );
  }

  getEpaperInfos(epaper: any, all: boolean): void {
    let url: string = "https://api.jtjarks.de/api/epaper/" + epaper;
    if(all == true) {
      url += "?all=true"
    }
    this.http.get<EPaper[]>(url).subscribe(data => {
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
        console.log(epaper)
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