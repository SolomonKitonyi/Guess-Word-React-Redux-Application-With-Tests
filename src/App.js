import React from "react";
import GuessedWords from "./Guessedwords";
import Congrats from "./Congrats";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessedWords
        guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]}
      />
    </div>
  );
};

export default App;
