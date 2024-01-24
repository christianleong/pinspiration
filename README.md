#Pinspiration | CRUD application
Welcome to Pinspiration! A CRUD app where users can upload their inspirations to the world which was inspired by Pinterest.

:point_right: **Live Project:** [Click here to see my live project!]()

TO BE UPDATED

## Table of contents
- [Overview](#page_facing_up-overview)
  - [Screenshots](#screenshots)
  - [Links](#link-links)
- [My process](#bulb-my-process)
  - [Built with](#built-with)
  - [Key takeaways](#key-takeaways)
  - [Personal challenges](#personal-challenges)
- [Future development](#future-deployment)

## :page_facing_up: Overview
### Screenshots
<img src="./screenshots/Screenshot 2024-01-24 at 10.13.49 pm.png" alt="Desktop Screenshot" style="width:900px;"/>
<br>
<img src="./screenshots/Screenshot 2024-01-24 at 10.14.05 pm.png" alt="Desktop Screenshot" style="width:900px;"/>

### :link: Links
- **Github:** [https://github.com/christianleong/pinspiration](https://github.com/christianleong/pinspiration)

## :bulb: My process
### Built with
- HTML
- CSS
- Flexbox
- Node.js
- Express
- Bcrypt
- Embedded JavaScript Template (EJS)
- express-ejs-layouts
- express-session
- method-override
- pg
- nodemon
- Postgres

### Key takeaways
- My planning process on Trello can be improved by listing out the features that the user may want on each page, instead of listing out a to-do list.
- I need to structure my steps better and avoid feature creep to work more efficiently and reduce potential bugs in the future.
### Personal challenges
- The sign up page was a bit tricky especially with the nested if statements to check if the username is already taken and email address already exists, otherwise the user may proceed to sign up.
- The info page was also tricky because I had to join the database tables to display data from both tables (ie. title and description from pins database, and username from the users database)
- Numerous debugging issues. 
## :triumph: Future deployment
- Make searchbar functional to be able to search for keywords in titles.
- Allow users to comment on posts.
- Allow users to like posts.
- Show the logged in user's username in the top right.
- Add more CSS styling especially to the homepage.
- Improve the index page's layout so that it is similar to Pinterest.