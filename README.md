# Encrypted timeseries assignment

In this application, one can see the data-stream over socket.io. The emitter service generate periodic data stream of encrypted messages of the data from data.json file. On receipt of the encrypted message stream, the listener service will decrypt this string and retrieve the data in the payload, validate the objects using the secret_key to ensure data integrity. After successfully verifying, the data will be stored in a database and will be displayed on the frontend.

## Technologies Used

1. NodeJS
2. Express
3. MongoDB
4. Git

## Installation

Step-by-step process for installation:

1. First clone the repository using the command

```
git clone https://github.com/Argha-Majumder/encrypted-timeseries-assignment.git
```

2. The go to the directory where this file is located and install the required package using

```
npm install
```

3. Now start the server by opening a terminal and use this command

```
npm start
```

4. Then open any web browser and type 
https://localhost:8000

## Folder Structure

Encrypted-timeseries
    
    |
    |----assets
    |       |-----css
    |       |-----js
    |
    |----config
    |       |-----chat_sockets.js
    |       |-----mongoose.js
    |
    |----controllers
    |       |-----home_controller.js
    |
    |----models
    |       |-----hashValues.js
    |       |-----timeSeries.js
    |
    |----routes
    |       |-----index.js
    |
    |----views
    |       |-----home.ejs
    |
    |-----.gitignore
    |
    |-----index.js
    |
    |-----package-lock.json
    |
    |-----package.json
    |
    |-----README.md