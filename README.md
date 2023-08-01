# FitLit Starter Kit

## Abstract
FitLit revolutionizes the way you track your wellness journey! Behold the ultimate visual activity tracker, where style and sophistication meet data logging. With a captivating interface and seamless user experience, this remarkable app empowers you on your path to unparalleled health and vitality. Brace yourself for a mind-blowing summary of your activities, hydration, and sleep data that sparks inspiration and fuels your desire for a healthier, happier you. Here at FitLit, every step is a step in the right direction.

## Server Setup
- Fork [this](https://github.com/turingschool-examples/fitlit-starter-kit.git) repository. 
- Clone it to your local machine using the command: `git clone git@github.com:turingschool-examples/fitlit-starter-kit.git`.
- Run the command: `cd fitlit-api`
- Run the command: `npm install`
- Run the command: `npm start`


## Client App Setup
- Clone it to your local machine using the command: `git clone git@github.com:apete12/fitlit.git`
- Run the command: `cd fitlit`
- Run the command: `npm install`
- Run the command: `npm start`

## Preview of App
![](https://media.giphy.com/media/jDkpjC6KrIeqh4Mpxi/giphy.gif)

## Context
We completed this project from week 2 to week 4 in Mod 2 of the Front End development program at Turing School of Software & Design. We are a 4 group of front-end developers who worked together remotely via zoom to complete this application. Approximately 80 hours was spent on this project between team members. 

We used HTML, CSS and JavaScript written in the code editor VS Code with Webpack installed. GitHub was used to store, manage, and collaborate on code so that we could all work on our local machines. We also utilized a shared GitHub project board to keep track of issues.

We wrote our HTML with the smallest skeleton possible. CSS rules are written in order of the HTML skeleton. JavaScript functions were split into different files for easy readability. Testing was implemented with the Mocha framework and Chai library. 

## Contributors
- [Scotty Brown](https://github.com/Scotty-Brown) - 2305 FE Mod 2 student at Turing School for Software and Design
- [Prissilla Escobar](https://github.com/prissilla-escobar) - 2305 FE Mod 2 student at Turing School for Software and Design
- [Alexandra Peterson](https://github.com/apete12) - 2305 FE Mod 2 student at Turing School for Software and Design
- [Adrian Zabolitzki](https://github.com/ganuza) - 2305 FE Mod 2 student at Turing School for Software and Design

## Learning Goals
- Understand the use of Webpack
- Implement fetch API for accessing the data
- Write tests for data model functions
- Create a project that is easily readable with separate files that store functions for DOM manipulation, data model, helper, api calls and scripts

## Wins + Challenges
- A challenge that we encountered immediately upon starting the project was navigating where to put each different type of code, specifically in terms of importing/exporting variables and functions. This project ended with about 13 files across 3 different directories, and learning how to import/export data from each file was a challenge. We also had difficulty with separating all DOM functions and variables from our data model functions, which consistently produced a document error in the terminal. After research and seeking out mentor support, we learned how and why DOM and data model functions should exist across different files to avoid errors. 
- A challenge we encountered was utilizing promises and fetch calls in order to make network requests and manipulate data. We aimed to incorporate DRY JS that followed SRP, and navigating these principles was a challenge for 4 fetch requests. We overcame this challenge by researching promise.all() and seeking support from mentors. Ultimately, we implemented these concepts effectively, efficiently, and with understanding of the functionality. 
- We used webpack for the first time to bundle ESM and common JS which helped us understand the necessity and functionality.

## Future Features
- User login added
- User will see if their step count, hydration consumption, activity or sleep is below average
- User can choose a different color gradient for the app
- User will be able to input and store log entries

## Resources
Josh Comeau's custom [CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/) is being used to ensure that the app is more clean and will lead to a better user experience.     
