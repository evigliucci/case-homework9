function generateProjectUrl(github, title) {
    const kebabCaseTitle = title.toLowerCase().split(" ").join("-");
    return `https://github.com/${github}/${kebabCaseTitle}`;
}

function renderLicenseBadge(license, github, title) {
    if (license !== "None") {
        return `[![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)](${generateProjectUrl(github, title)})`
    }
    return ''
}

function renderLicenseSection(license) {
    if (license !== "None") {
        return (
            `This project is licensed under the ${license} license.`
        )
    }
    return ''
}

// Development will happen in generate markdown
function generateMarkdown(response, data) {
    return `
# ${response.title}:  

## Table of Contents
[Badges](#Badges)  
[Title](#Project-Title)  
[Description](#Description)  
[Installation](#Installation)  
[Usage](#Usage)  
[Contributions](#Contributions)  
[Tests](#Tests)  
[License](#License)  

## Badges:
${renderLicenseBadge(response.license, response.username, response.title)}

## Description:
${response.description}  

## Installation:
${response.installation}  

## Usage
${response.installation}  

## Contributing to this Project
${response.installation}  

## Tests
${response.tests}  

## License:
${renderLicenseSection(response.license)}  

## Developer Info:
Github User Name: ${response.username}  
Github Email: ${response.email}  
![Profile Image](${data.data.avatar_url})

`;
}

module.exports = generateMarkdown;