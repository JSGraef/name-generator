import React, { Component } from 'react';
import './App.css';
import { names } from './Names';

class App extends Component {
  constructor() {
    super();
    this.state = { name: this.createNewName(), rejected: [] }
  }

  getFirstName = (seed) => {
    return names.firsts[Math.floor((Math.random() * seed) % names.firsts.length)]
  }

  getLastName = (seed) => {
    return names.lasts[Math.floor((Math.random() * seed) % names.lasts.length)]
  }

  getFirstNameCat = (seed) => {
    return names.catFirsts[
      Math.floor((Math.random() * seed) % names.catFirsts.length)
    ]
  }

  getLastNameCat = (seed) => {
    return names.catLasts[
      Math.floor((Math.random() * seed) % names.catLasts.length)
    ]
  }

  getSuffix = (seed) => {
    if (Math.floor((Math.random() * seed) % 12) === 0) {
      return names.suffixes[Math.floor((Math.random() * seed) % names.suffixes.length)]
    }
    return null
  }

  createNewName = (cat = false) => {
    var time = new Date().getTime()
    if (cat) {
      return {
        first: this.getFirstNameCat(time),
        last: this.getLastNameCat(time),
        suffix: this.getSuffix(time)
      }
    } else {
      return {
        first: this.getFirstName(time),
        last: this.getLastName(time),
        suffix: this.getSuffix(time)
      }
    }
  }

  newName = (cat = false) => {
    let { rejected } = this.state
    rejected.unshift(this.state.name)
    rejected = rejected.slice(0, 10)
    this.setState({ name: this.createNewName(cat), rejected })
  }

  render() {
    const { name } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Name Generator</h1>
        </header>
        <div className="mainName">
          <h1 className="name">
            {`${name.first} ${name.last} ${name.suffix || ""}`}
          </h1>
          <p><button className="newNameButton" onClick={() => this.newName(false)}>New Name</button>
            <button className="newNameButton" onClick={() => this.newName(true)}>New Cat Name</button></p>
        </div>
        <hr />
        <div className="rejectedNames">
          <h3>{this.state.rejected.length > 0 ? "Last 10 Rejected Names:" : ""}</h3>
          {this.state.rejected.map(rn => {
            const n = `${rn.first} ${rn.last} ${rn.suffix || ""}`
            return <p key={n}>{n}</p>
          })}
        </div>
      </div>
    );
  }
}
export default App;
