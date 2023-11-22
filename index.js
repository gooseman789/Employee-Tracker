const inquirer = require ('inquirer')
const mysql = require('mysql2')


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
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
                viewEmployees()
            } else if (data == 'Update Employee Role') {
                updateRole()
            } else if (data == 'View All Roles') {
                viewRoles()
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

    function viewEmployees () {
        const sql = `SELECT CONCAT(first_name, ' ', last_name) from employee`;
      
      db.query(sql, (err, result) => {
        console.table(result)
        startMenu()
      });
    }
    function viewRoles () {
        const sql = `SELECT title from role`;
      
      db.query(sql, (err, result) => {
        console.table(result)
        startMenu()
      });
    }

    function updateRole() {
        const role = []
        const employees = []

        const roleQuery = `SELECT * from role`;
         db.query(roleQuery, (err, roleresult) => {
         for (let i =0; i < roleresult.length; i++) {
            role.push({
                    name: roleresult[i].title,
                    value: roleresult[i].id
                })
         }
            const employeeQuery = `SELECT * from employee`;
            db.query(employeeQuery, (err, employeeresult) => {
            for (let i =0; i < employeeresult.length; i++) {
                employees.push(
                    {
                        name: employeeresult[i].first_name + ' ' + employeeresult[i].last_name,
                        value: employeeresult[i].id
                    }
                )
            }
            inquirer
            .prompt([
                {
                type: 'list',
                name: 'title',
                message: 'What Department would you like to add?',
                choices: role
                },
                {
                    type: 'list',
                    name: 'employeeName',
                    message: 'Which employee would you like to add that role to?',
                    choices: employees
                }
        ])
                .then((data) => {
                    // console.log(data)
                    const roleAdded = data.title
                    const employeeUpdate = data.employeeName
                    // console.log(roleAdded)
                    // console.log(employeeUpdate)
                    const updateQuery = 'UPDATE employee SET role_id = ? WHERE id = ?'
                    const updateParams = [roleAdded, employeeUpdate]
                    db.query(updateQuery, updateParams, (updateErr, updateResults) => {
                        if (updateErr) {
                            console.error('Error updating role:', updateErr);
                        } else {
                            console.log('Updated Successfully')
                            startMenu()
                        }
                    })
                })
            }
        )}
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
                startMenu()
              });
            })
        }

        function addRole() {
            console.log("check1")
            const addRoleQuery = `SELECT * from department`;
            const addRoles = []
            db.query(addRoleQuery, (err, addroleresult) => {
                for (let i =0; i < addroleresult.length; i++) {
                    addRoles.push({
                            name: addroleresult[i].department_name,
                            value: addroleresult[i].id
                        })}
            inquirer
            .prompt([
                {
                type: 'input',
                name: 'title',
                message: 'What role would you like to add?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for this role? (Must insert an INTEGER)'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department does this fall under?',
                    choices: addRoles
                }
            ])
                .then((data) => {
                    // console.log(addRoles)
                    const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?, ?, ?)`;
                  const params = [data.title, data.salary, data.department];
                  
                  db.query(sql, params, (err, result) => {
                    if (err) {
                        console.error('Error inserting role:', err);
                    } else {
                    console.log('Thank you for adding this role!')
                    startMenu()
                    }
                  });
                })
            });
            }

    function viewDepartments () {
        const sql = `SELECT department_name from department`;
      
      db.query(sql, (err, result) => {
        console.table(result)
        startMenu()
      });
    }

    startMenu()