import React, {Component} from "react";
import i80, {ActiveRoute, Link} from "@gourmet/react-i80";
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
    const tabs = [
      <Link className="nav-link" href="/" replace>
        <i className="far fa-newspaper"/>
        &nbsp;
        Latest News Headlines
      </Link>,
      <Link className="nav-link" href="/saved" replace>
        <i className="far fa-bookmark"/>
        &nbsp;
        Saved Articles
      </Link>
    ];
    return (
      <div className={"container " + cssMain}>
        <TabbedPanes tabs={tabs}>
          <ActiveRoute/>
        </TabbedPanes>
        <div className="text-muted mt-3">
          * News data from https://newsapi.org
        </div>
      </div>
    );
  }
}
