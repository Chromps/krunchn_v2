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

    axios.get("http://127.0.0.1:8080/krtest")
      .then(({ data }) => {
        this.setState({
          stories: data
        })

        document.querySelector('.all_stories').classList.add("scroller_animation");
        document.querySelector('.all_stories').style.animationDuration = `${this.state.stories.length}s`;
        console.log(this.state.stories.length, "stories");
        console.log("success")
      })
      .catch((err) => {
        console.log(err);
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
          <div className="header">
            <div className="logo">
              Krunch'N
            </div>
            <div>
              Welcome, {this.state.userName}
            </div>
          </div>
          <button className="btn playPause"
             onClick={() => {this.playPauseHandler()}}>
             {animation ? "Pause" : "Play"}
           </button>
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
