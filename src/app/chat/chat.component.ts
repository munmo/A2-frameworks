import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from '../socket.service';
import { ImguploadService } from '../imgupload.service';
import { ChangeDetectorRef } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  public groupNames: string[] = [];
  public isAllowedToCreateGroup: boolean = false; // Initially set to false
  public isModalOpen: boolean = false;
  public pendingInterests: any[] = [];
  public selectedGroup: string | null = null;
  public channelsForSelectedGroup: string[] = [];
  public selectedChannel: string = '';
  public selectedGroupName: string | null = null;
  public registeredGroups: string[] = [];

  
  createGroupForm: FormGroup = this.fb.group({
    group: ['']
  });

  messagecontent: string = '';
  messages: { [channel: string]: any[] } = {};
  ioConnection: any;
  selectedfile: any = null;
  imagepath = '';
  username: string | null = null; // Store the username
  receivedImages: string[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private socketService: SocketService,
    private imguploadService: ImguploadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Component ngOnInit called');
    this.username = localStorage.getItem('username'); // Fetch the username from local storage
    this.initSocketConnection();
    this.loadExistingGroups();
    this.determineUserPermissions();

  }
 
  // Function to check if the user is registered for a group
  isUserRegistered(group: string): boolean {
    if (!this.username) {
      return false; // User not logged in, so they can't be registered for any group
    }

    // Check if the user is registered for the group
    return this.registeredGroups.includes(group);
  }

  private initSocketConnection(): void {
    this.socketService.initSocket();
    this.initIoConnection();
  }

  private determineUserPermissions(): void {
    const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
    if (userRoles.includes('Super') || userRoles.includes('Group')) {
      this.isAllowedToCreateGroup = true;
    }
  }

  loadExistingGroups(): void {
    this.http.get<string[]>(`${BACKEND_URL}/api/getGroups`, httpOptions)
      .subscribe({
        next: (data) => {
          this.groupNames = data;
        },
        error: (error) => {
          console.error('Error fetching groups:', error);
        }
      });
  }

  openCreateGroupModal(): void {
    this.isModalOpen = true;
  }

  closeCreateGroupModal(): void {
    this.isModalOpen = false;
  }

  loadPendingInterests(): void {
    this.http.get<any[]>(`${BACKEND_URL}/api/pendingInterest`, httpOptions)
      .subscribe({
        next: (data) => {
          this.pendingInterests = data;
        },
        error: (error) => {
          console.error('Error fetching pending interests:', error);
        }
      });
  }

  confirmInterest(username: string, group: string): void {
    const httpOptions = {
      headers: {}
    };

    this.http.post(`${BACKEND_URL}/api/confirmInterest`, { username, group }, httpOptions)
      .subscribe({
        next: (data) => {
          console.log('Interest confirmed:', data);
          this.loadPendingInterests(); // Refresh list
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }

  createGroup(): void {
    const groupControl = this.createGroupForm.get('group');

    if (groupControl) {
      const group = groupControl.value;
      if (group) {
        this.http.post<any>(`${BACKEND_URL}/api/addGroup`, { group: group, channels: [] }, httpOptions)
          .subscribe({
            next: (data) => {
              console.log(data);
              if (data && data.group) {
                this.groupNames.push(data.group);
                this.isModalOpen = false; // Close the modal
              } else {
                console.error('Unexpected response:', data);
              }
              // Now reload the list of groups to ensure it's up-to-date.
              this.loadExistingGroups();
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
      }
    }
  }

  registerInterest(event: Event, group: string): void {
    event.preventDefault();

    const username = localStorage.getItem('username');

    if (!username) {
      console.error('No username found');
      return;
    }

    console.log('registerInterest called with:', group);

    this.http.post(`${BACKEND_URL}/api/registerInterest`, { username, group }, httpOptions)
      .subscribe({
        next: (data) => {
          alert('Interest registered!');
          console.log('Interest registered:', data);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
  

  initIoConnection(): void {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((data: { channel: string, message: string }) => {
        console.log('Received message:', data.message, 'for channel:', data.channel);

        if (!this.messages[data.channel]) {
          this.messages[data.channel] = [];
        }
        this.messages[data.channel].push(data.message);
      });
  }

  chat() {
    if (this.messagecontent && this.selectedChannel) {
      console.log('Sending message:', this.messagecontent, 'to channel:', this.selectedChannel);
      this.socketService.send({ message: this.messagecontent, channel: this.selectedChannel });

      if (!this.messages[this.selectedChannel]) {
        this.messages[this.selectedChannel] = [];
      }
      this.messages[this.selectedChannel].push(this.messagecontent);

      this.messagecontent = '';
    } else {
      console.log('No message or channel selected');
    }
  }

  onFileSelected(event: any) {
    this.selectedfile = event.target.files[0];
  }

 onUpload() {
  console.log('Selected File:', this.selectedfile);

  if (this.selectedfile) {
    if (this.selectedChannel !== null) {
      console.log('Selected Channel:', this.selectedChannel);

      const fd = new FormData();
      fd.append('image', this.selectedfile, this.selectedfile.name);

      this.imguploadService.imgupload(fd).subscribe({
        next: (res) => {
          const imagepath = res.data.filename;
          console.log('Sending image:', imagepath, 'to channel:', this.selectedChannel);
          this.socketService.sendImage({ image: imagepath, channel: this.selectedChannel });

          if (!this.messages[this.selectedChannel]) {
            this.messages[this.selectedChannel] = [];
          }

          // Wrap the image inside a container with fixed dimensions
          const imageElement = `
            <div class="image-container" style="width: 50px; height: 50px;">
              <img src="${'http://localhost:3000/images/' + imagepath}" alt="Uploaded Image" class="img-responsive" />
            </div>
          `;

          this.messages[this.selectedChannel].push(imageElement);

          this.messagecontent = 'Image Uploaded'; // Set a default message for the image
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
    } else {
      console.log('No channel selected');
    }
  } else {
    console.log('No image selected');
  }
}



  onGroupNameClick(event: Event, group: string): void {
    event.preventDefault();
    console.log('Group name clicked:', group);
    this.selectGroup(group);
    this.selectedGroupName = group;
  }

// Inside ChatComponent class

// Add a variable to track the current channel
currentChannel: string | null = null;

// selectChannel function
selectChannel(channel: string | null): void {
  if (channel !== null) {
    // Check if the user is switching from one channel to another
    if (this.currentChannel !== null) {
      const leaveMessage = `${this.username} has left the room`;
      this.socketService.send({ message: leaveMessage, channel: this.currentChannel });
    }

    this.currentChannel = channel; // Update the current channel
    console.log('Selected channel:', this.currentChannel);

    if (this.currentChannel && this.username) {
      const joinMessage = `${this.username} has joined the room`;
      this.socketService.send({ message: joinMessage, channel: this.currentChannel });
    }
  }
}

// leaveChannel function to leave the current channel
leaveChannel(): void {
  if (this.currentChannel && this.username) {
    const leaveMessage = `${this.username} has left the room`;
    this.socketService.send({ message: leaveMessage, channel: this.currentChannel });
    this.currentChannel = null; // Reset the current channel
  }
}

  selectGroup(group: string): void {
    const username = localStorage.getItem('username');
    if (!username) {
      console.error('Username not found in local storage');
      return;
    }
    console.log('Requesting channels for:', { group, username });

    this.http.post<string[]>(`${BACKEND_URL}/api/getChannels`, { group, username }, httpOptions)
      .subscribe({
        next: (channels) => {
          console.log('Received channels:', channels);

          if (channels && channels.length > 0) {
            this.channelsForSelectedGroup = channels;
          } else {
            console.warn('No valid channels received.');
          }
        },
        error: (error) => {
          console.error('Error fetching channels:', error);
          if (error.status === 403) {
            alert('You need to register for this group!');
          }
        }
      });
  }
}
