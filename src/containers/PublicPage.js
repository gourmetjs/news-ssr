import React, {Component} from "react";
import i80, {ActiveRoute} from "@gourmet/react-i80";
import {css} from "emotion";
import LoginView from "./LoginView";
import SignupView from "./SignupView";

const cssMain = css`
  max-width: 60em;
  padding: 2em 0;
`;

export default class PublicPage extends Component {
  static router = i80([
    ["/login", LoginView],
    ["/signup", SignupView]
  ]);

  render() {
    return (
      <div className={"container " + cssMain}>
        <ActiveRoute/>
      </div>
    );
  }
}
