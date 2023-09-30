import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private SERVER_URL = 'http://localhost:3000';
  constructor() { }

  // Setup connection to socket server
  initSocket() {
    console.log("SocketService initSocket called");
    this.socket = io(this.SERVER_URL);
    return () => {
      this.socket.disconnect();
    };
  }

  // Emit a message to the socket server
send(data: { message: string, channel: string }) {
    console.log("Emitting message through socket:", data);
    this.socket.emit('chat-message', data);
}

  // Listen for "message" events from the socket server
  public onMessage(): Observable<{ channel: string, message: string }> {
    return new Observable<{ channel: string, message: string }>(observer => {
      this.socket.on('new-message', (data: { channel: string, message: string }) => observer.next(data));
    });
}

  
}