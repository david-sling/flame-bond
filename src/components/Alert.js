import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
export default function Alert({ onClose, severity, children, open }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity}
      >
        {children}
      </MuiAlert>
    </Snackbar>
  );
}
