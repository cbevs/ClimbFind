import React from "react";

const CoordinateErrors = (props) => {
  let index = 0
  const errorItems = props.errors.map(error => {
    index++
    return <li className="coordinates-errors" key={index}>
        {error}
    </li>
  })
  
  return(
    <div className="error-callout">
        <ul>{errorItems}</ul>
      </div>
  )
}

export default CoordinateErrors