import React from "react";

function index(props: string): JSX.Element {
  return (
    <div>
      loading.. <span>{props}</span>
    </div>
  );
}

export default index;
