import React from "react";
import i80, {ActiveRoute} from "@gourmet/react-i80";
import NewsView from "./NewsView";
import SavedView from "./SavedView";

i80([
  ["/", NewsView],
  ["/saved", SavedView]
]);

export default function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
      <ActiveRoute/>
    </div>
  );
}
