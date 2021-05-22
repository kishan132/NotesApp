import React from "react";
import * as Yup from "yup";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoteRoundedIcon from "@material-ui/icons/NoteRounded";
import { makeStyles } from "@material-ui/core/styles";

import BackButton from "../../components/BackButton/BackButton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto"
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.8, 3)
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2.6, 2)
    },
    borderRadius: theme.spacing(0.75),
    textAlign: "center"
  },
  box: {
    margin: theme.spacing(3, 4),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2.8, 2.8)
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2.6, 1.5)
    }
  },
  typography: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary
  },
  agree: {
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(1.74)
  },
  icon: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  noteIcon: {
    fontSize: theme.spacing(6),
    color: "#3f51b5"
  },
  submitBtn: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  }
}));

const Note = (props) => {
  const classes = useStyles();

  const { initialValues, handleSubmit, edit } = props;

  return (
    <Box className={classes.root}>
      <Container>
        <BackButton link="/notes" text="Back To Notes" />

        <Paper className={classes.paper} variant="outlined">
          <NoteRoundedIcon className={classes.noteIcon} />

          <Typography className={classes.typography} variant="h5">
            <b>{edit ? "Update Note" : "Create a Note"}</b>
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              title: Yup.string(),
              note: Yup.string().required("Required")
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                handleSubmit(values);
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting, values, errors }) => (
              <Form>
                <Box className={classes.box}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    name="title"
                    type="text"
                    label="Title"
                    multiline
                    rows={2}
                    autoComplete="off"
                    fullWidth
                  />
                </Box>

                <Box className={classes.box}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    name="note"
                    type="text"
                    label="Note"
                    multiline
                    rows={6}
                    autoComplete="off"
                    fullWidth
                  />
                </Box>

                <Box className={clsx(classes.box, classes.submitBtn)}>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={
                      isSubmitting || errors.note || errors.title ? true : false
                    }
                    onClick={submitForm}
                    disableElevation
                  >
                    {isSubmitting ? (
                      <>
                        {edit ? "Updating... " : "Creating... "}
                        <CircularProgress size={16} className={classes.icon} />
                      </>
                    ) : edit ? (
                      "Update Note"
                    ) : (
                      "Create A Note"
                    )}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
};

export default Note;
