# Web Programming Final Project

## Pre-requisites
1. Install the required packages
    > Under the root directory

    ```
    yarn install:all
    ```
2. Prepare the database-related file `.env`, and place it under `/backend`. There must be one variable named `MONGO_URL` which is the connection string of your database
    - .env example
    
        ```
        MONGO_URL="xxxxx"    
        ```

## How to start
> Under the root directory
1. Frontend
    ```
    yarn start
    ```
2. Backend

    ```
    yarn server
    ```

## Demo
https://github.com/user-attachments/assets/6d4fe257-f06e-41ad-ada3-882d07a23694

<br>

## User Guide
1. Registration
    - Click the `SIGN UP` button at the top right corner of the web page to sign up for a new account

2. Login
    - Use the registered account to sign in

3. Posts page
    - Click on `NTU CSIE 論壇` at the top left corner would lead to the page that show all the posts (frow newest to oldest)

4. Create Post
    - Click the `WRITE` button at the top right corner of the main page (at `/posts` or `/`)

5. Post page
    - First, Click on arbitrary post in the main page
    - Click on the `up` or `down` button to like/dislike a post
    - Send (multi-line) comments with the input field
    - Clicking the name chips in comments (or name chip of author) lead you to profile pages of users
    - If it is your post, you can also click the "pencil" or "bin" button to edit/delete the post

6. Profile page
    - Click your own name chip at the top of the web page leads you to your profile page (you can also click on other name chips in the post page to view others profile pages)
    - The profile page would show Top-3 posts of the user (the rank is based on the number of likes and the timestamp of posts)
    - You can click on the `MORE` button to see all the posts of a user
    - You can click on the "pencil" icon in your profile page to edit your self intro and nickname

7. Search page
    - With the search bar at the top of the web page, you can search posts based on their titles

## Authors
- 蔡旭懷
    - Basic frontend, backend and database structure (GraphQL, Apollo Server/Client)
    - Login and register page
    - Post create page
    - Header (the menu bar at the top of the web page)
    - Video and slide for demo
    - Reusable pop-up messages component

- 曾子顏
    - Posts page
    - Post page
    - Profile page
    - Search page
    - Browser routing in frontend
    - Deploy
