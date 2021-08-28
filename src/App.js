// import logo from './logo.svg';
// import { useState } from 'react';
import './App.css';
import LuckyBoard from './components/LuckyBoard';

const configuration = {
  startIndex: 0,
  startGemNum: 80,
  gemCost: 20,
  interval: 100,
  prizes: [{
    name: "66矿石",
    weight: 1,
    index: 0,
    image: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ed6a7619934144882d841761b63d3c~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
  },{
    name: "Bug",
    weight: 5,
    index: 1,
    image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a4ce25d48b8405cbf5444b6195928d4~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
  },{
    name: "掘金限量桌垫",
    weight: 1,
    index: 2,
    image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c78f363f41a741ffa11dcc8a92b72407~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
  },{
    name: "Yoyo抱枕",
    weight: 5,
    index: 3,
    image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33f4d465a6a9462f9b1b19b3104c8f91~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
  },{
    name: "Switch",
    weight: 1,
    index: 4,
    image: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4decbd721b2b48098a1ecf879cfca677~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
  },{
    name: "乐高",
    weight: 1,
    index: 5,
    image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aabe49b0d5c741fa8d92ff94cd17cb90~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
  },{
    name: "掘金新款T恤",
    weight: 1,
    index: 6,
    image: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf91038a6384fc3927dee294a38006b~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
  },{
    name: "随机限量徽章",
    weight: 1,
    index: 7,
    image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c68de6368548bd9bd6c8888542f911~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
  }]
};

function App() {
  
  // const [currentIndex, setCurrentIndex] = useState(7);
  
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <LuckyBoard {...configuration}/>
      {/* </header> */}
    </div>
  );
}

export default App;
