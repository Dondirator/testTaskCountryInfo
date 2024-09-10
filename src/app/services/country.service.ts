import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Country {
  name: string;
  countryCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  getCountryName(countryCode: string): string {
    throw new Error('Method not implemented.');
  }
  private apiUrl = `${environment.API_BASE_URL}/AvailableCountries`;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getNextHoliday(countryCode: string): Observable<any[]> {
    const url = `${environment.API_BASE_URL}/NextPublicHolidays/${countryCode}`;
    return this.http.get<any[]>(url);
  }

  getPublicHolidays(year: number, countryCode: string): Observable<any> {
    const url = `${environment.API_BASE_URL}/PublicHolidays/${year}/${countryCode}`;
    return this.http.get<any[]>(url);
  }

  getCountryNameByCode(countryCode: string): Observable<string> {
    return this.getCountries().pipe(
      map((countries) => {
        const country = countries.find((c) => c.countryCode === countryCode);
        return country ? country.name : countryCode;
      })
    );
  }
}
