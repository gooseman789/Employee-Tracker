const inquirer = require ('inquirer')
// const db = require('./connection')
const mysql = require('mysql2')

// db.connect((err) => {
//     if (err) {
//         console.err("Error connecting to database:", err);
//         return
//     }
//     console.log("Connected to the database");
// })

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'MooseMoose1!',
      database: 'employeetracker_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

function startMenu () {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'startMenu',
                message: "What would you like to do?",
                choices: ['View All Employees', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    ])
        .then((userdata) => {
            const data = userdata.startMenu
            console.log(data)
            if (data == 'View All Employees') {

            } else if (data == 'Update Employee Role') {

            } else if (data == 'View All Roles') {

            } else if (data == 'Add Role') {
                addRole()
            } else if (data == 'View All Departments') {
                viewDepartments()
            } else {
                addDepartments()
            }

            
        }
        )
    }

    function addRole() {
        const sql = `SELECT * from department`;
         db.query(sql, (err, result) => {
         const department = []
         for (let i =0; i < result.length; i++) {
            department.push(
                {
                    name: result[i].department_name,
                    value: result[i].id
                }
            )
         }
         console.log(department)
        inquirer
        .prompt([
            {
            type: 'list',
            name: 'departmentName',
            message: 'What Department would you like to add?',
            choices: department

            }])
            .then((data) => {
                console.log(data)
                console.log('add role', data.departmentName.name)
            })
         }
    )}


    function addDepartments() {
        inquirer
        .prompt([
            {
            type: 'input',
            name: 'name',
            message: 'What Department would you like to add?'
            }
        ])
            .then((data) => {
                const sql = `INSERT INTO department (department_name)
                VALUES (?)`;
              const params = [data.name];
              
              db.query(sql, params, (err, result) => {
                console.log(result)
              });
            })
        }

    function viewDepartments () {
        const sql = `SELECT department_name from department`;
      
      db.query(sql, (err, result) => {
        console.table(result)
      });
    }

    startMenu()