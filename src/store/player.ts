
import { observable } from 'mobx'

const playerStore = observable({
  playing: false,
  setPlayState(state:boolean){
    console.log(state)
    this.playing = state
  }
})


export default playerStore

