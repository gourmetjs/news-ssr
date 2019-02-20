import React, {Component} from "react";
import i80 from "@gourmet/react-i80";
import CenteredBox from "../components/CenteredBox";
import HorzForm from "../components/HorzForm";
import httpApi from "../utils/httpApi";

export default class SignupView extends Component {
  static HEADER = (<h3>Create an account</h3>);
  static FOOTER = (<p>Already have an account? <a href="/login">Log in instead.</a></p>);

  nameRef = React.createRef();
  usernameRef = React.createRef();
  passwordRef = React.createRef();
  verifyRef = React.createRef();

  render() {
    return (
      <CenteredBox header={SignupView.HEADER} footer={SignupView.FOOTER}>
        <HorzForm onSubmit={() => this.onSubmit()}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">Name:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="name" name="name"
                placeholder="Your name" ref={this.nameRef} required
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-3 col-form-label">Username:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="username" name="username"
                placeholder="Username, not email" ref={this.usernameRef}
                required pattern="[A-Za-z0-9._-]{2,20}"
                title="Only letters, numbers, dots, dashes and underscores / min 2 characters"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">Password:</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="password" name="password"
                placeholder="Password" ref={this.passwordRef} required/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="verify" className="col-sm-3 col-form-label">Verify:</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="verify" name="verify"
                placeholder="Type in password again" ref={this.verifyRef} required/>
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-3 col-sm-9">
              <button type="submit" className="btn btn-primary">
                Create an account
              </button>
            </div>
          </div>
        </HorzForm>
      </CenteredBox>
    );
  }

  onSubmit() {
    const name = this.nameRef.current.value.trim();
    const username = this.usernameRef.current.value.toLowerCase().trim();
    const password = this.passwordRef.current.value.trim();
    const verify = this.verifyRef.current.value.trim();

    if (password !== verify)
      throw Error("Two passwords don't match");

    return httpApi("/api/signup", {
      method: "POST",
      body: {name, username, password}
    }).then(() => {
      i80.goToUrl("/");
    });
  }
}
