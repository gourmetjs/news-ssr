import React, {Component} from "react";
import cx from "classnames";

export default class ErrorBanner extends Component {
  componentDidMount() {
    this._timerId = setTimeout(() => {
      this.props.onClose();
      this._timerId = null;
    }, 15000);
  }

  componentWillUnmount() {
    if (this._timerId) {
      clearTimeout(this._timerId);
      this._timerId = 0;
    }
  }

  render() {
    const {className, error, onClose, ...props} = this.props;
    return (
      <div
        {...props}
        className={cx("alert alert-danger alert-dismissible", className)}
        onClick={onClose}
      >
        {error.toString()}
        <button type="button" className="close">
          <span>&times;</span>
        </button>
      </div>
    );
  }
}
