import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { forkJoin } from 'rxjs';

interface Country {
  name: string;
  countryCode: string;
  nextHoliday?: string;
}

@Component({
  selector: 'app-random-countries',
  templateUrl: './random-countries.component.html',
  styleUrl: './random-countries.component.scss',
})
export class RandomCountriesComponent implements OnInit {
  randomCountries: any[] = [];
  nextHolidays: { country: string; holiday: any }[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((countries) => {
      this.randomCountries = this.getRandomCountries(countries, 3);

      this.loadNextHolidays();
    });
  }

  getRandomCountries(countries: any[], count: number): any[] {
    const shuffled = countries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  loadNextHolidays(): void {
    this.randomCountries.forEach((country) => {
      this.countryService
        .getNextHoliday(country.countryCode)
        .subscribe((holidays) => {
          if (holidays.length > 0) {
            this.nextHolidays.push({
              country: country.name,
              holiday: holidays[0],
            });
          }
        });
    });
  }
}
