#Cheffies

Welcome,

In this document I will explain the reason and approach behind the Cheffies app. Imagine this, you just came home from work, you look in the fridge and it's completely empty. You ask your partner what he or she wants to eat but they don't know. You also don't have any inspiration and therefore you just start browsing while hungry. Wouldn't it be so much nicer to get recipe inspiration from someone who you know has the same taste? A one stop shop of recipes where each day new recipes are added? In addition, you might also be a cooking inspiration to others, so make sure you share your recipes as well!

Cheffies is an application where users can create their own online recipes while also being able to see the recipes of other users. Via commenting and likes the users can engage with each other and share their recommendations.

Please note, this project is fairly similar to the walkthrough project Moments of Code Institute as I used that as baseline. As I found the React module fairly difficult I decided to focus on a few key deviation while also being able to use the Moments app as guideline. I have tried to customize this project as far as possible within the timeline I had. 
The main customizations are the following:
- The Recipe model & creation form: the recipe deviates from a post by having instructions, a category, a cooking & preparation time, and a foreign key to ingredients. The form for creating a recipe is therefore also different and the same applies for the recipe page
- The Ingredient model & creation process: the model is completely novel and the creation of the ingredients and thus the ingredient creation for are completely custom. The creation of a recipe is a two step process which differs significantly from the Moments project.
- The Popular Recipe display: the top 5 recipe display is a new feature, though based on the Popular Users section. It deviates from that section by the amount displayed (5 vs 10), the layout, and the API call that needs to be made.

The last update to this file was: **March 16, 2023**

# Deployed project
The app can be accessed via the following link: [Click to go to Website](https://cheffies.herokuapp.com/) 

<img src="src/assets/impression-cheffies.png">

## Repository

[Find the project repository here.](https://github.com/MerelMoehn/cheffies)

# Table of Contents

## Contents
- [General introduction and instructions](#general-introduction-and-instructions)
  * [Project Approach](#project-approach)
  * [Epics & labels](#epics-&-labels)
  * [Project Planning](#project-planning)
- [User stories](#user-stories)
- [Features](#features)
  * [Future Features](#future-features)
- [Design & wireframing](#design-&-wireframing)
  * [Colourscheme](#colourscheme)
  * [WireFrames](#epics-&-labels)
  * [Typography](#typograpy)
  * [Icons](#icons)
  * [Imagery](#imagery)
- [Data Model](#the-data-model)
- [Technology Used](#technology-used)
  * [Languages used](#languages-used)
  * [Frameworks & Libraries used](#frameworks-and-libraries-used)
- [Testing](#testing)
  * [Validators](#validators)
    * [Lighthouse](#lighthouse)
    * [W3C CSS validator](#w3c-css-validation)
  * [Manual Testing](#manual-testing)
  * [Automated Testing](#automated-testing)
  * [Bugs found and solved](#bugs-found-and-solved)
    * [Unsolved bugs](#unsolved-bugs)
- [Deployment](#deployment)
  * [Heroku](#heroku)
  * [ElephantSQL](#elephantsql)
  * [Creating a local clone](#creating-a-local-clone)
- [Credits](#credits)
  * [Code](#code)
    * [Code Institute](#code-institute)
    * [Bootstrap](#bootstrap)
  * [Acknowledgments](#acknowledgements)


# General introduction and instructions

## Project Approach
This application is built using an agile approach. Therefore, the functionalities were broken down into Epics & User stories, and these picked up in three sprints. Each sprint consisted of two weeks. 

## Epics & labels
The application features were broken down into Epics and hence in User Stories. 
For each User Story, an issue was created. The corresponding Epic was depicted via a label.

[All Epics/labels can be viewed here.](https://github.com/MerelMoehn/cheffies/labels)
The following Epics were defined:
- Navigation & authentication - all stories related to account management
- Adding & viewing recipe - all stories related to creating and viewing a specific recipe
- The recipe page - all stories related to a specific recipe page
- Adding & viewing ingredients - all stories related to creating and displaying ingredients
- Showing & searching recipes - all stories related to displaying multiple recipes and searching for a recipe
- Commenting - all stories related tot creating, deleting, and editing comments
- Like/Unlike recipe - all stories related to like and unlike
- (un)following - all stories related to being able to (un)follow a specific user
- User profiles - all storiess related to displaying a user profile
- Documentation - all stories related to documentation
- Bugs


## Project Planning
The project was planned and built in four sprints each consisting of one week. The project tool used was GitHub Projects & Issues. The issues were mapped on a kanban board using labels and swimming lanes.

[View stories/bugs included in sprint 1.](https://github.com/MerelMoehn/cheffies/milestone/1?closed=1)
[View stories/bugs included in sprint 2.](https://github.com/MerelMoehn/cheffies/milestone/2?closed=1)
[View stories/bugs included in sprint 3.](https://github.com/MerelMoehn/cheffies/milestone/3?closed=1)


# User stories

In the table below is an overview of the User Stories. 

The total number of issues (including bugs) created are: 41

| User Story ID | As a/an | I want to be able to... | So that I can... |
| --- | ----------- | ----------- | ----------- |
 | [Authentication & navigation](https://github.com/MerelMoehn/cheffies/issues?q=label%3A%22Navigation+%26+Authentication%22+is%3Aclosed) | 
 | 1 |  User | view a navbar from every page | navigate easily between pages  | 
 | 2 | User | navigate through pages quickly | view content seamlessly without page refres | 
 | 3 | Unregistered user | create a new account | that I can access all the features for signed up users | 
 | 4 | Logged-out user | sign in to the app | access functionality for logged in users | 
 | 5 | Logged-in user | As a user I can tell if I am logged in or not| log in if I need to | 
 | 6 | Logged-out user | see sign in and sign up options| I can sign in/sign up | 
 | 7 | Logged-in user | maintain my logged-in status until I choose to log out| that my user experience is not compromised | 
 | 8 | User | view user's profile picture| easily identify users of the application | 
  | [Adding & Viewing Recipe](https://github.com/MerelMoehn/cheffies/issues?q=is%3Aissue+sort%3Acreated-asc+label%3A%22Adding+%26+Viewing+Recipe%22+is%3Aclosed) | 
 | 9 | Logged-in user | I can create recipes | share my recipes with the world! | 
 | 10 | Logged-in user  | view the details of a single recipe | learn more about it| 
  | [Like/Unlike Recipe](https://github.com/MerelMoehn/cheffies/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22Liking+a+recipe%22) | 
 | 11 | Logged-in user | Like & unlike a recipe | Show others that I like it | 
 | [Showing & Searching Recipes](https://github.com/MerelMoehn/cheffies/issues?q=label%3A%22Showing+%26+searching+Recipes%22+is%3Aclosed) | 
 | 12 | User | view all the most recent recipes, ordered by most recently created first | can be up to date with the newest content | 
 | 13 | User | search for recipes with keywords | find the recipes and user profiles I am most interested in. | 
 | 14 | User | view the recipes I liked| find the recipe I enjoy the most | 
 | 15 | User | view content filtered by users I follow | keep up to date with the recipes they are posting | 
 | 16 | User | keep scrolling through the recipes on the site, that are loaded for me automatically | I don't have to click on "next page" etc | 
 | 41 | User | search for a recipe based on ingredient | find recipes that contain that ingredient | 
  | [The Recipe Page](https://github.com/MerelMoehn/cheffies/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22The+recipe+page%22) | 
 | 17 | User | view the recipe page | read the comments & ingredients of the recipe |
 | 18 | Recipe owner | edit my recipe and ingredients | make corrections or update my recipe after it was created | 
 | 21 | User | read comments on recipes | can read what other users think about the recipes | 
  | [Commenting](https://github.com/MerelMoehn/cheffies/issues?q=label%3ACommenting+is%3Aclosed) |
| 19| Logged-in User | add comments to a recipe | share my thoughts about the recipe | 
| 20 | User | see how long ago a comment was made | know how old a comment is | 
| 22 | Owner of a comment | delete my comment | control removal of my comment from the application | 
| 23 | Owner of a comment | edit my comment | fix or update my existing comment | 
  | [User Profiles](https://github.com/MerelMoehn/cheffies/issues?q=is%3Aissue+sort%3Acreated-asc+is%3Aclosed+label%3A%22User+Profiles%22) |
| 24 | User| view other users profiles | see their recipes and learn more about them | 
| 25 | User | see a list of the most followed profiles | that I can see which profiles are popular | 
| 26 | User | view statistics about a specific user: bio, number of posts, follows and users followed | learn more about them | 
| 28 | User | view all the recipes by a specific user | that I can catch up on their latest recipes, or decide I want to follow them | 
| 29 | Logged-in user | can edit my profile | change my profile picture and bio| 
| 30 | Logged-in user | update my username and password | change my display name and keep my profile secure | 
  | [(un)following)](https://github.com/MerelMoehn/cheffies/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%28un%29following) |
| 27 | Logged-in user | follow and unfollow other users | see and remove recipes by specific users in my recipes feed | 
  | [Adding & viewing Ingredients](https://github.com/MerelMoehn/cheffies/issues?q=is%3Aissue+sort%3Acreated-asc+is%3Aclosed+label%3A%22Adding+%26+viewing+Ingredients%22) |
| 31 | Logged-in user | create ingredients | complete & share my recipes with the world! |
| 32 | Ingredient owner | delete an ingredient | if I make a mistake I can delete and re-submit after an ingredient was created |
  | [Documentation](https://github.com/MerelMoehn/cheffies/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3Adocumentation) |
| 31 | Developer | create and update README | share my project with others! |
| 32 | Developer | create wireframes | share my design view on this project with others |

The remaining tickets were created to report bugs and cound be found [Here](https://github.com/MerelMoehn/cheffies/issues?q=label%3Abug+is%3Aclosed)

# Features
This application has several features which I will highlight per page.

- On the 'Home' page the logged-out user can make use of the following features:
  - Register
  - Log-in
  - Log-out
  - See the recipes that are on the site
  - Click on a selected recipe and go to its detail page
  - See the top 5 recipes with the most likes
  - See the top 10 most popular chef's based on their followers
  - Go to the detail page of a specific user
- A logged-in user on the 'Home' page can make us of the following features:
  - All the functionalities named above
  - Search for a recipe based on username, recipe name, ingredient
  - Like a recipe, if the user is not the owner of the recipe
  - Select the 'add' button to add a recipe
  - Navigate to 'Feed' to see all the recipes of the users they are following
  - Navigate to 'Liked' to see all the recipes they liked
- A logged-in user on a specific 'Recipe' page can make us of the following features:
  - See the ingredients that are needed for that recipe
  - Seethe instructions that need to be followed for that recipe
  - See the comments that are placed by that recipe 
  - Like a recipe, if the user is not the owner of the recipe
  - Comment on a recipe, if the user is not the owner of the recipe
  - Adjust the recipe, if the user is the owner of the recipe. The user is then navigated to the edit form where the information is all previously filled in.
  - Adjust a comment, if the user is the owner of the comment
  - A logged-out user cannot see the comments
- On the 'Add Recipe' page a logged-in user can make use of the following features:
  - Add a picture of the recipe (note, it is an outstanding bug that a picture needs to be uploaded, its not optional)
  - Add the title of the recipe
  - Add the instructions of the recipe
  - Add the category of the recipe
  - Add the cooking & preparation time of the recipe
  - Cancel the creation of the recipe
  - Go to the next step to add ingredients
- On the 'Add Ingredients' page a logged-in user can make use of the following features:
  - See a summary of the recipe
  - Add a name of the specific ingredient
  - Add the amount required of an ingredient
  - Select the unit measurement of an ingredient
  - See all the previously added ingredients
  - Being able to delete each ingredient
- On the profile page a user can make use of the following features:
  - See the Name, Bio and Profile picture of that user profile
  - See the statistics regarding followers, following and amount of posts
  - See all the posts of that user
  - See the popular profiles

## Future Features
The following features would be nice to add in the future:

- Mealplan: allow users to add recipes they want to include in a mealplan
- Grocery list: allows users to automatically generate a grocerylist based on the recipes in their mealplan
- Add advanced filter: add filters such as vegetarian, meat, and fish to let the user do an advanced search

# Design & wireframing
## Colourscheme
The design of the Cheffies application is based on the image below. Four colours are extracted and used for the main elements on the page. 
* Color for o.a. NavBar: #1a1a1a
* Color for o.a. buttons: #8f8e49
* Color for background and white text: #f9f9f9
* Color for background Popular Profiles and Icons: #E6E6E6
<img src="src/assets/colorscheme-cheffies.png">

## WireFrames
[Click here for related user story.](https://github.com/MerelMoehn/cheffies/issues/34)
The wireframes created for this project were made in the online tool Miro. 

The wireframes were used as a rough sketch of what the application was meant to do and look like. This included the page navigation, the different pages needed, and a rough sketch of the design.
After initial set up of the main features the design was further implemented based on the design as described above.
<img src="src/assets/cheffies-wireframes.jpg">

## Typography

- The typography used within the application is the following font-family: Roboto, sans-serif. These fonts were used because they are a fairly safe and modern choice and do not distract the attention from the books. 

## Icons
- I used icons from Font Awesome website. They are used on the index page to depict the three main features of the website.

## Imagery 
- Imagery is used to give the application a more sophisticated look and to make it feel like an actual online recipe platform.
- Recipe images uploaded by the user are mostly displayed within React Bootstrap cards.
- The images used have been downloaded from Unsplash.com

# Data model
The data model used for this project is implemented in Cheffies-API. 
Please refer to the ReadMe of the API for the data model.
[Click here for the data model](https://github.com/MerelMoehn/cheffies-api/blob/main/README.md)

<img src="src/assets/datamodel-cheffies.png">

# Technology used
## Languages used
- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [CSS](https://en.wikipedia.org/wiki/CSS)
- [ReactJS](https://en.wikipedia.org/wiki/CSS)
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
- [Python](https://en.wikipedia.org/wiki/Python_(programming_language))

## Frameworks & Libraries used
- [React Bootstrap 4](https://react-bootstrap.github.io/) 
  - I used React bootstrap throughout the site to make it responsive. I sourced code from the Bootstrap documentation when building the Navbar, Cards, Badges, Containers and Buttons.

- [Google Fonts](https://fonts.google.com/)
  - Fonts are imported from google fonts.
  
- [Font awesome](https://fontawesome.com/)
  - I used icons from font awesome on the index page.

- [Cloudinary](https://cloudinary.com/)
  - I used images that were stored on Cloudinary.

# Testing
## Validators
### Lighthouse
Each site page has been checked with Lighthouse and the following improvements have been made:
* Using smaller images to load page faster
* include meta tag on base.html
* Language has been set in base.html
* Non unique ARIA IDs are made unique
* Remove big layout shift with buttons for user bookcase
For pages that are not rendering images, all indicators are green. However, uploading images with different sizes decreases the performance score.

### W3C CSS Validation
The style.css code has been validated by the W3C CSS validator and passed without any errors.

## Manual Testing
Note that I am referring to manual testing after the main development stage was finished. Bugs found during development were handled immediately. 

Each user story is tested for acceptance. These testcases and screenshots can be seen in each individual userstory. 
Take a look at the following user story as example: [Add Ingredients](https://github.com/MerelMoehn/cheffies/issues/31)


## Automated testing
For each of the components there are automated test, though on a basic level.
All tests pass. 
<img src="src/assets/automated-tests.png">

## Bugs found and solved
Throughout the project there were multiple bugs found and solved. These bugs were logged on the GitHub project and can be reviewed via the following link: [Click here to review the bugs.](https://github.com/MerelMoehn/cheffies/issues?q=label%3Abug+is%3Aclosed) 

### Unsolved bugs
At the moment of submitting and deployment, there is one unresolved bug which is about being unable to submit a recipe without an image. After contact with the tutors it became clear this was also an outstanding bug in the Moments project.

# Deployment
## Heroku
The project was deployed to Heroku using the following steps:
1. I pushed my final code via the terminal after finishing the project.
2. I created a new Heroku app
3. I linked the Heroku app to the repository
4. I pushed my final code via the terminal after finishing the project.
5. Then I selected 'deploy'

## ElephantSQL
The database was set up by following the steps beneath:
1. Log in to ElephantSQL.com to access your dashboard
2. Click “Create New Instance”
3. Set up your plan
4. Select “Select Region”
5. Select a data center near you
6. Then click “Review”
7. Check your details are correct and then click “Create instance”
8. Return to the ElephantSQL dashboard and click on the database instance name for this project
9. In the URL section, click the copy icon to copy the database URL
10. The proper steps were taken in the settings.py file to connect with the database.

## Creating a local clone
You can create a local clone of the repository via the following steps:
1. navigate to the main page of the repository
2. download the code
3. Copy the URL for the repository.
4. Open Terminal
5. Change the current working directory to the location where you want the cloned directory.
6. Type git clone, and then paste the URL you copied earlier.
7. Press Enter to create your local clone.

For more detailed instructions, navigate to the following page:
https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

# Credits
## Code
### Code Institute:
  - I based the set up of this project on the Code Institute Moments walkthrough project. I have customised my website wherever possible. Customization is especially visible with respect to the recipes, ingredients and popular recipe section.

### Bootstrap:
  - I have used Bootstrap classes throughout my project, including for layout utilities and cards. I sourced code from the Bootstrap documentation when building the Navbar, Cards, Dropdown, and pagination.

### Icon
The Icon has been made by Iconixar and I got it from https://www.flaticon.com/free-icon/chef_2413341?related_id=2413004&origin=search

### Global alert message
This code for the global alert message is based on Jeffrey Yu's blog: https://dev.to/jeffreythecoder/set-up-react-global-alert-popup-in-10mins-36l3

## Acknowledgements
- Thank you to my mentor for helpful feedback, industry insights and recommended tools.

- Thank you to the tutors and staff at Code Institute for their support.


Thank you!