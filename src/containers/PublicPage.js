import React from "react";
import i80, {ActiveRoute} from "@gourmet/react-i80";
import LoginRoute from "./LoginRoute";
import SignupRoute from "./SignupRoute";

i80([
  ["/login", LoginRoute],
  ["/signup", SignupRoute]
]);

export default function PublicPage() {
  return (
    <div className="container">
      <ActiveRoute/>
    </div>
  );
}
