Hello Everyone. I want to present you my project that I worked on. More precisely, it is a Notes application.
The app is full-stack which means it consists of front-end and back-end parts.

Frontend part I worked in using React.js and backend in Node.js using Express.js framework and MySQL as a database.

To install this application on your computer, you must first have MySQL Workbench ready on your computer, and you need to create a notes database and import the `notes_db.sql` file.

After that we need to clone this repository, and when you have finished it you need to navigate to the 'frontend' directory and run the `npm install` command to install all the third-party libraries necessary for the functionality of this application.
Then you need to switch to the backend directory and run the same command via the terminal: `npm install`.

With these steps, we have installed everything that is needed for our application to work. Now we need to modify the `db.js` located in the `backend` directory and there we need to modify the data from the database that we previously imported. These parameters depend on your MySQL configuration.

After that, we are ready to launch our application.
Since we are already in the `backend` directory in the terminal (if you are not, navigate to it) and type the command `node index.js`.
After that you should get the message: "Serve at http: // localhost: 5000". This means that our backend server has started successfully.

What is left is to navigate through the terminal to the "frontend" directory and then type the command `npm start`.

After that, your application should successfully open in the browser tab.
