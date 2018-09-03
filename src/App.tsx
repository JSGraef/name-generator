import * as React from 'react';
import './App.css';
import { names } from './Names';

interface IName {
  first: string,
  last: string,
  suffix: string,
}

interface IState {
  name: IName,
  rejected: IName[],
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      name: this.createNewName("human"),
      rejected: []
    }
  }

  getFirstName = (seed: number, which: string) => {
    return names[which][Math.floor((Math.random() * seed) % names[which].length)]
  }

  getLastName = (seed: number, which: string) => {
    return names[which][Math.floor((Math.random() * seed) % names[which].length)]
  }

  getSuffix = (seed: number) => {
    if (Math.floor((Math.random() * seed) % 12) === 0) {
      return names.suffixes[Math.floor((Math.random() * seed) % names.suffixes.length)]
    }
    return ""
  }

  newName = (which: string) => {
    let { rejected } = this.state
    rejected.unshift(this.state.name)
    rejected = rejected.slice(0, 10)
    this.setState({ name: this.createNewName(which), rejected })
  }

  createNewName = (which: string) => {
    const time = new Date().getTime()
    let firsts = "firsts"
    let lasts = "lasts"

    switch (which) {
      case "cat":
        firsts = "catFirsts"
        lasts = "catLasts"
        break;

      case "dog":
        firsts = "dogFirsts"
        lasts = "dogLasts"
        break;

      case "human":
      default:
        firsts = "firsts"
        lasts = "lasts"
        break;
    }

    const name: IName = {
      first: this.getFirstName(time, firsts),
      last: this.getLastName(time, lasts),
      suffix: this.getSuffix(time)
    }

    return name
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
          <p><button className="newNameButton" onClick={() => this.newName("human")}>New Name</button>
            <button className="newNameButton" onClick={() => this.newName("cat")}>New Cat Name</button>
            <button className="newNameButton" onClick={() => this.newName("dog")}>New Dog Name</button></p>
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
