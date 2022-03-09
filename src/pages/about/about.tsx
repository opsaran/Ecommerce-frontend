import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useEffect, useState } from "react";
import pageInterface from "../../interfaces/pageinterface";

function AboutPage(
  props: pageInterface & RouteComponentProps<any>
): JSX.Element {
  const [message, setMessage] = useState<string>(" ");

  useEffect(() => {
    let number = props.match.params.number;
    if (number) {
      setMessage(`this is the ${number} message`);
    } else {
      setMessage("No number was found");
    }
  }, [props]);

  return (
    <div>
      This is {props.name}
      <br />
      <h2>{message}</h2>
    </div>
  );
}

export default withRouter(AboutPage);
