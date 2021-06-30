import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Action } from '../model';
import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render result', () => {
    component.result = '1000';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const input = compiled.querySelector('#result');
    expect(input.value).toContain('1,000');
  });

  describe('AC Button', () => {
    it('should render AC', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#clearBtn');
      expect(button.textContent).toContain('AC');
    });

    it('should call clearClick.emit when clicked', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#clearBtn');
      const spy = spyOn(component.clearClick, 'emit');
      button.click();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Number Buttons', () => {
    const ids = [
      '#oneBtn',
      '#twoBtn',
      '#threeBtn',
      '#fourBtn',
      '#fiveBtn',
      '#sixBtn',
      '#sevenBtn',
      '#eightBtn',
      '#nineBtn',
      '#zeroBtn',
      '#dotBtn',
    ];

    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'];

    it('should render number labels', () => {
      const compiled = fixture.nativeElement;
      ids.forEach((id, idx) => {
        const button = compiled.querySelector(id);
        expect(button.textContent).toContain(values[idx]);
      });
    });

    it('should call numberClick.emit when button is clicked', () => {
      const spy = spyOn(component.numberClick, 'emit');
      const compiled = fixture.nativeElement;
      ids.forEach((id, idx) => {
        const button = compiled.querySelector(id);
        button.click();
        expect(spy.calls.mostRecent().args[0]).toEqual(values[idx].toString());
      });
    });
  });

  describe('Action Buttons', () => {
    it('should render division symbol', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#divideBtn');
      expect(button.textContent).toContain('÷');
    });

    it('should call actionClick.emit with Action.Divide when clicked', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#divideBtn');
      const spy = spyOn(component.actionClick, 'emit');
      button.click();
      expect(spy).toHaveBeenCalledWith(Action.Divide);
    });

    it('should render multiplication symbol', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#multiplyBtn');
      expect(button.textContent).toContain('x');
    });

    it('should call actionClick.emit with Action.Multiply when clicked', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#multiplyBtn');
      const spy = spyOn(component.actionClick, 'emit');
      button.click();
      expect(spy).toHaveBeenCalledWith(Action.Multiply);
    });

    it('should render subtract symbol', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#subtractBtn');
      expect(button.textContent).toContain('-');
    });

    it('should call actionClick.emit with Action.Subtract when clicked', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#subtractBtn');
      const spy = spyOn(component.actionClick, 'emit');
      button.click();
      expect(spy).toHaveBeenCalledWith(Action.Subtract);
    });

    it('should render add symbol', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#addBtn');
      expect(button.textContent).toContain('+');
    });

    it('should call actionClick.emit with Action.Add when clicked', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('#addBtn');
      const spy = spyOn(component.actionClick, 'emit');
      button.click();
      expect(spy).toHaveBeenCalledWith(Action.Add);
    });
  });
});
