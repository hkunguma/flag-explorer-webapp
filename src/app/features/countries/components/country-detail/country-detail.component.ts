import { Component, Input, OnInit } from '@angular/core';
import { FlagExplorerService } from '../../../../shared/services/flag-explorer.service';
import { Country } from '../../../../shared/models/country';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent implements OnInit {
  @Input() countryName: string | null = null;
  countryDetail: Country | undefined;
  
  constructor(private flagExplorerService: FlagExplorerService) {}

  ngOnInit(): void {
    if (this.countryName) {
      this.fetchCountryDetails();
    }
  }

  fetchCountryDetails(): void {
    this.flagExplorerService.getCountryDetail(this.countryName).subscribe({
      next: (data) => this.countryDetail = data,
      error: (err) => console.error(err)
      //complete: () =>
    });
  }
}
