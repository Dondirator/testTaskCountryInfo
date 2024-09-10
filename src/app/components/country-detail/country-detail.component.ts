import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent implements OnInit {
  countryCode: string;
  countryName: string;
  holidays: any[] = [];
  currentYear = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    // Получаем код страны из параметров маршрута
    this.countryCode = this.route.snapshot.paramMap.get('countryCode') || '';

    // Получаем название страны по коду
    this.countryService
      .getCountryNameByCode(this.countryCode)
      .subscribe((name) => {
        this.countryName = name;
      });

    // Загружаем праздники для текущего года
    this.loadHolidays(this.currentYear);
  }

  loadHolidays(year: number): void {
    this.countryService.getPublicHolidays(year, this.countryCode).subscribe(
      (holidays) => {
        this.holidays = holidays;
      },
      (error) => {
        console.error('Error fetching holidays', error);
      }
    );
  }
}
