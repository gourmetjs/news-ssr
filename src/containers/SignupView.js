import React, {Component} from "react";
import * as config from "../shared/config";
import CenteredBox from "../components/CenteredBox";
import LoremIpsum from "../components/LoremIpsum";

export default class SignupView extends Component {
  static HEADER = (<h3>Create an account</h3>);
  static FOOTER = (<p>Already have an account? <a href={`${config.LOGIN_URL}`}>Log in instead.</a></p>);

  render() {
    return (
      <CenteredBox header={SignupView.HEADER} footer={SignupView.FOOTER}>
        <LoremIpsum/>
      </CenteredBox>
    );
  }
}
