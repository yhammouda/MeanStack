## Whats Including In This Repository
We have implemented below **MEAN stack application that create missions and transactions with CRUD functions**.


See the overall picture of **implementations a mean stack applications** on real-world project;

![MEAN stack Architecture](https://github.com/yhammouda/MeanStack/blob/main/mean-stack-flow.png)

The MEAN stack is a full-stack, JavaScript-based framework for developing web applications. MEAN stands for MongoDB Express Angular Node, after the four key technologies that make up the different layers of the stack. 

## Run The Project
You will need the following tools:

* [Visual Studio Code](https://code.visualstudio.com/download/)
* [Node js 10.19.0 or later](https://nodejs.org/en/download/)
* [Angular CLI 11.0.6](https://cli.angular.io/)
* [Docker](https://docs.docker.com/get-docker/)

### Installing
Follow these steps to get your development environment set up: (Before Run Start the Docker Desktop)
1. Clone the repository
2. At the root directory which include **docker-compose.yml** files, run below command to create a mongo DB instance :
```csharp
sudo docker-compose up -d
```
3. Wait for docker compose all. That’s it!

4. At the Mean-App directory which include **package.json** file, run below command to download the dependency(node modules) / run the backend application on port 3000 /run the angular app on port 4200 / :
* **npm install -> install all dependencies**
* **npm run start:server -> http://localhost:3000/**
* **ng serve -> http://localhost:4200/**

5. You can **launch the application** as below url:
* **Backend Application -> http://localhost:3000/**
* **Web UI -> http://localhost:4200/**

6. Launch http://localhost:4200/ in your browser to view the Web UI.

![mainscreen2](https://github.com/yhammouda/MeanStack/blob/main/login.PNG)

# How the application work ? 
As all application you should **SignUp** then **SignIn**.

## Create Mission:
![mainscreen2](https://github.com/yhammouda/MeanStack/blob/main/addnewmission.PNG)

## Add Transaction to the mission
![mainscreen2](https://github.com/yhammouda/MeanStack/blob/main/addtransaction.PNG)

## List all missions
![mainscreen2](https://github.com/yhammouda/MeanStack/blob/main/listmissions.PNG)

## Next step you can update delete mission or transaction, and you can use the pagination to dividing the potential result into pages and retrieving the required pages, one by one on demand

## Authors

* **Youssef Hammoud** - *Initial work* - [yhammouda](https://github.com/yhammouda/MeanStack/)
