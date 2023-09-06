# Assignment 1 - Software Frameworks

## Git update:
After each successful code implementation, the local changes were pushed to the repository.

## Branching:
Because the project was relatively small in scope, only a single branch was utilized.

## Data Structure:
### Server side:

* Users : The `users.json` file serves as the database for user's login and registration. Each user object have the following fields:

username, email, pwd, roles, group, valid

* Pending interest : The `pendingInterest.json` file stores the pending interests from the users who wish to join certain groups. 

username, groupName

* Groups : The `groups.json` file serves as the database for group and its corresponding channels.

groupName, channels

### Client side:

* Pending Interests: An array of pending interests is used with fields similar to what's on the server side:

username, groupName

* Angular Service: Angular service uses `HttpClient` to make API calls to the server to fetch and send data.

* HTTP Options: an `httpOptions` object sets headers for HTTP requests.

* Event Handlers: `registerInterest` and `confirmInterest` to handle user interactions, that read from or write to the server-side data.

## Angular architecture:

Components deal with the functionality, and it interacts with a service to handle HTTP requests. There are also models that represent users, groups, login, registration, and pending interests and so on. And finally, the routes define how users navigate between different parts of the chat web-app application. Local storage is utilized on the client side to store user-specific information e.g. fetching user's role to allow certain features. The data stored locally can be quickly referenced or sent in subsequent server requests.

Services were not used in this part of the project. 

## Node architecture:

The use of separate modules and functions for distinct tasks were used. For example, a module `registerInterest.js file` handles the functionality related to registering a user's interest in joining a certain group. 

Functions within this module, such as writing to the `pendingInterest.json` file, are called when a user sends specific HTTP requests from the client side. 

Global variables like `BACKEND_URL` are used to store information that is accessed throughout the application. For example, the chat component on the client side, `chat.component.ts`, interacts with this architecture by making HTTP requests, such as fetching a username and posting new interests to join a group. It does this by using Angular's HttpClient to communicate with the server's endpoints.

## Routes:
--------------------------|----------------------------------------------------------------------------------|
Description | This function validates user login by matching email and password.
Route | /api/auth/login
Method | POST
Parameters | req.body.email, req.body.password
Return value | JSON object that indicates whether login is successful and includes user data if it is.
Technical Explanation | The function reads users.json to find a matching email and password. It also sets the valid property to true for the user.
Client-Server interaction | Upon successful login, the server-side users.json remains unchanged but returns validation status. The client updates its state and redirect the user to an account page.