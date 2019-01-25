import React from "react";
import FormInput from "./FormInput";
import FormButton from "./FormButton";

const WIDGETS = {
  "text": FormInput,
  "password": FormInput,
  "submit": FormButton
};

export default function FormItem(props) {
  const {type} = props;
  const Widget = typeof type === "string" ? WIDGETS[type] : type;
  return (
    <div className="form-group row">
      <Widget {...props}/>
    </div>
  );
}
