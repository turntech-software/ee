import { Action } from './../model';
import { CalculatorService } from './../calculator/calculator.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [CalculatorService],
})
export class ContainerComponent implements OnInit {
  result$: BehaviorSubject<string> = new BehaviorSubject<string>('0');
  currentAction?: Action;
  previousValue?: string;
  isActionClicked: boolean = false;
  isNumberClicked: boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {}

  onNumberClick(value: string) {
    this.isNumberClicked = true;

    if (this.isActionClicked) {
      this.result$.next(value);
      this.isActionClicked = false;
    } else {
      this.result$.next(this.result$.value + value);
    }
  }

  onActionClick(action: Action) {
    this.isActionClicked = true;

    if (this.isNumberClicked) {
      if (this.previousValue) {
        const value = this.getResult(
          this.currentAction,
          Number(this.previousValue),
          Number(this.result$.value)
        );
        this.result$.next(value.toString());
      }
      this.previousValue = this.result$.value;
      this.isNumberClicked = false;
    }

    if (action !== Action.Equals) {
      this.currentAction = action;
    }
  }

  onClearClick() {
    this.currentAction = undefined;
    this.previousValue = undefined;
    this.result$.next('0');
  }

  private getResult(
    action?: Action,
    leftOperand: number = 0,
    rightOperand: number = 0
  ): number {
    switch (action) {
      case Action.Add:
        return this.calculatorService.addValues(leftOperand, rightOperand);
      case Action.Subtract:
        return this.calculatorService.subtractValues(leftOperand, rightOperand);
      case Action.Multiply:
        return this.calculatorService.multiplyValues(leftOperand, rightOperand);
      case Action.Divide:
        return this.calculatorService.divideValues(leftOperand, rightOperand);
      default:
        return 0;
    }
  }
}
