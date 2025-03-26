import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryListComponent } from './country-list.component';
import { FlagExplorerService } from '../../../../shared/services/flag-explorer.service';
import { of } from 'rxjs';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let flagExplorerServiceMock: jasmine.SpyObj<FlagExplorerService>;

  beforeEach(async () => {

    // Mock api service
    flagExplorerServiceMock = jasmine.createSpyObj<FlagExplorerService>('FlagExplorerService', ['getCountryList']);
    // Mock API call
    flagExplorerServiceMock.getCountryList.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [CountryListComponent],
      providers: [{ provide: FlagExplorerService, useValue: flagExplorerServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#countries should be empty', () => {
    expect(component.countries).withContext('at first it should have an empty array').toEqual([]);
  });

  it('should call fetchCountries during #ngOnInit', () => {
    spyOn(component, 'fetchCountries'); // Spy on fetchCountries method

    // Trigger ngOnInit
    component.ngOnInit();

    // Check fetchCountries is called
    expect(component.fetchCountries).toHaveBeenCalled();
  });

  it('should populate countries property via fetchCountries', () => {
    // Mock API response data
    const mockCountries = [
      {name: "Hungary", flag: "https://flagcdn.com/w320/hu.png", population: 3211, capital: "Budapest"},
      {name: "South Georgia", flag: "https://flagcdn.com/w320/gs.png", population: 4211, capital: "King Edward Point"}
    ];

    flagExplorerServiceMock.getCountryList.and.returnValue(of(mockCountries));

    // Trigger ngOnInit
    component.ngOnInit();

    // Verify data is populated
    expect(component.countries).toEqual(mockCountries);
  });
});
