import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryListComponent } from './features/countries/components/country-list/country-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CountryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Flag Explorer Webapp';
}
