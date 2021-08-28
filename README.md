# Lucky Draw

This is a lucky draw board with different potential prizes. Try your luck today!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the project locally

If you want to run this project on your computer, you can run the following commands in your terminal:

``` bash
 $ git clone git@github.com:AdrianaQyL/lucky-draw.git
 $ cd lucky-draw
 $ npm install
 $ npm start
```
These commands will run the project in development mode. Open browser and type http://localhost:3000 to view it.

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

We applied a timer to construct the flashing light effect on the board. Everytime when a player click the start button and call the `startDraw` function, the lights will be on in turn (call the `tick` function) every 0.08 seconds. We let the light goes around for 5 times to make it look closer to a real-life lucky draw.

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

We create a new array and the prize with a weight more than 1 will be added by multiple times. For example, if prize A has a weight 2, and prize B has a weight 3, then in the new array we will have two prize A's and three prize B's.

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
