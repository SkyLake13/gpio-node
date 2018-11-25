import { Component } from '@angular/core';
import { WebsocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  switches = [];

  constructor(private socketService: WebsocketService) {
    this.socketService.connect();
  }

  ngOnInit() {
    this.socketService.getState().subscribe(sws => {
      this.switches = sws;
    });
  }

  change(sw) {
    if(sw.state === 1) {
      this.on(sw.id);
    } else {
      this.off(sw.id);
    }
  }

  private on(id: string) {
    this.socketService.on(id);
  }

  private off(id: string) {
    this.socketService.off(id);
  }
}
