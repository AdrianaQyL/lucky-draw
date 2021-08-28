import { PureComponent } from "react";
import "./Dialog.css"

export default class Dialog extends PureComponent {
    constructor(props) {
        super(props)

        this.clickToClose = this.clickToClose.bind(this)
        this.clickDialog = this.clickDialog.bind(this)
    }

    clickToClose () {
        this.props.onClose()
    }

    clickDialog (e) {
        e.stopPropagation()
    }

    render() {
        let renderKey = 0

        return (
            <div className="background-cover" onClick={this.clickToClose}>
                <div className="dialog" onClick={this.clickDialog}>
                    <div className="header">友情提示</div> 
                    <div>{this.props.discription}</div>
                    <div className="content">
                        {this.props.prize && <div>
                                <img src={this.props.prize.image} alt=""/>
                                <div>{this.props.prize.name}</div>
                            </div>}
                        {this.props.prizeArray && <div>
                                {this.props.prizeArray.map(item => (
                                    <div key={renderKey++}>{item.name}</div>
                                ))}
                                {this.props.prizeArray.length === 0 && <div>您还没有获得奖品</div>}
                            </div>}
                    </div>
                    <div className="foot">
                        <button onClick={this.clickToClose}>我知道了</button>
                    </div>
                </div>
            </div>
        );
    }
}