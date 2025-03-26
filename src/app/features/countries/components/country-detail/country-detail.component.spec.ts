import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailComponent } from './country-detail.component';
import { FlagExplorerService } from '../../../../shared/services/flag-explorer.service';
import { of } from 'rxjs';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;
  let flagExplorerServiceMock: jasmine.SpyObj<FlagExplorerService>;

  beforeEach(async () => {

    // Mock api service
    flagExplorerServiceMock = jasmine.createSpyObj<FlagExplorerService>('FlagExplorerService', ['getCountryDetail']);
    // Mock API call
    flagExplorerServiceMock.getCountryDetail.and.returnValue(of({name: '', flag: '', population: 0, capital: ''}));

    await TestBed.configureTestingModule({
      imports: [CountryDetailComponent],
      providers: [{provide: FlagExplorerService, useValue: flagExplorerServiceMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#countryDetail should be uninitialized', () => {
    expect(component.countryDetail).withContext('at first it should be undefined').toEqual(undefined);
  });

  it('should call fetchCountryDetails during #ngOnInit', () => {
    spyOn(component, 'fetchCountryDetails'); // Spy on fetchCountryDetails method

    // Trigger ngOnInit
    component.ngOnInit();

    // Check fetchCountries is called
    expect(component.fetchCountryDetails).toHaveBeenCalled();
  });

  it('should populate countryDetail property via fetchCountryDetails', () => {
    // Mock API response data
    const mockCountry = {name: "Hungary", flag: "https://flagcdn.com/w320/hu.png", population: 3211, capital: "Budapest"};

    flagExplorerServiceMock.getCountryDetail.and.returnValue(of(mockCountry));

    // Trigger ngOnInit
    component.ngOnInit();

    // Verify data is populated
    expect(component.countryDetail).toEqual(mockCountry);
  });
});
