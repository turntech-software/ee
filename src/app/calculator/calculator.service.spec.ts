import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[CalculatorService]
    });
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 7 as the sum', () => {
    const result = service.addValues(2, 5);
    expect(result).toEqual(7);
  });

  it('should return 3 as the difference', () => {
    const result = service.subtractValues(5, 2);
    expect(result).toEqual(3);
  });

  it('should return 24 as the product', () => {
    const result = service.multiplyValues(12, 2);
    expect(result).toEqual(24);
  });

  it('should return 4 as the quotient', () => {
    const result = service.divideValues(36, 9);
    expect(result).toEqual(4);
  });
});
