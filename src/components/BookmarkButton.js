import React, {Component} from "react";
import cx from "classnames";
import {css} from "emotion";

const cssBookmark = css`
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  &:hover {
    color: #888;
  }
`;

export default class BookmarkButton extends Component {
  render() {
    const {saved, ...props} = this.props;
    return (
      <div {...props}>
        <i className={cx(saved ? "fas" : "far", "fa-bookmark", cssBookmark)}/>
      </div>
    );
  }
}
