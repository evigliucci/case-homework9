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
        message: "Enter a project title",
        name: "title"
    },
    {
        type: "input",
        message: "Enter a description of your project.",
        name: "description"
    },
    {
        type: "input",
        message: "Explain how to install your project locally.",
        name: "installation"
    },
    {
        type: "input",
        message: "Explain how to use your project after they’ve installed it.",
        name: "usage"
    },
    {
        type: "input",
        message: "Explain your contribution preferences",
        name: "contributing"
    },
    {
        type: "input",
        message: "Enter command to run tests",
        name: "tests",
        default: 'No tests are setup',
    },
    {
        type: "list",
        message: "Select your license",
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