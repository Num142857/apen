import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { Ionicons } from "taro-icons";
import "./index.less";
import "taro-icons/scss/Ionicons.scss"; // 131KB
type words = {
  word: string;
  desc:string;
  playing: boolean;
};

type PageStateProps = {
  playerStore: {
    words: [words];
    updateKey:number;
    setPlayState: Function;
  };
};

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

  getTTS(word: string): string {
    return `https://fanyi.baidu.com/gettts?lan=en&text=${word}`;
  }

  redirectTo(path: string) {
    Taro.redirectTo({
      url: path
    });
  }
  player(item: words, index: number) {
    console.log(item);
    const { playerStore } = this.props;
    const innerAudioContext = Taro.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    innerAudioContext.src = this.getTTS(item.word);

    innerAudioContext.onPlay(() => {
      playerStore.setPlayState(index, true);
    });
    innerAudioContext.onEnded(() => {
      playerStore.setPlayState(index, false);
    });
  }

  render() {
    const {
      playerStore: { words ,updateKey}
    } = this.props;
    return (
      <View className="index">
      <Text className="updateKey">{updateKey}</Text>
        {words.map((item, index) => {
          return (
            <View key={item.word} className="item">
            <View className="text">
              <Text className="word" onClick={this.redirectTo.bind(this, "/pages/detail/index")}>
              {item.word}
              </Text>
              <Text className="desc">{item.desc}</Text>
            </View>
              <View
                onClick={this.player.bind(this, item, index)}
                className="play-btn"
              >
                {item.playing ? (
                  <Ionicons name="ios-volume-high" size={62} color="#fff" />
                ) : (
                  <Ionicons name="ios-volume-low" size={62} color="#fff" />
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default Index;
