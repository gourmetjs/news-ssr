import React, {Component} from "react";
import CenteredBox from "../components/CenteredBox";
import HorzForm from "../components/HorzForm";

export default class LoginView extends Component {
  render() {
    return (
      <CenteredBox
        header={<h3>Log in to NewsApp</h3>}
        footer={<p>New to NewsApp? <a href="/signup">Create an account.</a></p>}
      >
        <HorzForm
          items={[{
            type: "text",
            name: "username",
            label: "Username",
            placeholder: "Username, not email",
            required: true
          }, {
            type: "password",
            name: "password",
            label: "Password",
            required: true
          }, {
            type: "submit",
            name: "submit",
            label: "Log in"
          }]}
        />
      </CenteredBox>
    );
  }
}
