import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../test/testUtils";

import GuessedWords from "./Guessedwords";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test("Does not throw warnings given expected props", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("If there are no words Guessed", () => {});

describe("If there are words Guessed", () => {});
