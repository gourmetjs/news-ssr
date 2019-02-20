import React from "react";
import i80, {ActiveRoute, Link} from "@gourmet/react-i80";
import * as httpApi from "../utils/httpApi";
import TabbedPanes from "../components/TabbedPanes";
import NewsView from "./NewsView";
import SavedView from "./SavedView";

i80([
  ["/", NewsView],
  ["/saved", SavedView]
]);

export default function MainPage({user}) {
  const tabs = [
    <Link className="nav-link" href="/" replace key="news">
      <i className="far fa-newspaper"/>
      &nbsp;
      Latest News Headlines
    </Link>,
    <Link className="nav-link" href="/saved" replace key="news">
      <i className="far fa-bookmark"/>
      &nbsp;
      Saved Articles
    </Link>
  ];

  return (
    <div className="container" style={{padding: "2em 0"}}>
      <div className="border-bottom mb-3 pb-2 text-right">
        Hello {user.name}!
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm ml-3"
          onClick={() => {
            httpApi.post("/api/logout").then(() => {
              i80.goToUrl("/login");
            }).catch(err => {
              console.error(err);
            });
          }}
        >
          Log out
        </button>
      </div>
      <TabbedPanes tabs={tabs}>
        <ActiveRoute/>
      </TabbedPanes>
      <div className="text-muted mt-3">
        * News data from https://newsapi.org
      </div>
    </div>
  );
}
