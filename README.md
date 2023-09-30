# Assignment 2 - Software Frameworks

## Git update:

After each successful code implementation, the local changes were pushed to the repository.

## Branching:

Because the project was relatively small in scope, only a single branch was utilized.

## Data Structure:

### Server side:

- Users : The `users.json` file serves as the database for user's login and registration. Each user object have the following fields:

username, email, pwd, roles, group, valid

- Pending interest : The `pendingInterest.json` file stores the pending interests from the users who wish to join certain groups.

username, groupName

- Groups : The `groups.json` file serves as the database for group and its corresponding channels.

groupName, channels

### Client side:

- Pending Interests: An array of pending interests is used with fields similar to what's on the server side:

username, groupName

- Angular Service: Angular service uses `HttpClient` to make API calls to the server to fetch and send data.

- HTTP Options: an `httpOptions` object sets headers for HTTP requests.

- Event Handlers: `registerInterest` and `confirmInterest` to handle user interactions, that read from or write to the server-side data.

## Angular architecture:

Components deal with the functionality, and it interacts with a service to handle HTTP requests. There are also models that represent users, groups, login, registration, and pending interests and so on. Also, the routes define how users navigate between different parts of the chat web-app application. On the client side, local storage is employed to retain user-specific data, such as determining the user's role to enable particular functionalities. In this part of the assignment, the data was stored locally which can be quickly referenced or sent in subsequent server requests, however, services were not used.

## Node architecture:

Separate modules and functions were used for distinct requirements. For example, a module in `registerInterest.js` file handles the functionality related to registering a user's interest in joining a certain group.

Functions within this module, such as writing to the `pendingInterest.json` file, are called when a user sends specific HTTP requests from the client side.

Global variables like `BACKEND_URL` are used to store information. For example, the chat component on the client side, `chat.component.ts`, interacts with this architecture by making HTTP requests, such as fetching a username and posting new interests to join a group. To communicate with the server's endpoints, Angular's HttpClient is used.

## Routes:

### Login

| Aspect                    | Description                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description               | This function validates user login by matching email and password.                                                                                                        |
| Route                     | /api/auth/login                                                                                                                                                           |
| Method                    | POST                                                                                                                                                                      |
| Parameters                | req.body.email, req.body.password                                                                                                                                         |
| Return value              | {"ok": true, "userData": {[i]}}                                                                                                                                           |
| Technical Explanation     | The function reads users.json to find a matching email and password. It also sets the valid property to true for the user.                                                |
| Client-Server interaction | Upon successful login, the server-side users.json remains unchanged but returns validation status. The client updates its state and redirect the user to an account page. |

### Register

| Aspect                    | Description                                                                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description               | This function registers a new user.                                                                                                                                                                               |
| Route                     | /api/auth/register                                                                                                                                                                                                |
| Method                    | POST                                                                                                                                                                                                              |
| Parameters                | req.body.email, req.body.email, req.body.password                                                                                                                                                                 |
| Return value              | {ok: true, message:'User registered successfully'}                                                                                                                                                                |
| Technical Explanation     | The function reads users.json and adds a new user object to it. The valid field is set to false.                                                                                                                  |
| Client-Server interaction | Upon successful registration, the server-side users.json is updated with the new user data. The client-side will update its state to show that registration was successful and redirect the user to a login page. |

### Get group names

| Aspect                    | Description                                                                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description               | This function handles fetching all existing group names.                                                                                                                           |
| Route                     | /api/auth/getGroups                                                                                                                                                                |
| Method                    | GET                                                                                                                                                                                |
| Parameters                | NA                                                                                                                                                                                 |
| Return value              | ["groupName1","groupName2"...]                                                                                                                                                     |
| Technical Explanation     | Reads groups.json to find all existing group names and returns them in an array.                                                                                                   |
| Client-Server interaction | The server-side groups.json remains unchanged but returns the array of group names on client-side. The approved client can only update json file and its display by adding groups. |

### Register interest in groups

| Aspect                    | Description                                                                                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description               | This function records a user's interest in joining a specific group.                                                                                                                         |
| Route                     | /api/auth/registerInterest                                                                                                                                                                   |
| Method                    | POST                                                                                                                                                                                         |
| Parameters                | req.body.username, req.body.groupName                                                                                                                                                        |
| Return value              | {message: "Interest registered"}                                                                                                                                                             |
| Technical Explanation     | The function reads pendingInterest.json and adds a new interest object to it.                                                                                                                |
| Client-Server interaction | Upon registration of interest, the server-side pendingInterest.json file is updated. The client will have pending request groups in the account page until approved by super or group admin. |

### Confirm user interest and update group

| Aspect                    | Description                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Description               | This function confirms a user's interest in joining a group, updates the user's groups, and removes the pending interest.                                                                  |
| Route                     | /api/auth/confirmInterest                                                                                                                                                                  |
| Method                    | POST                                                                                                                                                                                       |
| Parameters                | req.body.username, req.body.groupName                                                                                                                                                      |
| Return value              | {message: "Interest confirmed and user updated"}                                                                                                                                           |
| Technical Explanation     | The function first removes the user's pending interest in pendingInterest.json. Then, it finds the user in users.json and updates their group array to include the new group.              |
| Client-Server interaction | On the server-side, both users.json and pendingInterest.json are updated. On the client-side, a confirmation message will be displayed and updates the account page with registered group. |

### Get channels

| Aspect                    | Description                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description               | Fetch channels for a selected group.                                                                                                                              |
| Route                     | /api/auth/getChannels                                                                                                                                             |
| Method                    | POST                                                                                                                                                              |
| Parameters                | groupName: string, username: string                                                                                                                               |
| Return value              | return group.channels or 403 status code depending on the registration.                                                                                           |
| Technical Explanation     | From the groups.json, given the groupName and username, fetches the channels for that group if the user has permission.                                           |
| Client-Server interaction | On the server-side, the list of channels for the selected group will be updated. If unauthorized, an error message is displayed and the channels will not appear. |

### Check access

| Aspect                    | Description                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| Description               | Determines if a user has access to a specified group.                                                  |
| Route                     | /api/auth/getChannels                                                                                  |
| Method                    | POST                                                                                                   |
| Parameters                | groupName: string, username: string                                                                    |
| Return value              | bool:true or false                                                                                     |
| Technical Explanation     | Determines whether a user has access to the given group based on their roles as well as permitted user |
| Client-Server interaction | NA                                                                                                     |
