# Lucky Draw

This is a lucky draw board with different potential prizes. Try your luck today!

[![](https://img.shields.io/badge/front_end-React-success.svg)]({linkUrl})
[![](https://img.shields.io/badge/back_end-Node.js-green.svg)]({linkUrl})
[![](https://img.shields.io/badge/integrate_with-Airtable-yellow.svg)]({linkUrl})


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the project locally

The whole project contains two GitHub repositories. This is the frontend part. You can find the backend service part here: [lucky-draw-service](https://github.com/AdrianaQyL/lucky-draw-service).

If you want to run this project on your computer, you can execute the following commands in your terminal.

### Backend

Firstly you need to start the backend service:

``` bash
 $ git clone git@github.com:AdrianaQyL/lucky-draw-service.git
 $ cd lucky-draw-backend
```

Since this project employs [Airtable](https://www.airtable.com/) to manage the prize items, you need to create a table called `Prizes` in your Airtable Base and replace the `YOUR_API_KEY` and `YOUR_AIRTABLE_BASE_ID` in `PrizeController.js`.

Now you can start the service:

``` bash
 $ node index.js
```

Then our service would run on http://localhost:3001.

### Airtable

In your Airtable Base, where you created the `Prizes` table, you will need to configure four fields for each prize item.

- name: The prize item's name.
- weight: The bigger the number you put in this field is, the more likely the player is going to get this prize.
- index: An index of 0-7 which decides the item's position on the board.
- image: An URL of the prize item's image file path.

### Frontend

``` bash
 $ git clone git@github.com:AdrianaQyL/lucky-draw.git
 $ cd lucky-draw
 $ npm install
 $ npm start
```
These commands will run the frontend project in development mode. Open your browser and type http://localhost:3000 to view it.

<!-- ## Deployed online version -->

<!-- This project is also deployed on [Netlify](https://www.netlify.com/). You can check the online version here: [Lucky Draw]() -->

## Design

### Board

This lucky board has 8 different prizes. When you start the game, you will see the prize items lighten up one after another clockwise. When it stops, you get your lucky prize.

### Dialog

We use different dialogs to interact with you. You can check what prize you earn in the current turn, why you cannot start another turn(because you run out of your gems), and review a list of all the prizes you have earned.

### Gem System

We adopt a gem system here to add more fun to this game. You will start with 40 gems. It will cost you a certain amount of gems each time you start a lucky draw. You cannot take another turn when you don't have enough gems. You can also earn gems from the lucky draw as it is one of the prizes.


## Logic

### Version 1: Implement the prize selection algorithm on the frontend (Insecure)

Currently we are doing a frontend demo so we will implement the prize selection algorithm on the frontend as well. Later we will add some backend services to this project.

#### Timer

We applied a timer to construct the flashing light effect on the board. Every time when a player clicks the start button and calls the `startDraw` function, the lights will be on in turn (call the `tick` function) every 0.08 seconds. We let the light goes around 5 times to make it look closer to a real-life lucky draw.

```
if (this.timer) {
    clearTimeout(this.timer)
}
this.timer = setInterval(
    () => this.tick(prizeIndex),
    80
)
```

The `tick` function is used to turn the light on:

```
tick (prizeIndex) {
    if (this.state.currentIndex + 1 === 8) {
        this.setState({
            circle: this.state.circle + 1
        })
    }
    this.setState({
        currentIndex: (this.state.currentIndex + 1) % 8
    })
    if (this.state.circle >= 5 && this.state.currentIndex === prizeIndex) {
        clearTimeout(this.timer)
        let newPrizeArray = [...this.state.gotPrizeArray]
        newPrizeArray.push(this.props.prizes[this.state.currentIndex])
        this.setState({
            showPrizeDialog: true,
            circle: 1,
            gotPrizeArray: newPrizeArray,
        })
    }
}
```

#### Shuffle

Since we have a weight for each prize (which controls the probability that you get each prize), we need an algorithm to randomly select a prize with the weights considered. 

We create a new array and the prize with a weight of more than 1 will be added by multiple times. For example, if prize A has a weight of 2, and prize B has a weight of 3, then in the new array we will have two prize As and three prize Bs.

After that, we need to shuffle our new array to make the selection random enough. There are two functions, `shuffle` and `getRandomIndex`, that we use to complete this task.

```
shuffle (list) {
    let copy = [...list]
    for (let i = 0; i < copy.length; i++) {
        let randIndex = this.getRandomIndex(0, copy.length - 1)
        let temp = copy[i]
        copy[i] = copy[randIndex]
        copy[randIndex] = temp
    }
    return copy
}
```
```
getRandomIndex (start, end) {
    return Math.floor(start + Math.random()*(end - start + 1));
}
```

### Version 2: Implement lucky draw service on the backend, and use Airtable for prize configuration

#### APIs

**getConfiguration**

Fetch data configured on Airtable (the prize items data for now), send it back to the frontend.

**selectPrize**

Now we move the prize selection service to the backend to make it more secure and sound. The frontend would only be responsible for accepting the result and render it.

#### Airtable APIs

Please refer to [Airtable API](https://airtable.com/api).


## Disclaimer

Everything in this project is just for fun and any prizes you earn in the lucky draw cannot be redeemed. :)


<!-- ## Available Scripts

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
 -->
