# Arc en Cercles

Arc en Cercles is a Open-Source game. It uses a server with **NodeJS** and a web browser as a client.

Actually, the game is playable but a lot of things is happening in back-end to implement a neural-network and a genetic algorithm (yeah !).

![alt tag](https://raw.githubusercontent.com/erdnaxe/Arc_en_Cercles/master/docs/demo.png)

## Features

* Server side algorithm: no cheating and scoreboard management,
* Different level of difficulty (with more colours),
* Can play game globally (on all client at the same time) or not,
* API to let AI or bots play the game.

And much more coming!

## How to build and host a server

You need to have **NodeJS** with **NPM** on your machine.

* Clone the project, go to the project directory
* Download dependencies : `npm install`
* Launch the server : `npm start`
* The server will be available on `http://localhost:3000/`

## How to use the text client to code AI or bots

* Go to the project directory
* Launch the server (previous paragraph)
* Open a new shell and launch the client : `node client/client.js` or `npm test`
* If you set the game to global in `server/config.json` then you will be able to see the game in realtime in a browser.

The output of the client is a line of text. It's composed of integer like so :
* *1* int for the **turn** number,
* *1* int for the **total turn** number,
* *1* int for the actual **score**,
* *16x16* int for the **table** (top left first).

The input must be 4 integers separated with spaces :
* *2* int for the coordinates (x, y) of the **first click**,
* *2* int for the coordinates (x, y) of the **second click**.

The coordinates are between *0* and *15* for a grid size of *16*.

## Author

* **NodeJS game** by [Alexandre IOOSS](https://github.com/erdnaxe)
* **Original game** created by a group for a baccalaureate project (ISN).

