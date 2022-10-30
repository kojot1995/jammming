# Jammming

Connect with Spotify API, search for your favourite songs and create custom playlist on your Spotify account.


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)


## General Information
- This is a training project imitating functionality of creating playlist in Spotify app. It's a SPA (Single Page Application) using React framework. It connects with Spotify API (Application Programming Interface) using implicit grand authorization method. The implicit grant returns the token in the URL. You need a Spotify account to connect. After authorization you can search songs by title, album or artist. Search results are returned when you click on _SEARCH_ button. From there songs can be moved to New Playlist section by clicking on + sign. The playlist is added to user's Spotify account by clicking Save to Spotify button.


## Technologies Used
- HTML 5
- CSS 3
- JavaScript ES6
- Node.js version 16.17.1
- react version 18.2.0
- react-dom 18.2.0


## Features
- Connect to Spotify API
- Search songs by title, album or artist
- Display search results
- Add song to Playlist section by clicking on + sign
- Remove song from Playlist section by clicking on - sign
- Rename playlist
- Save playlist to user's Spotify account


## Setup
What are the project requirements/dependencies? Where are they listed? A requirements.txt or a Pipfile.lock file perhaps? Where is it located?
Proceed to describe how to install / setup one's local environment / get started with the project.


## Project Status
Project is: _in progress_


## Room for Improvement

Room for improvement:
- A song should be not visible in search results when it's already added to playlist.
- A message should be displayed when playlist has been successfully saved to user's account.
