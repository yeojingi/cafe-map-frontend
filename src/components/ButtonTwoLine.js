import { Button } from "@mui/material";

import "./ButtonTwoLine.css"

const ButtonTwoLine = ({text, onClick}) => {
  return (
    <div id="button-container">
      <Button id="button" onClick={onClick}>{text}</Button>
      <div id="second-layer"></div>
    </div>
  );
}

export default ButtonTwoLine;