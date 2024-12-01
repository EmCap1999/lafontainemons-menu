import { Component, OnInit } from '@angular/core';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrl: '../../app.component.scss'
})
export class BeersComponent implements OnInit {
  itemsList: any = [];

  constructor(private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    const condition = { section: 'Bières' };
    this.getAllItems(condition);
  }

  async getAllItems(condition?: any) {
    this.httpProvider.getAllItems(condition).subscribe((data: any) => {
      if (data != null && data.body != null) {
        let resultData = data.body;

        if (resultData) {
          // Extraire les éléments spécifiques
          const specialItems = [
            "Saint-Lazare 002 Saison",
            "Saint-Lazare 006 IPA",
            "Supplément de sirop"
          ];

          const orderedSpecialItems = specialItems.map(name =>
            resultData.find((item: { name: string; }) => item.name === name));

          const remainingItems = resultData.filter(
            (item: { name: string; }) => !specialItems.includes(item.name));

          remainingItems.sort((a: any, b: any) => {
            if (a.price === b.price) {
              return a.name.localeCompare(b.name);
            }
            return a.price - b.price;
          });

          this.itemsList = [
            orderedSpecialItems[0],
            orderedSpecialItems[1],
            ...remainingItems,
            orderedSpecialItems[2]
          ];
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