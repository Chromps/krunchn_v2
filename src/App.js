import React, { Component } from 'react';
import './App.min.css'
import axios from 'axios';



class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      stories: [],
      animation: true
    }
  }
  componentWillMount(){

    axios.get("http://feedstore.kmworks.com/cgi-bin/getItemsZ.php")
      .then(({ data }) => {
        this.setState({
          stories: data
        })
        document.querySelector('.all_stories').classList.add("scroller_animation");
        console.log("success")
      })
      .catch((err) => {
        console.log(err)
      })

  }
  playPauseHandler(){
    const { animation } = this.state;
    const box = document.querySelector(".all_stories");
    this.setState({animation: !this.state.animation})
    animation ? box.classList.add("is_paused") : box.classList.remove("is_paused")
    console.log(animation)

  }
  render() {
    const { stories, animation } = this.state;
    return (
      <div className="App">
        <div>
          <span>Krunch'n</span>
          <button onClick={() => {this.playPauseHandler()}}>{animation ? "Pause" : "Play"}</button>
          <div className="story_container">
            <div className="all_stories">

              {stories.map((story, index) => {
                return (
                  <div className="story" key={index}>
                    {story.title}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
