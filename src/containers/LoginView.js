import React, {Component} from "react";
import * as config from "../shared/config";
import CenteredBox from "../components/CenteredBox";
import LoremIpsum from "../components/LoremIpsum";

export default class LoginView extends Component {
  static HEADER = (<h3>Log in to NewsApp</h3>);
  static FOOTER = (<p>New to NewsApp? <a href={`${config.SIGNUP_URL}`}>Create an account.</a></p>);

  render() {
    return (
      <CenteredBox header={LoginView.HEADER} footer={LoginView.FOOTER}>
        <LoremIpsum/>
      </CenteredBox>
    );
  }
}
