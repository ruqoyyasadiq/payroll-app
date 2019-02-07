Project Dependencies:
- Node v 10.x+ LTS
- NPM 6.5.0
- Postgres - 6.2.0
- React 16.0.0
- Sequelize and sequelize CLI (installed globally)


# Setting Up
## A. Structure/Project Setup
- Unbundle the repo and cd into the folder:
```
git bundle verify {bundle_name}.bundle && git clone {bundle_name}.bundle && cd $_
```

- Rename `env.sample` as `.env` and set the contained values appropriate.

> Note: `PORT` in `.env` refers to the port on which the server is running. If you choose to run on a port other than `5000`, remember to change the `proxy` field in `client/package.json` to reflect this new port value.
```
"proxy": "http://localhost:{NEW_PORT_VALUE_AS_SPECIFIED_IN_ENV_VAR}/"
```
The proxy field allows the client to send API requests to the API server since the API server is running on `http://localhost:5000` for example.


## B. DB & App Setup
Ensure to have postgres [setup and running](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/) on your machine Then follow the steps below:
- Create database locally using `psql` shell or directly through your terminal

- Export `DATABASE_URL` in your terminal in the form of
```
export DATABASE_URL=postgres://[user[:password]@][host][:port][/dbname]
```

- Run migrations with the command:
```
npm run db:migrate
```

- Start application with:
```
npm run dev
```
The above command uses [`concurrently`](https://www.npmjs.com/package/concurrently) to start both the server and client side _concurrently_

- Access the client via:
```
http://localhost:3000/
```
Requests to the server are proxied through `http://localhost:5000/` as specified in the `client/package.json`


# To uplaod a new report:
- If it is first ever report:
    - click the button below the No Record icon
    - or click the big blue circular button with the `+` icon in it to get started
- To upload additional reports to what exists before, simply click the big blue circular button with the `+` icon in it to launch report upload modal

# Running Test
- To  run the application test, begin by creating a test DB with:
```
createdb {test_db_name}
```
where `test_db_name` is `TEST_DATABASE_URL` as specified in `.env.sample` file
- Run test via npm scripts with command
```
npm test
```
or 
```
npm t
```


# Endpoints List
| Endpoint Description  | Routes                    | Method  |
|-----------------------|-----------------------------|---------|
| Bulk creates report entries for a particular  `reportID`  | /v1/reports/new              |   POST   |
| Fetch all Reports     | /v1/reports  |   GET   |


# TODOs:
1. Elaborate more on database modelling - Create Company and Employee Tables and map all three tables (Company, Report and Employee) appropriately. This is with intention that the application would scale to serve more than one client which MVP is built for.
2. Increase test coverage (FE especially).
3. Paginate reports table on the front end
4. Ad sorting to table.
5. Refactor Front-end to use state management library (e.g. redux)

# Author
[Rukayat Sadiq](https://github.com/ruqoyyasadiq)



==========================================================================
# Wave Software Development Challenge

Applicants for the [Software
developer](https://wave.bamboohr.co.uk/jobs/view.php?id=1) role at Wave must
complete the following challenge, and submit a solution prior to the onsite
interview.

The purpose of this exercise is to create something that we can work on
together during the onsite. We do this so that you get a chance to collaborate
with Wavers during the interview in a situation where you know something better
than us (it's your code, after all!)

There isn't a hard deadline for this exercise; take as long as you need to
complete it. However, in terms of total time spent actively working on the
challenge, we ask that you not spend more than a few hours, as we value your
time and are happy to leave things open to discussion in the on-site interview.

Please use whatever programming language and framework you feel the most
comfortable with.

Feel free to email [dev.careers@waveapps.com](dev.careers@waveapps.com) if you
have any questions.

## Project Description

Imagine that this is the early days of Wave's history, and that we are prototyping
a new payroll system with an early partner. Our partner is going to use our web
app to determine how much each employee should be paid in each _pay period_, so
it is critical that we get our numbers right.

The partner in question only pays its employees by the hour (there are no
salaried employees.) Employees belong to one of two _job groups_ which
determine their wages; job group A is paid $20/hr, and job group B is paid
$30/hr. Each employee is identified by a string called an "employee id" that is
globally unique in their system.

Hours are tracked per employee, per day in comma-separated value files (CSV).
Each individual CSV file is known as a "time report", and will contain:

1. A header, denoting the columns in the sheet (`date`, `hours worked`,
   `employee id`, `job group`)
1. 0 or more data rows
1. A footer row where the first cell contains the string `report id`, and the
   second cell contains a unique identifier for this report.

Our partner has guaranteed that:

1. Columns will always be in that order.
1. There will always be data in each column.
1. There will always be a well-formed header line.
1. There will always be a well-formed footer line.

An example input file named `sample.csv` is included in this repo.

### What your web-based application must do:

We've agreed to build the following web-based prototype for our partner.

1. Your app must accept (via a form) a comma separated file with the schema
   described in the previous section.
1. Your app must parse the given file, and store the timekeeping information in
   a relational database for archival reasons.
1. After upload, your application should display a _payroll report_. This
   report should also be accessible to the user without them having to upload a
   file first.
1. If an attempt is made to upload two files with the same report id, the
   second upload should fail with an error message indicating that this is not
   allowed.

The payroll report should be structured as follows:

1. There should be 3 columns in the report: `Employee Id`, `Pay Period`,
   `Amount Paid`
1. A `Pay Period` is a date interval that is roughly biweekly. Each month has
   two pay periods; the _first half_ is from the 1st to the 15th inclusive, and
   the _second half_ is from the 16th to the end of the month, inclusive.
1. Each employee should have a single row in the report for each pay period
   that they have recorded hours worked. The `Amount Paid` should be reported
   as the sum of the hours worked in that pay period multiplied by the hourly
   rate for their job group.
1. If an employee was not paid in a specific pay period, there should not be a
   row for that employee + pay period combination in the report.
1. The report should be sorted in some sensical order (e.g. sorted by employee
   id and then pay period start.)
1. The report should be based on all _of the data_ across _all of the uploaded
   time reports_, for all time.

As an example, a sample file with the following data:

<table>
<tr>
  <th>
    date
  </th>
  <th>
    hours worked
  </th>
  <th>
    employee id
  </th>
  <th>
    job group
  </th>
</tr>
<tr>
  <td>
    4/11/2016
  </td>
  <td>
    10
  </td>
  <td>
    1
  </td>
  <td>
    A
  </td>
</tr>
<tr>
  <td>
    14/11/2016
  </td>
  <td>
    5
  </td>
  <td>
    1
  </td>
  <td>
    A
  </td>
</tr>
<tr>
  <td>
    20/11/2016
  </td>
  <td>
    3
  </td>
  <td>
    2
  </td>
  <td>
    B
  </td>
</tr>
</table>

should produce the following payroll report:

<table>
<tr>
  <th>
    Employee ID
  </th>
  <th>
    Pay Period
  </th>
  <th>
    Amount Paid
  </th>
</tr>
<tr>
  <td>
    1
  </td>
  <td>
    1/11/2016 - 15/11/2016
  </td>
  <td>
    $300.00
  </td>
</tr>
  <td>
    2
  </td>
  <td>
    16/11/2016 - 30/11/2016
  </td>
  <td>
    $90.00
  </td>
</tr>
</table>

Your application should be easy to set up, and should run on either Linux or
Mac OS X. It should not require any non open-source software.

There are many ways that this application could be built; we ask that you build
it in a way that showcases one of your strengths. If you enjoy front-end
development, do something interesting with the interface. If you like
object-oriented design, feel free to dive deeper into the domain model of this
problem. We're happy to tweak the requirements slightly if it helps you show
off one of your strengths.

### Documentation:

Please modify `README.md` to add:

1. Instructions on how to build/run your application
1. A paragraph or two about what you are particularly proud of in your
   implementation, and why.

## Submission Instructions

1. Clone the repository.
1. Complete your project as described above within your local repository.
1. Ensure everything you want to commit is committed.
1. Create a git bundle: `git bundle create your_name.bundle --all`
1. Email the bundle file to [dev.careers@waveapps.com](dev.careers@waveapps.com)

## Evaluation

Evaluation of your submission will be based on the following criteria.

1. Did you follow the instructions for submission?
1. Did you document your build/deploy instructions and your explanation of what
   you did well?
1. Were models/entities and other components easily identifiable to the
   reviewer?
1. What design decisions did you make when designing your models/entities? Are
   they explained?
1. Did you separate any concerns in your application? Why or why not?
1. Does your solution use appropriate data types for the problem as described?
