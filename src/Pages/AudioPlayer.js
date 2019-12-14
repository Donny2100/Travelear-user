import React, {Component} from  'react';
import './general.css';
import FaHeadphones from "react-icons/lib/fa/headphones";
import ReactJkMusicPlayer from "./AudioPlayer/index.js";
import './audioplayer.css';
//import ReactJkMusicPlayer from "react-jinke-music-player";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.tracks);
  }

  options = {
    defaultPlayIndex: 0,
    theme: "light",
    bounds: "body",
    preload: true,
    glassBg: true,
    remember: false,
    remove: true,
    defaultPosition: {
      top: 300,
      left: 120
    },
    playModeText: {
      order: "Sequence",
      orderLoop: "Repeat All",
      singleLoop: "Repeat One",
      shufflePlay: "Random"
    },
    openText: "Open",
    closeText: "Close",
    checkedText: "Dark",
    unCheckedText: "White",
    notContentText: "No Music Content",
    panelTitle: "Playlist",
    defaultPlayMode: "order",
    mode: "full",
    once: true,
    autoPlay: true,
    toggleMode: false,
    showMiniModeCover: true,
    showMiniProcessBar: false,
    drag: true,
    seeked: true,
    controllerTitle: <FaHeadphones />,
    showProgressLoadBar: true,
    showPlay: true,
    showReload: true,
    showDownload: false,
    showPlayMode: true,
    showThemeSwitch: false,
    extendsContent: [],
    defaultVolume: 100,
    playModeShowTime: 600,
    loadAudioErrorPlayNext: true,
  };
  
  render() {
    let audioLists = [];
    audioLists = this.props.tracks.map(track => {
      return {
        name: track.name,
        singer: track.authorName,
        cover: track.image,
        musicSrc: track.file,
      };
    });
    this.options.audioLists = audioLists;
    console.log(this.options);

    return (
      <div className="audioPlayer">
        <ReactJkMusicPlayer {...this.options} />
        {/* <audio controls className="audio">
            <source 
              src={this.props.src} 
              type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio> */}
      </div>
    );
  };
}

export default AudioPlayer;