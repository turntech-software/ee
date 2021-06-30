import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {
  constructor() {}

  addValues(leftOperand: number, rightOperand: number): number {
    return leftOperand + rightOperand;
  }

  subtractValues(leftOperand: number, rightOperand: number): number {
    return leftOperand - rightOperand;
  }

  multiplyValues(leftOperand: number, rightOperand: number): number {
    return leftOperand * rightOperand;
  }

  divideValues(leftOperand: number, rightOperand: number): number {
    return leftOperand / rightOperand;
  }
}
