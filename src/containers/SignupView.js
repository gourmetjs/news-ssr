import React, {Component} from "react";
import CenteredBox from "../components/CenteredBox";
import HorzForm from "../components/HorzForm";

export default class SignupView extends Component {
  static HEADER = (<h3>Create an account</h3>);
  static FOOTER = (<p>Already have an account? <a href="/login">Log in instead.</a></p>);

  usernameRef = React.createRef();
  passwordRef = React.createRef();
  verifyRef = React.createRef();

  render() {
    return (
      <CenteredBox header={SignupView.HEADER} footer={SignupView.FOOTER}>
        <HorzForm onSubmit={() => this.onSubmit()}>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-3 col-form-label">Username:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="username" name="username"
                placeholder="Username, not email" ref={this.usernameRef}
                required pattern="[A-Za-z0-9._-]{5,20}"
                title="Combination of letters, numbers, dots, dashes and underscores / min 5 characters"
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
    const data = {
      username: this.usernameRef.current.value,
      password: this.passwordRef.current.value,
      verify: this.verifyRef.current.value
    };

    if (data.password !== data.verify)
      throw Error("Two passwords don't match");
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(Error("HAHA"));
      }, 2000);
    });
  }
}
