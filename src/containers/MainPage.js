import React from "react";
import i80, {ActiveRoute} from "@gourmet/react-i80";
import * as httpApi from "../utils/httpApi";
import NewsView from "./NewsView";
import SavedView from "./SavedView";

i80([
  ["/", NewsView],
  ["/saved", SavedView]
]);

export default function MainPage({user}) {
  return (
    <div className="container" style={{padding: "2em 0"}}>
      <div className="border-bottom mb-3 pb-2 text-right">
        Hello {user.name}!
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm ml-3"
          onClick={() => {
            httpApi.post("/api/logout").then(() => {
              window.location = "/login";
            }).catch(err => {
              console.error(err);
            });
          }}
        >
          Log out
        </button>
      </div>
      <ActiveRoute/>
    </div>
  );
}
