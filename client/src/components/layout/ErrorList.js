import React from "react";

const ErrorList = (props) => {
  const errantFields = Object.keys(props.errors);
  if (errantFields.length > 0) {
    let index = 0;
    const listItems = errantFields.map((field) => {
      index++;
      return (
        <li className="errors" key={index}>
           {field} {props.errors[field]}
        </li>
      );
    });
    return (
      <div className="error-callout">
        <ul>{listItems}</ul>
      </div>
    );
  } else {
    return "";
  }
};

export default ErrorList;
