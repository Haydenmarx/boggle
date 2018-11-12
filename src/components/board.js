import React, { Component } from "react";
import Square from "./square";

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
      squares: [
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false },
        { clicked: false }
      ],
      score: 0,
      currentWord: [],
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
  toggleClicked = index => {
    if (this.state.currentWord.length === 0) {
      this.toggleIndex(index);
      this.addLetterToCurrentWord(index);
      //add index to current word
    } else if (
      this.state.squares[index].clicked &&
      this.state.currentWord[this.state.currentWord.length - 1] === index
    ) {
      this.toggleIndex(index);
      //toggle square
      this.removeLetterFromCurrentWord();
      //remove index from current word
    } else if (!this.state.squares[index].clicked) {
      const lastLetter = this.state.currentWord[
        this.state.currentWord.length - 1
      ];
      console.log("lastLetter:", lastLetter, index);
      if (this.isAdjacent(this.getCoords(lastLetter), this.getCoords(index))) {
        this.toggleIndex(index);
        //toggle it
        this.addLetterToCurrentWord(index);
        //add index to currentWord array
      }
    }

    //check if tile has been clicked

    //toggle if this.state.word[this.state.word.length-1] === index
    //if it hasn't been clicked and is next to the letter
    //toggle it
  };

  isAdjacent = (a, b) => {
    console.log(a, b);
    return (
      Math.abs(a.row - b.row) < 2 &&
      Math.abs(a.column - b.column) < 2 &&
      (a.row !== b.row || a.column !== b.column)
    );
  };
  getCoords = index => {
    let coords = {};
    coords.row = Math.floor(index / 4);
    coords.column = index % 4;
    return coords;
  };
  toggleIndex = index => {
    let updated = this.state.squares.slice();
    updated[index] = { clicked: !this.state.squares[index].clicked };
    this.setState({ squares: updated });
  };
  addLetterToCurrentWord = index => {
    let updated = this.state.currentWord.slice();
    updated.push(index);
    this.setState({ currentWord: updated });
  };
  removeLetterFromCurrentWord = () => {
    let updated = this.state.currentWord.slice();
    updated.pop();
    this.setState({ currentWord: updated });
  };
  componentDidMount() {
    this.randomize();
  }
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              {this.state.board.slice(0, 4).map((letter, index) => {
                return (
                  <td key={index}>
                    <Square
                      clicked={this.state.squares[index].clicked}
                      toggleClicked={() => {
                        // console.log("clicked");
                        this.toggleClicked(index);
                      }}
                      letter={letter}
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              {this.state.board.slice(4, 8).map((letter, index) => {
                return (
                  <td key={index + 4}>
                    <Square
                      clicked={this.state.squares[index + 4].clicked}
                      toggleClicked={() => {
                        console.log(index + 4);
                        this.toggleClicked(index + 4);
                      }}
                      letter={letter}
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              {this.state.board.slice(8, 12).map((letter, index) => {
                return (
                  <td key={index}>
                    <Square
                      clicked={this.state.squares[index + 8].clicked}
                      toggleClicked={() => {
                        console.log(index + 8);
                        this.toggleClicked(index + 8);
                      }}
                      letter={letter}
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              {this.state.board.slice(12).map((letter, index) => {
                return (
                  <td key={index}>
                    <Square
                      clicked={this.state.squares[index + 12].clicked}
                      toggleClicked={() => {
                        this.toggleClicked(index + 12);
                      }}
                      letter={letter}
                    />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <p>
          Current Word:
          {this.state.currentWord.map(index => {
            return <span>{this.state.board[index]}</span>;
          })}
        </p>
      </div>
    );
  }
}

export default Board;
