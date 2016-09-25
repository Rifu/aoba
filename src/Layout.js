import React, { Component } from 'react';
import './layout.css';
import Player from './Player.js';
import Aoba from './Aoba.js';
const aoba = require('./aoba.png');

class Layout extends Component {
  render() {
    return (
      <div>
        <header className="aoba__header">
          <div className="aoba__headerIcon">

          </div>
          今日も一日がんばるぞい！
        </header>
        <div className="aoba__layout">
          <div className="aoba__candy">
            <Aoba />
            <Player />
            <img src={aoba} />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
