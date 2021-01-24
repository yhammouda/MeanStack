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

## The Book - Microservices Architecture and Step by Step Implementation on .NET

You can find **Microservices Architecture and Step by Step Implementation on .NET book** which **step by step developing** this repository with extensive explanations and details. This book is the **best path to leverage your .NET skills** in every aspect from beginner to senior level you can benefit to ramp-up faster on **Enterprise Application Development practices** and easy to **Onboarding to Full Stack .Net Core Developer jobs**. 

The book also includes more practical information and I **update it regularly** and send it again with new versions.
So the idea is once you buy a book, I take this as **supporting me** and **join them in my privilege group** for sharing **next outputs**.
For example I am planning to add **IdentityServer4 implementation**, firstly I added it into a book and sent it to you.

**[Download Microservices Architecture and Step by Step Implementation on .NET Book](https://aspnetrun.azurewebsites.net/Microservices)**

![aspnetrun_microservices3](https://user-images.githubusercontent.com/1147445/81383140-31dc8680-9118-11ea-992a-3ad8abc62314.png)

**[Download Microservices Architecture and Step by Step Implementation on .NET Book](https://aspnetrun.azurewebsites.net/Microservices)**

## Upcomming Features

* Authentication with **IdentityServer4**
* Service Discovery with **Eureka**
* Resilient HTTP Clients with **Polly**
* Central Logging with **Kibana**
* Monitoring Health Checks **AspNetHealthCheck**

# What is AspnetRun ? 
The best path to **leverage your ASP.NET Core** skills. Onboarding to **Full Stack .Net Core Developer** jobs. Boilerplate for **ASP.NET Core reference application** with **Entity Framework Core**, demonstrating a layered application architecture with DDD best practices. Implements NLayer **Hexagonal architecture** (Core, Application, Infrastructure and Presentation Layers) and **Domain Driven Design** (Entities, Repositories, Domain/Application Services, DTO's...) 
and aimed to be a **Clean Architecture**, with applying **SOLID principles** in order to use for a project template. 
Also implements **best practices** like **loosely-coupled, dependency-inverted** architecture and using **design patterns** such as **Dependency Injection**, logging, validation, exception handling, localization and so on.

You can check full repository documentations and step by step development of **[100+ page e-book PDF](https://aspnetrun.azurewebsites.net)** from here - **https://aspnetrun.azurewebsites.net**. Also detail introduction of book and project structure exists on **[medium aspnetrun page](https://medium.com/aspnetrun)**. You can follow **aspnetrun repositories** for building **step by step** asp.net core **web development skills**.

# AspnetRun Repositories
Here you can find all of the **aspnetrun repositories from easy to difficult**, Also this list can be track a **learning path** of asp.net core respectively;
* **[run-aspnetcore-basics](https://github.com/aspnetrun/run-aspnetcore-basics)** - Building fastest ASP.NET Core Default Web Application template. This solution **only one solution one project** for **idea generation** with Asp.Net Core. 
* **[run-aspnetcore](https://github.com/aspnetrun/run-aspnetcore)** - Building ASP.NET Core Web Application with Entity Framework.Core and apply **Clean Architecture** with DDD best practices.
* **[run-aspnetcore-cqrs](https://github.com/aspnetrun/run-aspnetcore-cqrs)** - Building Single-Page Web Applications(SPA) using ASP.NET Core & EF.Core, Web API Project and implement **CQRS Design Pattern**.
* **[run-aspnetcore-microservices](https://github.com/aspnetrun/run-aspnetcore-microservices)** - Building **Microservices** on .Net platforms which used **Asp.Net Web API, Docker, RabbitMQ, Ocelot API Gateway, MongoDB, Redis, SqlServer, Entity Framework Core, CQRS and Clean Architecture** implementation.

## Give a Star! :star:
If you liked the project or if AspnetRun helped you, please **give a star**. And also please **fork** this repository and send us **pull-requests**. If you find any problem please open **issue**.

## Disclaimer

* This repository is not intended to be a definitive solution.
* This repository not implemented a lot of 3rd party packages, we are try to avoid the over engineering when building on best practices.
* Beware to use in production way.

## Contributing

Please read [Contributing.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.
We have a lot of **missing features** you can check [here from our project page](https://github.com/aspnetrun/run-aspnetcore-realworld/projects/1) and you can develop them. We are waiting for your pull requests.

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
