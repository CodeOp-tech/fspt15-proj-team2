# Team 2: Podcast App

### Back End (localhost: 5001)
- **Express** 
- **Node** 
- **MySQL**

**Getting started:**
- Run `npm install` to install the dependencies in the project folder
- To start the server, run `npm start`


### Front End
- **React** 
- **Vite**

**Getting started:**
- Open a separate Terminal to start the front end
- Go into the client directory by entering `cd client` into the Terminal
- Install the dependencies with `npm install`
- Run `npm run dev` to see the website

### Database Prep

Create `.env` file in server directory and add

```
DB_HOST=localhost
DB_USER=root
DB_PASS=TYPE YOUR PASSWORD
DB_NAME=podcast
SUPER_SECRET=YOUR SECRET KEY
```

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `CREATE DATABASE podcast;` to create a database in MySQL.

Run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';` (replace `YOUR_PASSWORD` with your actual password)

Open another terminal and go into the project folder and run `npm run migrate`. This will create the tables needed for this project since this has been configured in the package.json of the server.

### Dependencies

In addition to nodemon and the regular stuff, our project also includes [node-fetch](https://www.npmjs.com/package/node-fetch) so we can do fetches in the backend and [react-router-dom](https://reactrouter.com/en/main) so we can use react-router for pages.

### Links
[Project Presentation Slides](https://docs.google.com/presentation/d/1gnEdT3RED8NwjqLBgb56dx9DoSKqEKYiipeo1NttxLM/edit#slide=id.p)


### Notes
_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._