const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

const questions = [{
        type: "input",
        message: "Enter your GitHub username:",
        name: "username"
    }, {
        type: "input",
        message: "Enter your Github Email",
        name: "email"
    },
    {
        type: "input",
        message: "Your project’s title is the first thing people will see upon scrolling down to your README. - What is your project's title?",
        name: "title"
    },
    {
        type: "input",
        message: "A good description is clear, short, and to the point. Describe the importance of your project, and what it does. - Enter a description of your project.",
        name: "description"
    },
    {
        type: "input",
        message: "Explain how to install your project locally.",
        name: "installation"
    },
    {
        type: "input",
        message: "Instruct other people on how to use your project after they’ve installed it. This would also be a good place to include screenshots of your project in action.",
        name: "usage"
    },
    {
        type: "input",
        message: "If you have specific contribution preferences, explain them so that other developers know how to best contribute to your work.",
        name: "contributing"
    },
    {
        type: "input",
        message: "Enter Command to run tests",
        name: "tests"
    },
    {
        type: "list",
        message: "License",
        name: "license",
        choices: ['MIT', 'Apache', 'GPL', 'None']
    },
];

function writeToFile(data) {
    fs.writeFile("README.md", data, function(err) {
        if (err) {
            throw err;
        }
    });
}

function init() {
    inquirer.prompt(questions)
        .then(function(response) {
            api.getUser(response.username)
                .then(function(data) {
                    writeToFile(generateMarkdown(response, data))
                });
        });
}

init();