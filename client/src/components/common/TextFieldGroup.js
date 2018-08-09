import React from "react";
import classnames from "classnames";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  info,
  type,
  onChange,
  disabled,
  required
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
