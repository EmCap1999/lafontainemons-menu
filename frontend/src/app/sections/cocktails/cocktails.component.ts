import { Component } from '@angular/core';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrl: '../../app.component.scss'
})
export class CocktailsComponent {
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
          this.itemsList = resultData;
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
