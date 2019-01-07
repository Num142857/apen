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
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
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
        <View className="item">
          <Text>Feel</Text>
          <View onClick={this.player} className="play-btn">
          {
            playing?
            <Ionicons name="ios-volume-high" size={62} color="#fff" />:
            <Ionicons name="ios-volume-low" size={62} color="#fff" />
          }
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
