# COIS-3420-Assignment-2
Simple web application for school assignment with user auth and DB storage

* Assignment 2 
* Ecommerce Store – ReadMe.
* Luka Piplica

## Site
* https://cois-3420-assignment-2.vercel.app/

## Setup and Run
To get my project set up and run on any computer or operating system, download the source code (ecommerce-store), head into the directory, and run `npm i` to install all the packages. Next, run the command `npm run dev` to get the website running and click the link to view the web page.

## Overview
This is a simple application to allows users to create an account, login, reset passwords, update profile information, and save products. 

## Libraries and Frameworks
I used vite to create the initial project which requires node to be installed. I used vite to allow me to have JavaScript modules in my application and to install npm packages. I installed the Firebase npm package to allow me to initialize my firebase app, create new users, and update data. I preferred this over the firebase cdn which is outdated.

## Firebase Realtime Database Rules

![image](https://github.com/luka2220/COIS-3420-Assignment-2/assets/42144047/2b6b5562-2347-4420-8029-992c2529abc3)

* These database rules only allow a user with a uid to read and write their own data and no other users.
