## Deploy

http://io-dev.avehub.ml/

## Description

Wep Application for managing personal collections

For unauthorized user site is available in read-only mode with disabled ability to see likes and comments

Every unblocked authenticated user can create and manage collections on their profile page

The site administrators can create and manage collections both from his profile and from the profile of any user, and has access to the page with a table for user management

The main page contains the latest added items, the largest collections, as well as a tag cloud

## Features

<details>
<summary>UI</summary>

The project is made using **Material UI** components

</details>

<details>
<summary>Forms</summary>

The forms in the project are controlled by **react-hook-form**

The project has forms:

* *Registration, login*

  Forms consist of text fields

* *Collection creation*

  The form consists of:<br>
  * Text field for input the title of the collection
  * Field to add a picture and view it, after uploading to the cloud
  * Field for selecting a collection theme with a fixed set options
  * Field for input the description
  * And optional extra fields for collection customization, which allow you to select future fields (by specifying the field name) that will be displayed when you create collection items

* *Item creation*

  The form consists of:<br>
  * Text field for input the title of the item
  * Field for input the description
  * Field for entering tags that is a *React Autocomplete component*, with the ability to select tags from those previously entered on the site when creating other items
  * Extra fields that are created depending on the data passed by the user when creating the collection.<br>
  There are 5 types of extra fields: 
      1. Number
      2. String
      3. Text 
      4. Date
      5. Checkbox

</details>

<details>
<summary>Image uploading</summary>

Images uploaded by the user are stored in **Firebase** cloud. An image url is saved to the database when the collection creation form is submitted

</details>

<details>
<summary>Real-time comments & likes</summary>

On the page of each item is implemented comments block and likes, which are updated in real-time mode using interval queries. 

Comments block and likes is available only to authorized users

</details>

<details>
<summary>Dark mode</summary>

Switching the theme of the site is done by clicking on the button in the header

Implemented based on MUI **createTheme** and **ThemeProvider**

</details>

<details>
<summary>Locales</summary>

Site localization can be switched by selecting a language in the header

Implemented based on **react-intl**

</details>


----------

1) run ``npm install``
2) Start react app
``npm start`` or ``npm run build`` for production

3) Go to ***api*** folder

``cd api``

4) Copy ***[dist.config.js](api%2Fdist.config.js)*** and set your config DB
5) Copy ***[dist.firebase.config.js](api%2Fdist.firebase.config.js)*** and set your config firebase (for store image)
6) in [src/http.ts](src%2Fhttp.ts) you can set up api endpoint

7) Start express (execute [app.js](api%2Fapp.js))

``node app.js``


----------

For example you can use the next Users:
1) Admin user 

login: admin

password: admin

2) some user

login: test

password: test
