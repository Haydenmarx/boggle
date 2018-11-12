import React, { Component } from "react";

const dice = [
  ["A", "A", "E", "E", "G", "N"],
  ["A", "B", "B", "J", "O", "O"],
  ["A", "C", "H", "O", "P", "S"],
  ["A", "C", "H", "O", "P", "S"],
  ["A", "O", "O", "T", "T", "W"],
  ["C", "I", "M", "O", "T", "U"],
  ["D", "E", "I", "L", "R", "X"],
  ["D", "E", "L", "R", "V", "Y"],
  ["D", "I", "S", "T", "T", "Y"],
  ["E", "E", "G", "H", "N", "W"],
  ["E", "E", "I", "N", "S", "U"],
  ["E", "H", "R", "T", "V", "W"],
  ["E", "I", "O", "S", "S", "T"],
  ["E", "L", "R", "T", "T", "Y"],
  ["H", "I", "M", "N", "U", "Qu"],
  ["H", "L", "N", "N", "R", "Z"]
];

class Board extends Component {
  constructor() {
    super();
    this.state = {
      board: [],
      score: 0,
      currentWord: "",
      words: []
    };
  }
  randomize = () => {
    let board = dice.map(die => this.randomizeItem(die, true));
    this.randomizeRow(board);
    this.setState({ board });
  };
  randomizeRow = arr => {
    let newArr = arr.slice();
    let result = [];
    let found;
    while (newArr.length > 0) {
      found = Math.floor(Math.random() * newArr.length);
      result.push(newArr[found]);
      newArr.splice(found, 1);
    }
    return result;
  };
  randomizeItem = arr => {
    let newArr = arr.slice();
    const found = Math.floor(Math.random() * newArr.length);
    return newArr[found];
  };
  componentDidMount() {
    this.randomize();
  }
  render() {
    return (
      <table>
        <tbody>
          <tr>
            {this.state.board.map((letter, index) => {
              return (
                <td key={index}>
                  <button>{letter}</button>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Board;
