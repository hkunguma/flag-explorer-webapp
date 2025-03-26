import { TestBed } from '@angular/core/testing';
import { FlagExplorerService } from './flag-explorer.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('FlagExplorerService', () => {
  let service: FlagExplorerService;
  let flagExplorerService: FlagExplorerService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagExplorerService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    flagExplorerService = new FlagExplorerService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list', () => {
    service.getCountryList().subscribe((items) => {
      expect(items.length).toBeGreaterThan(1);    
    });
  });

  it('should return expected countries', (done: DoneFn) => {
    // Mock API response data
    const mockCountries = [
      {name: "Hungary", flag: "https://flagcdn.com/w320/hu.png", population: 3211, capital: "Budapest"},
      {name: "South Georgia", flag: "https://flagcdn.com/w320/gs.png", population: 4211, capital: "King Edward Point"}
    ];

    httpClientSpy.get.and.returnValue(of(mockCountries));

    flagExplorerService.getCountryList().subscribe({
      next: (countries) => {
        expect(countries).withContext('expected country list').toEqual(mockCountries);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return server error 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    flagExplorerService.getCountryDetail(null).subscribe({
      next: (country) => done.fail('expected an error, not countryDetail'),
      error: (error) => {
        expect(error.message).toContain('test: 404 error');
        done();
      }
    });
  });
});
