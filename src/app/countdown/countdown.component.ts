import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit{

  @Input() init: number = null;
  public counter: number = 0;

  @Output() onDecrese = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  constructor() { }
  
  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    if(this.init && this.init > 0) {
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }

  processCountdown() {
    this.onDecrese.emit(this.counter);
    console.log('count is: ', this.counter);

    if(this.counter === 0) {
      this.onComplete.emit();
      console.log('--counter end--');
    } else {
      this.doCountdown();
    }
  }

}
