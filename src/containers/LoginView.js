import React, {Component} from "react";
import FormBox from "../components/FormBox";

export default class LoginView extends Component {
  render() {
    return (
      <FormBox
        title="Please login"
        items={[{
          name: "username",
          label: "Username",
          type: "text",
          required: true
        }, {
          name: "password",
          label: "Password",
          type: "password",
          required: true
        }, {
          name: "submit",
          type: "submit",
          label: "Log in"
        }]}
      />
    );
  }
}
