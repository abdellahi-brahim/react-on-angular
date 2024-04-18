import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactComponent from '../react/ReactComponent';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('reactRoot', { static: true }) reactRoot?: ElementRef;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    if (this.reactRoot) {
      this.ngZone.runOutsideAngular(() => {
        ReactDOM.render(
          <ReactComponent
            message="Hello from React"
          />,
          this.reactRoot!.nativeElement
        );
      });
    }
  }

  ngOnDestroy() {
    if (this.reactRoot) {
      ReactDOM.unmountComponentAtNode(this.reactRoot.nativeElement);
    }
  }
}
