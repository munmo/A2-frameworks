# Assignment 2 - Software Frameworks

## Git update:

After each successful feature implementation, the local changes were pushed to the repository.
The document contains data structure (server & client), Angular and Node architecture, and routes explained.

## Data Structure:

All features from assignment 1 (json files) has been implemented using MongoDB.

### Server side:

#### 1. Users (user collection):

- \_id
- username
- email
- pwd
- roles
- group

#### 2. Groups (group collection) :

- \_id
- group
- channels

#### 3. Requests (pendingRequest collection) :

- \_id
- username:
- group:

### Client side:

#### 1. Chat component :

- groupNames: contains the names of all available groups.
- isAllowedToCreateGroup: determines if the current user is allowed to create a group.
- isModalOpen: tracks whether the create group modal is open.
- registeredGroups: contains the names of groups that the user is registered in.
- username: stores the username of the currently logged-in user.
- selectedGroup: stores the currently selected group.
- channelsForSelectedGroup: contains the channels available for the selected group.
- selectedChannel: stores the currently selected channel within a group.
- selectedGroupName: stores the name of the currently selected group.
- pendingInterests: contains information about the requesting user and the group they want to join.
- receivedImages: contains image paths or URLs for images received in the chat.
- ioConnection: manages the WebSocket connection.

#### 2. Login component :

- 'Userpwd' interface: username, email, password
- 'Userobj' interface: username, email, valid, roles, group

#### 3. Dashboard component (only super and group admin) :

- pendingInterests: stores pending interest data.
- confirmInterest: confirms pending interest and send the data to user details.

#### 4. Profile component (not implemented):

- onAvatarSelected(event: any): called when the user selects an avatar image using a file input. It captures the selected file.
- saveDetails: prepares the data to be sent to the server for updating the user's profile

- Angular Service: Angular service uses `HttpClient` to make API calls to the server to fetch and send data.
- HTTP Options: an `httpOptions` object sets headers for HTTP requests.

## Angular architecture:

Components deal with the functionality, and it interacts with a service to handle HTTP requests. There are also models that represent users, groups, login, registration, and pending interests and so on. Also, the routes define how users navigate between different parts of the chat web-app application. On the client side, local storage is employed as well as MongoDB to retain user-specific data, such as determining the user's role to enable particular functionalities. Moreover, in this part of the assignment, services are partially implemented appropriately, such as user data and socket. However, for image uploads and auth services, it could not be implemented successfully.

## Node architecture:

Separate modules and functions were used for distinct requirements.

- fs: Handle the file system, such as reading and writing files.
- path: Utilized to manage file paths.
- express: Web application framework that simplifies the process of building web applications and APIs in Node.js.
- cors: Enable CORS in Express applications.
- mongodb: Provides NoSQL database solution to connect, query, and manage data.
- socket: Enables real-time bidirectional communication between the server and clients.
- formidable: Simplifies the handling of file uploads and form data parsing.
- chai: Used with the Mocha testing framework to enable assertion testing in JavaScript.

## Routes:

### Login

| Aspect                    | Description                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Description               | This function validates user login by matching email and password.                                                               |
| Route                     | /api/login                                                                                                                       |
| Method                    | POST                                                                                                                             |
| Parameters                | req.body.email, req.body.password                                                                                                |
| Return value              | Success with user details or error message.                                                                                      |
| Technical Explanation     | The function reads users collection to find a matching email and password. It also sets the valid property to true for the user. |
| Client-Server interaction | Upon successful login, it returns validation status. The client updates its state and redirect the user to an account page.      |

### Register

| Aspect                    | Description                                                                                                                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description               | This function registers a new user.                                                                                                                                                                         |
| Route                     | /api/register                                                                                                                                                                                               |
| Method                    | POST                                                                                                                                                                                                        |
| Parameters                | req.body.email, req.body.email, req.body.password                                                                                                                                                           |
| Return value              | Success with user details or error message.                                                                                                                                                                 |
| Technical Explanation     | The function reads users collection and check whether the user is already registered with the entered username or email and adds a new user object to it. The valid field is set to false.                  |
| Client-Server interaction | Upon successful registration, the users collection is updated with the new user data. The client-side will update its state to show that registration was successful and redirect the user to a login page. |

### Get group names

| Aspect                    | Description                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| Description               | This function handles fetching all existing group names.                                        |
| Route                     | /api/getGroups                                                                                  |
| Method                    | GET                                                                                             |
| Parameters                | NA                                                                                              |
| Return value              | Success with group details.                                                                     |
| Technical Explanation     | Reads groups collection to find all existing group names.                                       |
| Client-Server interaction | Even unapproved users can view all of the existing groups but cannot access without permission. |

### Register interest in groups

| Aspect                    | Description                                                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Description               | This function records a user's interest in joining a specific group.                                                                                                                                   |
| Route                     | /api/registerInterest                                                                                                                                                                                  |
| Method                    | POST                                                                                                                                                                                                   |
| Parameters                | req.body.username, req.body.groupName                                                                                                                                                                  |
| Return value              | Success message                                                                                                                                                                                        |
| Technical Explanation     | The function adds a new interest object to it pendingRequest collection.                                                                                                                               |
| Client-Server interaction | Upon registration of interest, the server-side pendingRequest collection is updated. The Super or Group admin can view the updated collection from their dashboard and choose to give approval or not. |

### Confirm user interest and update group

| Aspect                    | Description                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description               | This function confirms a user's interest in joining a group, updates the user's groups, and removes the pending interest.                                                                          |
| Route                     | /api/confirmInterest                                                                                                                                                                               |
| Method                    | POST                                                                                                                                                                                               |
| Parameters                | req.body.username, req.body.groupName                                                                                                                                                              |
| Return value              | Success with user details or error message.                                                                                                                                                        |
| Technical Explanation     | The function first removes the user's pending interest in pendingRequest collection. Then, it finds the user in users collection and updates their group array to include the approved group name. |
| Client-Server interaction | Approved users can access the channels within the approved group.                                                                                                                                  |

| Aspect                    | Description                                                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description               | This function handles fetching all existing group names and allowing deletion.                                                                            |
| Route                     | /api/deleteGroups                                                                                                                                         |
| Method                    | POST                                                                                                                                                      |
| Parameters                |                                                                                                                                                           |
| Return value              | Success with group details.                                                                                                                               |
| Technical Explanation     | Reads groups collection to find all existing group names and remove the group from the groups collection according to the Super or Group admin's actions. |
| Client-Server interaction | Only approved/authorized users can view this page via Dashboard page.                                                                                     |

### Get channels

| Aspect                    | Description                                                                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Description               | Fetch channels for a selected group.                                                                                                                                           |
| Route                     | /api/getChannels                                                                                                                                                               |
| Method                    | POST                                                                                                                                                                           |
| Parameters                | group: string, username: string                                                                                                                                                |
| Return value              | Success with user details or error message.                                                                                                                                    |
| Technical Explanation     | From the groups collection, given the group and username, fetches the channels for that group if the user has permission.                                                      |
| Client-Server interaction | If the user is authorized to access the group, they will also be able to access the channels. If unauthorized, an error message is displayed and the channels will not appear. |
|                           |
