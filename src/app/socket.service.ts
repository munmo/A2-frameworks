import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
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
  send(data: { message: string; channel: string }) {
    console.log("Emitting message through socket:", data);
    this.socket.emit('chat-message', data);
  }

  // Listen for "message" events from the socket server
  public onMessage(): Observable<{ channel: string; message: string }> {
    return new Observable<{ channel: string; message: string }>(observer => {
      this.socket.on('new-message', (data: { channel: string; message: string }) => observer.next(data));
    });
  }

  // Emit an image to the socket server
  sendImage(data: { image: string; channel: string }) {
    this.socket.emit('sendImage', data);
  }

  // Listen for "imageReceived" events from the socket server
  public onImageReceived(): Observable<{ channel: string; image: string }> {
    return new Observable<{ channel: string; image: string }>(observer => {
      this.socket.on('imageReceived', (data: { channel: string; image: string }) => observer.next(data));
    });
  }

 
}
