const inquirer = require ('inquirer')
const server = require('mysql2')
const sequelize = require('./connection')


sequelize.connect((err) => {
    if (err) {
        console.err("Error connecting to database:", err);
        return
    }
    console.log("Connected to the database");
    startMenu()
})

function startMenu () {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'StartMenu',
                message: "What would you like to do?",
                choices: ['View All Employees', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    ])
        .then((data) => {
            if (data == 'View All Employees') {

            } else if (data == 'Update Employee Role') {

            } else if (data == 'View All Roles') {

            } else if (data == 'Add Role') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: "What Role would you like to add?"
                        }
                    ])
                    .then((data) => {

                    })
            } else if (data == 'View All Departments') {

            } else {
                inquirer
                    .prompt([
                        {
                        type: 'input',
                        message: 'What Department would you like to add?'
                        }
                    ])
                        .then((data) => {

                        })
            }

            
        }
        )
    }