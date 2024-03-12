# Node js, Typescript, and Sequelize Started Template

- This is a Node js starter template using TypeScript and Sequelize.js for Object Relational Mapping (ORM).

## Getting started

- The project follows the MVC pattern, and a very comprehensive, maintainable and scaleable structure has been setup.
- It already has an authentication system with JWT token based authorization.
- User Roles and Permissions functionality is already implemented.
- A logging middleware is included to log all requests made on the server to the databse.
- Routes, Controllers, Services, and Resources have already been created to help mange the Users, Roles, Permissions, and Logs.
- There are also several helper functions included in the utils folder to help you.

  > I made this to help me and anybody who wants to start a project using Node.js, typescript, and mySQL using Sequelize as an ORM. If you notice any issues in the code, folder structure, or want to contribute to the improvement of the project please feel free to offer your help, Thank you!

- You can easily setup and run the project using the following steps:

## Clone and Run Project

- Clone the project

```bash
git clone git@github.com:DOJ-gam/node-typescript-sequelize-starter-template.git
```

- Run the the command below to install npm dependencies

```bash
npm install
```

- To run in development mode run the command below:

```bash
npm run dev
```

- To build the app run the command below:

```bash
npm run build
```

- To run the already built program, run the command below:

```bash
npm run start
```

## Database Setup

- You need to have mySql already installed in your system,
- Create a database for your project
- create a **.env** file on root directory of the project.
- There is a file called **.env.sample**, you can copy it's content, paste it in the **.env** file and replace the information with your correct database informations.
- There is also additional env variables for the jwt configurations, you can ignore that or change it too if you want
  > Note : To create the tables in you database, I am currently using a trick, in the **models > associations.ts** file, uncomment the function call **createTables()** to sync the database tables, it might break the first time you save it, but just save it again and the problem should be solved.

> **I do not have a solution to sync the models yet, hence why I am doing it in the associations file, if you have a solution to the problem, please feel free to share it.**
