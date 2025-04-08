# Music Playlist Manager 

## Overview
Music Playlist Manager is a simple web application that allows users to create and manage their music playlists. This is a first project using a cloud database, specifically Google Firebase. It explores Cloud Firestore, Firebase Authentication and basic CRUD operations to the database. 

### Purpose 
This project serves as a learning activity to build a functional web application backed by a cloud dababase. By creating this Music Playlist Management web app, users can create an account and log in to be able to create and manage their own playlists. The playlist and song data are stored in Firebase. This application provides a foundation for building more advanced features in the future, such as a music player and the functionality of sharing playlists. 

### Features
- User authentication (sign up, login and logout)
- Create and delete playlists
- Add and remove songs in the playlist
- View playlists and their content

### Structure
- Authentication process: sign up, login and log out
- Playlist management: Create and delete playlist and manage songs 
- Interfaces: Playlist, songs and filtered songs views

[Software Demo Video](http://youtube.link.goes.here)

## Cloud Database
This prohect uses Google Cloud Firestore which is a flexible and scalable NoSQL database to store and sync data in real time.

### Database Structure 
The database consists of two collections: 
- Playlists
    - name: Name of the playlist
    - description: Short description of the playlist
    - userId: The unique ID of the user who created the playlist
    - songs
- Songs
    - title: Song title
    - artist: Name of the artist
    - album: Album name
    - releaseYear: Year the song was released

Additionally, Firebase Authentication stores the user credentials:
- email: User's email adress
- uid: Unique identifier for each authenticated user

## Development Environment

### Tools
- Programming language: Next.js
- IDE: Visual Code
- Version Control: Git and GitHub
- Operating System: macOS

### Libraries
- Tailwind CSS: For styling the frontend
- Firebase SDK: For autentication and database operations 

## Useful Websites
- [Cloud Firestore: Get started](https://firebase.google.com/docs/firestore/quickstart)
- [Manage Data](https://firebase.google.com/docs/firestore/manage-data/add-data)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Password Authentication](https://firebase.google.com/docs/auth/web/password-auth)

## Future Work
- Enrich the song collection with an album image, music genre and an external link to listen to the song
- Add the feature of sharing the playlist on social media platforms
- Allow users to mark playlists as public or private so public playlists can be viewable by others
