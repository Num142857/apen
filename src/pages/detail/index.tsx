import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { Ionicons } from "taro-icons";
import "./index.less";
import "taro-icons/scss/Ionicons.scss"; // 131KB

type PageStateProps = {
  playerStore: {
    playing: boolean,
    setPlayState: Function
  }
}

interface Index {
  props: PageStateProps;
}
@inject("playerStore")
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: "详情"
  };

  componentWillMount() {}

  componentWillReact() {
    console.log("componentWillRect");
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getTTS(word:string):string{
    return `https://fanyi.baidu.com/gettts?lan=en&text=${word}`
  }

  player() {
    const { playerStore } = this.props
    const innerAudioContext = Taro.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    innerAudioContext.src = this.getTTS('word')

    innerAudioContext.onPlay(()=>{
      playerStore.setPlayState(true)
    })
    innerAudioContext.onEnded(()=>{
      playerStore.setPlayState(false)
    })
  }

  render() {
    const { playerStore: { playing } } = this.props
    console.log(playing)
    return (
      <View className="index">

      </View>
    );
  }
}

export default Index;
