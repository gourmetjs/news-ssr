import React, {Component} from "react";
import FormItem from "./FormItem";

export default class FormBox extends Component {
  render() {
    const {title, items, data, errors} = this.props;
    const {isPending} = this.state;
    return (
      <div className="row">
        <div className="card">
          <div className="card-header">
            {title}
          </div>
          <div className="card-body">
            <form>
              <fieldset disabled={isPending}>
                {errors && errors["*"] && (
                  <FormItem width="12">
                    <div className="alert alert-danger">{errors["*"]}</div>
                  </FormItem>
                )}
                {items.map(item => {
                  const {name} = item;
                  return (
                    <FormItem {...items} data={data && data[name]} error={errors && errors[name]} key={name}/>
                  );
                })}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
