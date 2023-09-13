import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ddc0e7",
    color: "#000000", // Black color for text
    padding: theme.spacing(2),
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
    height: "5vh",
  },
}));

export const CopyrightFooter = () => {
  const classes = useStyles();

  // Replace 'Your Company Name' with your actual company name and adjust the copyright year accordingly
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.root}>
      <Typography variant="body2" component="p">
        &copy; {currentYear} Elements. All rights reserved.
      </Typography>
    </footer>
  );
};
