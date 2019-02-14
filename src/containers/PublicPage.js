import React from "react";
import i80, {ActiveRoute} from "@gourmet/react-i80";
import LoginView from "./LoginView";
import SignupView from "./SignupView";

i80([
  ["/login", LoginView],
  ["/signup", SignupView]
]);

export default function PublicPage() {
  return (
    <div>
      <h1>Public Page</h1>
      <ActiveRoute/>
    </div>
  );
}
