import React, {Component} from "react";
import CenteredBox from "../components/CenteredBox";
import HorzForm from "../components/HorzForm";

export default class LoginView extends Component {
  render() {
    return (
      <CenteredBox
        header={<h3>Create an account</h3>}
        footer={<p>Already have an account? <a href="/login">Log in instead.</a></p>}
      >
        <HorzForm
          items={[{
            type: "text",
            name: "username",
            label: "Username",
            placeholder: "Username, not email",
            required: true,
            pattern: "[A-Za-z0-9._-]{5,20}",
            title: "combination of letters, numbers, dots, dashes and underscores / min 5 characters"

          }, {
            type: "password",
            name: "password",
            label: "Password",
            required: true
          }, {
            type: "password",
            name: "verify",
            label: "Verify",
            placeholder: "Type in password again",
            required: true
          }, {
            type: "submit",
            name: "submit",
            label: "Create an account"
          }]}
        />
      </CenteredBox>
    );
  }
}
