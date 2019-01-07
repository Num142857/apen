
import { observable } from 'mobx'
import words from "@data/word";
// words.length = 10
words.forEach(element => {
  element.playing = false
});

const playerStore = observable({
  words: words,
  updateKey:0,
  setPlayState:function(index,state){
    let item = this.words[index];
    item.playing = state
    this.words[index] = item;
    this.updateKey = Math.random();
    console.log(this.words[index].playing,this.updateKey)
  }
})

export default playerStore

