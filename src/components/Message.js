import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

export function AlertDismissible({input}) {
  const [show, setShow] = useState(true);
  const message = input;

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <p>{message}</p>
      </Alert>
    );
  }
  return null;
}
