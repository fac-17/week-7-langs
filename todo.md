# Week 7 - LANG

## Code of conduct
* We need to hold Jack to talk when discussing
* Start fresh :)
* group learning : When something has to be explained/clarified, we all regroup to explain -> everyone understand roughly the whole project (global)
* Let's agree just before pairing how we want to proceede
* swap pairs every 1:30 and be careful about everyone is coding
* we are all together in this group, so we care about each other and don't leave anyone behind
* be careful with the commits
* Be kind to each other
* Be mindful when explaining - everyone likes to be taught/explained to in different ways
* Engage in pull requests/code review
* Test your code as we go

## To do list

### Wednesday AM
- [x] Code of conduct
- [ ] Idea
- [ ] Make a list of what we have to do

### Wednesday PM
- [x] file structure
    - [x] public
        - [x] establish an html file (boilerplate)
        - [x] CSS file
        - [x] dom.js
    - [x] SRC:
        - [x] server.js
        - [x] router.js
        - [x] handler.js
    - [x] query folder
        - [x] getData
        - [x] postData
    - [x] DB folder
        - [x] build_db.js
        - [x] build_db.sql
- [x] repo
- [x] postgres
- [x] travis
- [x] heroku
- [x] pic dependencies
- [x] basic html/server/router/handler

- [ ] Register a new user:
    - [ ] form -> client validation -> index.html
    - [ ] dom.js -> do request to back end -> handler.js
    - [ ] handler.js -> check database (getData) -> compare user registration
    - [ ] IF: user name is on database -> error handler = response to front ('user already exist')
    - [ ] IF: user doesn't exist -> hashed password -> register in database

![](https://i.imgur.com/QyMxjyf.png)




- [ ] Login/signing a user:
    - [ ] form -> client validation -> index.html
    - [ ] check if the name is matching with a user from the database
        - [ ] IF match:
            - [ ] hash password
            - [ ] compare hashedpassword with the hashedpassword of database
                - [ ] if not ok: send error('Wrong password')
                - [ ] if ok: go next step
                    - [ ] generate token
                    - [ ] token is deliver in a cookie
                    - [ ] Do something -> index.html/dom.js

### Thursday AM 
- [ ] give user token inside a cookie on successful log in and redirect to mystery page
- [ ] show sign up page if user attempts to enter mystery page without signing in
- [x] GetData
- [x] PostData
- [x] Tests

### Thursday PM
- [ ] 
- [ ] Spend an hour on our readme (5-6pm)


## Project:
We want a website that allows a user to register (with a username and a password). The user can also log in. Once the user has logged in/ registered, they can see another page. 

## Project goals
- [ ] Login form with 2 fields - username and password
- [ ] Users only have to log in once (i.e. implement a cookie-based session on login)
- [ ] Username is visible on each page of the site after logging in
- [ ] Any user-submitted content should be labelled with the authors username
- [ ] There should be protected routes and unprotected routes that depend on the user having a cookie or not (or what level of access they have).
- [ ] Website content should be stored in a database
- [ ] Include thorough tests on the back-end, testing pure functions and testing routes using Supertest. If you make external API calls, use Nock to mock the response for your tests.
- [ ] Test front-end logic, we don't expect tests on the DOM.

## Project stretch goals
- [ ] Use logic for the login cookie
- [ ] Client-side and server-side validation on login form, including error handling that provides feedback to users
- [ ] Add roles and permissions - Have an "admin" level user (role) who can edit and delete all content 😱 (permissions)
- [ ] Add comment functionality to content
- [ ] Add like functionality to content
- [ ] Allow users to delete the content that they have submitted



## What's gone well

- Swapping regularly
- Code reviewing meticulously

## What could have gone better
