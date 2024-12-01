import { Component, OnInit } from '@angular/core';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrl: '../../app.component.scss'
})
export class CocktailsComponent implements OnInit{
  itemsList: any = [];

  constructor(private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    const condition = { section: 'Apéritifs' };
    this.getAllItems(condition);
  }
  
  async getAllItems(condition?: any) {
    this.httpProvider.getAllItems(condition).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.itemsList = resultData.sort((a: any, b: any) => {
            if (a.price === b.price) {
              return a.name.localeCompare(b.name);
            }
            return a.price - b.price;
          });
        }
      }
    },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.itemsList = [];
            }
          }
        }
      });
  }
}