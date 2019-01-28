import React, {Component} from "react";
import cx from "classnames";

function Input({name, label, placeholder=label, className, classGroup, layout, ...props}) {
  const ctrlId = `form_${name}`;
  return (
    <Group label={label} ctrlId={ctrlId} classGroup={classGroup} layout={layout}>
      <input {...props} id={ctrlId} className={cx(className, "form-control")} placeholder={placeholder}/>
    </Group>
  );
}

function Button({label, className, classGroup, layout, ...props}) {
  return (
    <Group classGroup={classGroup} layout={layout}>
      <button {...props} className={cx(className, "btn btn-primary")}>
        {label}
      </button>
    </Group>
  );
}

function Group({label, ctrlId, classGroup, layout, children}) {
  const labelGrid = `col-${layout.size}-${layout.label}`;   // "col-sm-3"
  const offsetGrid = !label ? `offset-${layout.size}-${layout.label}` : "";  // "offset-sm-3"
  const ctrlGrid = `col-${layout.size}-${layout.ctrl}`; // "col-sm-9"
  return (
    <div className={classGroup}>
      {(label && <label htmlFor={ctrlId} className={cx(labelGrid, "col-form-label")}>{label}</label>)}
      <div className={cx(offsetGrid, ctrlGrid)}>
        {children}
      </div>
    </div>
  );
}

const WIDGETS = {
  "text": Input,
  "password": Input,
  "submit": Button
};

function FormItem(props) {
  const {type} = props;
  const Widget = typeof type === "string" ? WIDGETS[type] : type;
  return (
    <Widget {...props}/>
  );
}

export default class HorzForm extends Component {
  state = {
    isPending: false,
    lastError: null
  };

  componentDidMount() {
    // In our case, maintaining `_isMounted` flag is the best way to handle a case
    // that this component is unmounted by `onSubmit` handler.
    // Usually, it is considered as an antipattern: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {items, classGroup="form-group row", layout={size: "sm", label: 3, ctrl: 9}} = this.props;
    const {isPending, lastError} = this.state;
    return (
      <>
        <form onSubmit={e => this.onSubmit(e)} style={{margin: "1.5em 2em 0.5em 2em"}}>
          <fieldset disabled={isPending}>
            {lastError && (
              <div className={classGroup}>
                <div className="alert alert-danger" style={{width: "100%"}}>{lastError}</div>
              </div>
            )}
            {items.map(item => (
              <FormItem
                {...item}
                classGroup={classGroup}
                layout={layout}
                key={item.name}
              />
            ))}
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
      return new Promise(() => {});
      //return onSubmit({});
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
