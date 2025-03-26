import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { Country } from '../models/country';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlagExplorerService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  // GET request to fetch all countries
  getCountryList(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.baseUrl}/countries`).pipe(timeout(120000));
  }

  // GET request to fetch all country detail
  getCountryDetail(name: string | null = ''): Observable<Country> {
    return this.httpClient.get<Country>(`${this.baseUrl}/countries/${name}`);
  }
}
