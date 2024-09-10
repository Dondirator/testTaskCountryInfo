import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';

interface Country {
  name: string;
  countryCode: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';

  randomCountries: { country: Country; holiday: any }[] = [];
  currentYear: number = new Date().getFullYear();

  private countrySub: Subscription;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countrySub = this.countryService
      .getCountries()
      .subscribe((data: Country[]) => {
        this.countries = data;
        this.filteredCountries = data;
      });
  }

  onSearchChandge() {
    this.filteredCountries = this.countries.filter((country) =>
      country.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.countrySub.unsubscribe();
  }
}
