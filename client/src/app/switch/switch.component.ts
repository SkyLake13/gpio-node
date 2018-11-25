import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input()
  switch: any;

  @Output()
  change = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('switch ', this.switch);
  }

  toggle() {
    if(this.switch.state === 0) {
      this.switch.state = 1;
    } else {
      this.switch.state = 0;
    }

    this.change.emit(this.switch);
  }
}
