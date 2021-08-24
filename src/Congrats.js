import React from "react";

const Congrats = (props) => {
  if (props.success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You guessed the Word!1
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};
export default Congrats;
