import React, {Component} from "react";
import CenteredBox from "../components/CenteredBox";
import HorzForm from "../components/HorzForm";

export default class LoginView extends Component {
  static HEADER = (<h3>Log in to NewsApp</h3>);
  static FOOTER = (<p>New to NewsApp? <a href="/signup">Create an account.</a></p>);

  usernameRef = React.createRef();
  passwordRef = React.createRef();

  render() {
    return (
      <CenteredBox header={LoginView.HEADER} footer={LoginView.FOOTER}>
        <HorzForm onSubmit={() => this.onSubmit()}>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-3 col-form-label">Username:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="username" name="username"
                placeholder="Username, not email" ref={this.usernameRef} required/>
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
            <div className="offset-sm-3 col-sm-9">
              <button type="submit" className="btn btn-primary">
                Log in
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
      password: this.passwordRef.current.value
    };
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(Error("HAHA"));
      }, 2000);
    });
   }
}
