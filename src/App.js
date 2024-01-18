import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {
    progress : 10
  }
  setProgress = async(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <div>
          <LoadingBar
            height={3}
            color='#63C9FF'
            progress={this.state.progress}
          />
         </div> 
        <Routes>
          <Route exact path="/general" element={<News key="general" pageSize={9} setProgress={this.setProgress} country="in" category="general"/>}></Route>
          <Route exact path="/business" element={<News key="business" pageSize={9} setProgress={this.setProgress} country="in" category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={9} setProgress={this.setProgress} country="in" category="entertainment"/>}></Route>
          <Route exact path="/health" element={<News key="health" pageSize={9} setProgress={this.setProgress} country="in" category="health"/>}></Route>
          <Route exact path="/science" element={<News key="science" pageSize={9} setProgress={this.setProgress} country="in" category="science"/>}></Route>
          <Route exact path="/sports" element={<News key="sports" pageSize={9} setProgress={this.setProgress} country="in" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News key="technology" pageSize={9} setProgress={this.setProgress} country="in" category="technology"/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

