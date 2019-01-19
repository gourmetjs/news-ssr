import React, {Component} from "react";
import i80, {ActiveRoute, Link} from "@gourmet/react-i80";
import {css} from "emotion";
import TabbedPanes from "./components/TabbedPanes";
import NewsView from "./NewsView";
import SavedView from "./SavedView";

const cssMain = css`
  max-width: 60em;
  padding: 2em 0;
`;

export default class MainPage extends Component {
  static router = i80([
    ["/", NewsView],
    ["/saved", SavedView]
  ]);

  render() {
    const tabs = [
      <Link className="nav-link" href="/" replace>
        Latest News Headlines
      </Link>,
      <Link className="nav-link" href="/saved" replace>
        Saved Articles
      </Link>
    ];
    return (
      <div className={"container " + cssMain}>
        <TabbedPanes tabs={tabs}>
          <ActiveRoute/>
        </TabbedPanes>
      </div>
    );
  }
}
