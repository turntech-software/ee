import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from '../model';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  @Input() result: string = '';
  @Output() numberClick = new EventEmitter<string>();
  @Output() actionClick = new EventEmitter<Action>();
  @Output() clearClick = new EventEmitter<void>();

  Action = Action;

  constructor() {}

  ngOnInit(): void {}
}
