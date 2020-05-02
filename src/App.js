import React from "react";
import { notification } from "antd";
import Router from "./router";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import youtube from "./api/youtube";
import { SmileOutlined, SearchOutlined } from "@ant-design/icons";
import "./App.css";

import dotenv from "dotenv";
dotenv.config();

const API_KEY = "AIzaSyC8xg18KeoWKv9WuVKlXn-GdAz4jmgiSQQ";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      search: true,
      selectedVideo: {},
    };

    this.welcome();
  }

  welcome = () => {
    notification.open({
      message: "Hey nice to see you here",
      description: "Let us start by searching for some videos",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  // videoSearch( term ) {

  //       if( this.state.search ) {
  //         console.log(term)
  //         console.log("API_KEY",API_KEY)
  //         searchYoutube({ API_KEY,term }, (data) => {
  //           console.log(data)
  //                try {
  //                    if( data && data.data && data.data.error.message ) {
  //                        console.log(data);
  //                        throw ('error')
  //                    }
  //                    this.setState({ videos: data, selectedVideo: data[0] });
  //                    console.log( this.state.videos );
  //                } catch( err ){
  //                    notification['error']({
  //                        message: "Daily Limit Exceeded",
  //                        description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then.",
  //                    })
  //                }

  //            });
  //        }

  // }

  videoSearch = async (termFromSearchBar) => {
    console.log(termFromSearchBar);
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
        part: "snippet",
        maxResults: 5,
        key: API_KEY,
      },
    });
    console.log(response);
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  handleChange = (value) => {
    setTimeout(() => {
      if (value === "") {
        this.setState({ videos: [], selectedVideo: null });
        return;
      }

      if (this.state.search) {
        this.videoSearch(value);
      }

      setTimeout(() => {
        this.setState({ search: true });
      }, 5000);
    }, 2000);
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#123456",
          }}
        >
          <h1
            style={{
              color: "#fff",
              alignSelf: "center",
              flexBasis: "4",
              paddingTop: "20px",
              paddingLeft: "30px",
            }}
          >
            Edura Tasks <SearchOutlined />
          </h1>
          <SearchBar
            videos={this.state.videos}
            video={this.state.selectedVideo}
            onChange={this.handleChange}
            handleSearch={(video) => {
              this.setState({
                selectedVideo: this.state.videos[video],
                search: false,
              });
            }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
            videos={this.state.videos}
            onVideoSelect={(userSelected) => {
              this.setState({ selectedVideo: this.state.videos[userSelected] });
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
