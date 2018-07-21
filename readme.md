# Yelp Camp Workflow

## V1
### Basic Setup
* add landing page
* add campgrounds page that lists all campgrounds
* each campground has a name and image

### Layout and Basic Styling:
* create basic header and footer partials
* add bootstrap

### Create New Campgrounds:
* setup new campground POST route
* add body-parser
* setup route to show form
* add basic unstyled form

### Style camgrounds page
* add a better header/title
* make campgrounds display in a grid

## V2
### Setup Database
* install MongoDb
* add Mongoose
* setup campground model
* use camground model inside of routes

### Show Page
* review RESTful routes
* add description to campground model
* show db.collection.drop()
* add a show route/template

## V3
### Refactor Mongoose Code
* create models directory
* use module.exports
* require everything correctly
* add comment model

### Drop and Create
* create a seeds file to drop and create data
* data includes campgrounds and comments
* Display comments on page

### Comment New/Create
* add comment new and create routes
* add new comment form

## V4
### Style Show Page
* add sidebar
* display comments nicely

## V5
### Authentication
* install passport packages
* define user model
* configure passport
* add register routes and template
* add login routes and template
* add logout route
* prevent user from commenting to campgrounds unless logged in
* add links to navbar
* show/hide auth links correctly

## V6
### Refactor code
* authentication routes
* comments routes
* campgrounds routes

#3# User: Comments
* associate users and comments
* save author's username to a comment automatically

### User: Campgrounds
* only registered users can create a campground
* save username and id to campground

## V7
### Update and Destroy
* add method override
* add edit route for campgrounds
* add link to edit page
* add update route
* add delete route

### Authorization
* only user who created a campground and edit/delete it
* show edit/delete buttons only yo user who created the campground
* same to comments
* refactor middleware