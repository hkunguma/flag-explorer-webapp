import { Component, OnInit } from '@angular/core';
import { FlagExplorerService } from '../../../../shared/services/flag-explorer.service';
import { Country } from '../../../../shared/models/country';
import { CountryDetailComponent } from '../country-detail/country-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-list',
  imports: [
    CountryDetailComponent,
    CommonModule
  ],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  selectedCountryName: string | null = '';

  constructor(private flagExplorerService: FlagExplorerService) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.flagExplorerService.getCountryList().subscribe({
      next: (data) => this.countries = data,
      error: (err) => console.error(err)
      //complete: () =>
    });
  }

  // Set selected row and toggle the details view for the same row
  selectedCountry(name: string): void {
    this.selectedCountryName = this.selectedCountryName === name ? null : name;
  }
}
