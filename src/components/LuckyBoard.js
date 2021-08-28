import { PureComponent } from "react";
import Dialog from "./Dialog";
import "./LuckyBoard.css"

export default class LuckyBoard extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            currentIndex: -1,
            currentGems: this.props.startGemNum,
            showPrizeDialog: false,
            showNoGemDialog: false,
            showListDialog: false,
            circle: 1,
            gotPrizeArray: []
        }

        this.startDraw = this.startDraw.bind(this)
        this.getPrize = this.getPrize.bind(this)
        this.shuffle = this.shuffle.bind(this)
        this.getRandomIndex = this.getRandomIndex.bind(this)
        this.closePrizeDialog = this.closePrizeDialog.bind(this)
        this.closeNoGemDialog = this.closeNoGemDialog.bind(this)
        this.showListDialog = this.showListDialog.bind(this)
        this.closeListDialog = this.closeListDialog.bind(this)
        this.tick = this.tick.bind(this)
    }

    startDraw (setCurrentIndex) {
        if (this.state.currentGems - this.props.gemCost >= 0) {
            console.log("lucky draw start!")
            // deduct gem cost
            this.setState({
                currentGems: this.state.currentGems - this.props.gemCost
            })
            // get the prize index
            let prizeIndex = this.getPrize()
            // circular flashing light timer
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setInterval(
                () => this.tick(prizeIndex),
                80
            )
        } else {
            console.log("You don't have enough gems!")
            this.setState({
                showNoGemDialog: true
            })
        }
    }

    getPrize () {
        // get random prize with weight
        let prizeListWeighted = []
        this.props.prizes.map(item => {
            prizeListWeighted.push({
                name: item.name,
                image: item.image,
                index: item.index
            })
            for (let i = 1; i < item.weight; i++) {
                prizeListWeighted.push({
                    name: item.name,
                    image: item.image,
                    index: item.index
                })
            }
        })
        prizeListWeighted = this.shuffle(prizeListWeighted)
        let random = Math.floor(Math.random() * prizeListWeighted.length)
        return prizeListWeighted[random].index

        // return Math.floor(Math.random() * 8) // former version: equal probability for each prize
    }

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

    getRandomIndex (start, end) {
        return Math.floor(start + Math.random()*(end - start + 1));
    }

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
            // gain gems prize
            let prizeName = this.props.prizes[this.state.currentIndex].name
            if (prizeName.indexOf("矿石") > 0) {
                let gemAdd = prizeName.substring(0, prizeName.indexOf("矿石"));
                this.setState({
                    currentGems: this.state.currentGems + parseInt(gemAdd)
                })
            }
            // update list for all the earned prizes
            let newPrizeArray = [...this.state.gotPrizeArray]
            newPrizeArray.push(this.props.prizes[this.state.currentIndex])
            this.setState({
                showPrizeDialog: true,
                circle: 1,
                gotPrizeArray: newPrizeArray,
            })
        }
    }

    closePrizeDialog () {
        this.setState({
            showPrizeDialog: false,
            currentIndex: -1
        })
    }

    closeNoGemDialog () {
        this.setState({showNoGemDialog: false})
    }

    showListDialog () {
        this.setState({showListDialog: true})
    }

    closeListDialog () {
        this.setState({showListDialog: false})
    }
    
    render() {

        return (
            <div className="lucky-board-container">
                {this.state.showPrizeDialog && <Dialog onClose={this.closePrizeDialog} discription="恭喜您中奖了！" prize={this.props.prizes[this.state.currentIndex]}/>}
                {this.state.showNoGemDialog && <Dialog onClose={this.closeNoGemDialog} discription="啊哦，您的矿石不足"/>}
                {this.state.showListDialog && <Dialog onClose={this.closeListDialog} discription="您已获得以下奖品：" prizeArray={this.state.gotPrizeArray}/>}
              
                <div>幸运抽奖</div>

                <div>当前矿石数：{this.state.currentGems}</div>
                
                <div className="lucky-board">
                  <div className="items-wrapper">
                    
                    <div className={`rotate-item rotate-item-0 ${this.state.currentIndex === 0 ? "chosen" : null}`}>
                      <img src={this.props.prizes[0].image} alt=""/>
                      <div className="text">{this.props.prizes[0].name}</div>
                    </div>
        
                    <div className={`rotate-item rotate-item-1 ${this.state.currentIndex === 1 ? "chosen" : null}`}>
                      <img src={this.props.prizes[1].image} alt=""/>
                      <div className="text">{this.props.prizes[1].name}</div>
                    </div>
        
                    <div className={`rotate-item rotate-item-2 ${this.state.currentIndex === 2 ? "chosen" : null}`}>
                      <img src={this.props.prizes[2].image} alt=""/>
                      <div className="text">{this.props.prizes[2].name}</div>
                    </div>
        
                    <div className={`rotate-item rotate-item-7 ${this.state.currentIndex === 7 ? "chosen" : null}`}>
                      <img src={this.props.prizes[7].image} alt=""/>
                      <div className="text">{this.props.prizes[7].name}</div>
                    </div>
        
                    <div className="rotate-item lucky-draw" onClick={this.startDraw}>
                      <div className="text">抽奖</div>
                      <div className="text">{this.props.gemCost}矿石/次</div>
                    </div>
        
                    <div className={`rotate-item rotate-item-3 ${this.state.currentIndex === 3 ? "chosen" : null}`}>
                      <img src={this.props.prizes[3].image} alt=""/>
                      <div className="text">{this.props.prizes[3].name}</div>
                    </div>
        
                    <div className={`rotate-item rotate-item-6 ${this.state.currentIndex === 6 ? "chosen" : null}`}>
                      <img src={this.props.prizes[6].image} alt=""/>
                      <div className="text">{this.props.prizes[6].name}</div>
                    </div>
        
                    <div className={`rotate-item rotate-item-5 ${this.state.currentIndex === 5 ? "chosen" : null}`}>
                      <img src={this.props.prizes[5].image} alt=""/>
                      <div className="text">{this.props.prizes[5].name}</div>
                    </div>
        
                    <div className={`rotate-item rotate-item-4 ${this.state.currentIndex === 4 ? "chosen" : null}`}>
                      <img src={this.props.prizes[4].image} alt=""/>
                      <div className="text">{this.props.prizes[4].name}</div>
                    </div>
                  </div>
                </div>

                <div>
                    <button onClick={this.showListDialog}>查看中奖列表</button>
                </div>
            </div>
        );
    }
}