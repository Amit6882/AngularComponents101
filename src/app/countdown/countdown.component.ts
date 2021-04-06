import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnChanges, OnDestroy{

  @Input() init: number = null;
  public counter: number = 0;

  @Output() onDecrese = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  countdownTimerRef: any = null;
  
  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('init value updated to: ', changes.init.currentValue);
    this.startCountdown();
  }

  ngOnInit(): void {
    this.startCountdown();
  }
  
  startCountdown() {
    if(this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }
  
  doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }
  
  private clearTimeout() {
    if(this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
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
  
  ngOnDestroy(): void {
    this.clearTimeout();
  }
}
