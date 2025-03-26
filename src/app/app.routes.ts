import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CountryDetailComponent } from './features/countries/components/country-detail/country-detail.component';
import { CountryListComponent } from './features/countries/components/country-list/country-list.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'country-list', component: CountryListComponent},
    { path: 'country-detail/:name', component: CountryDetailComponent}
];
