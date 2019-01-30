import React, {Component} from "react";

export default class HorzForm extends Component {
  state = {
    isPending: false,
    lastError: null
  };

  componentDidMount() {
    // In our case, maintaining `_isMounted` flag is the best way to handle a case
    // that this component is unmounted by user's `onSubmit` handler.
    // Usually, it is considered as an antipattern: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {children} = this.props;
    const {isPending, lastError} = this.state;
    return (
      <>
        <form onSubmit={e => this.onSubmit(e)} style={{margin: "1.5em 2em 0.5em 2em"}}>
          <fieldset disabled={isPending}>
            {lastError && (
              <div className="form-group row">
                <div className="alert alert-danger" style={{width: "100%"}}>{lastError}</div>
              </div>
            )}
            {children}
          </fieldset>
        </form>
        {isPending && (
          <div className="progress" style={{height: "8px", opacity: "0.65"}}>
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: "100%"}}/>
          </div>
        )}
      </>
    );
  }

  onSubmit(e) {
    const {onSubmit} = this.props;

    e.preventDefault();

    if (this.state.isPending)
      return;

    this.setState({isPending: true});

    Promise.resolve().then(() => {
      return onSubmit();
    }).then(() => {
      if (this._isMounted) {
        this.setState({
          isPending: false,
          lastError: null
        });
      }
    }).catch(err => {
      if (this._isMounted) {
        this.setState({
          isPending: false,
          lastError: err.toString()
        });
      }
    });
  }
}
