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
As all application you should **Signup** then **SignIn**.

## Create Mission:
![mainscreen2](https://github.com/yhammouda/MeanStack/blob/main/addnewmission.PNG)

## Add Transaction to the mission
![mainscreen2](https://github.com/yhammouda/MeanStack/blob/main/addtransaction.PNG)

## List all missions
![mainscreen2](https://github.com/yhammouda/MeanStack/blob/main/listmissions.PNG)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/aspnetrun/run-core/tags). 

## Next Releases and RoapMap

For information on upcoming features and fixes, take a look at the [product roadmap](https://github.com/aspnetrun/run-aspnetcore/projects).

## Deployment - AspnetRun Online

This organization page is deployed on Azure. See the project running on Azure in [here](https://aspnetrun.azurewebsites.net/).

## Pull-Request

Please fork this repository, and send me your findings with pull-requests. This is open-source repository so open to contributions.
Get your item from **missing features** [here from our project page](https://github.com/aspnetrun/run-aspnetcore-realworld/projects/1) and send us your pull requests.

## Authors

* **Mehmet Ozkaya** - *Initial work* - [mehmetozkaya](https://github.com/mehmetozkaya)

See also the list of [contributors](https://github.com/aspnetrun/run-core/contributors) who participated in this project. Check also [gihtub page of repository.](https://aspnetrun.github.io/run-aspnetcore-angular-realworld/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
