import "whatwg-fetch";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from "react";
import i80, {ActiveRoute} from "@gourmet/react-i80";
import {css} from "emotion";
import NewsView from "./NewsView";
import SavedView from "./SavedView";

const cssMain = css`
  max-width: 50em;
  padding: 2em 0;
`;

export default class MainPage extends Component {
  static router = i80([
    ["/", NewsView],
    ["/dashboard", SavedView]
  ]);

  render() {
    return (
      <div className={"container " + cssMain}>
        <ActiveRoute/>
      </div>
    );
  }
}
