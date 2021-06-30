import { Action } from './../model';
import { CalculatorMockService } from './../calculator/calculator.service.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorService } from '../calculator/calculator.service';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      providers: [
        { provide: CalculatorService, useValue: new CalculatorMockService() },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onNumberClick', () => {
    it('should set isNumberClicked to true', () => {
      component.onNumberClick('1');
      expect(component.isNumberClicked).toEqual(true);
    });

    it('should call result$.next() with the passed value and set isActionClicked to false', () => {
      const spy = spyOn(component.result$, 'next');

      component.isActionClicked = true;
      component.onNumberClick('1');

      expect(spy).toHaveBeenCalledWith('1');
      expect(component.isActionClicked).toEqual(false);
    });

    it('should call result$.next() with result$.value + value', () => {
      component.result$.next('1');

      const spy = spyOn(component.result$, 'next');

      component.isActionClicked = false;
      component.onNumberClick('2');

      expect(spy).toHaveBeenCalledWith('12');
      expect(component.isActionClicked).toEqual(false);
    });
  });

  describe('onActionClick', () => {
    it('should set isActionClicked to true', () => {
      component.onActionClick(Action.Add);
      expect(component.isActionClicked).toEqual(true);
    });

    it('should call getResult and pass the return value to result$.next', () => {
      const spy = spyOn<any>(component, 'getResult').and.returnValue(3);

      component.previousValue = '1';
      component.result$.next('2');

      component.currentAction = Action.Add;
      component.isNumberClicked = true;
      component.onActionClick(Action.Equals);

      expect(spy).toHaveBeenCalledWith(Action.Add, 1, 2);
    });

    it('should set previousValue to result$.value', () => {
      component.result$.next('2');
      component.isNumberClicked = true;
      component.onActionClick(Action.Equals);
      expect(component.previousValue).toEqual(component.result$.value);
    });

    it('should set isNumberClicked to false', () => {
      component.isNumberClicked = true;
      component.onActionClick(Action.Equals);
      expect(component.isNumberClicked).toEqual(false);
    });

    it('should set currentAction to passed action parameter', () => {
      component.onActionClick(Action.Divide);
      expect(component.currentAction).toEqual(Action.Divide);
    });
  });

  describe('onClearClick', () => {
    it('should set currentAction, previousValue to undefined, call result$.next() with 0', () => {
      const spy = spyOn(component.result$, 'next');

      component.currentAction = Action.Add;
      component.previousValue = '100';

      component.onClearClick();

      expect(component.currentAction).toBeFalsy();
      expect(component.previousValue).toBeFalsy();
      expect(spy).toHaveBeenCalledWith('0');
    });
  });

  describe('getResult', () => {
    it('should set call calculatorService.addValues', () => {
      const spy = spyOn(component['calculatorService'], 'addValues');
      component['getResult'](Action.Add, 100, 200);
      expect(spy).toHaveBeenCalledWith(100, 200);
    });

    it('should set call calculatorService.subtractValues', () => {
      const spy = spyOn(component['calculatorService'], 'subtractValues');
      component['getResult'](Action.Subtract, 100, 200);
      expect(spy).toHaveBeenCalledWith(100, 200);
    });

    it('should set call calculatorService.multiplyValues', () => {
      const spy = spyOn(component['calculatorService'], 'multiplyValues');
      component['getResult'](Action.Multiply, 100, 200);
      expect(spy).toHaveBeenCalledWith(100, 200);
    });

    it('should set call calculatorService.divideValues', () => {
      const spy = spyOn(component['calculatorService'], 'divideValues');
      component['getResult'](Action.Divide, 100, 200);
      expect(spy).toHaveBeenCalledWith(100, 200);
    });
  });
});
