import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./App.css";

function App() {
  const emptyForm = { firstName: "", lastName: "", email: "", password: "" };
  const strRegex = /^[a-zA-Z ]+$/;
  const pwdRegexes = [/[A-Z]+/, /[0-9]+/, /[*@#$%]+/, /.{8}/];

  const [message, setMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formDetails, setFormDetails] = useState(emptyForm);
  const [formControls, setFormControls] = useState(emptyForm);
  const [table, setTable] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const regexCompare = (str, regexArr) => {
    for (let i = 0; i < regexArr.length; i++)
      if (!str.match(regexArr[i])) return false;
    return true;
  };

  const upsertTable = (formDetails) => {
    if (editIndex === null) setTable((p) => [...p, formDetails]);
    else {
      setTable((p) => [
        ...p.slice(0, editIndex),
        formDetails,
        ...p.slice(editIndex + 1),
      ]);
      setEditIndex(null);
    }
  };

  const deleteForm = (index) => {
    setTable((p) => p.filter((_, idx) => idx !== index));
  };

  const handleInputChange = (e) => {
    const key = e.target.id;
    let value = e.target.value;

    if (key === "firstName" || key === "lastName") {
      if (value === "")
        setFormControls((f) => ({ ...f, [key]: "Cannot be empty" }));
      else if (!value.match(strRegex))
        setFormControls((f) => ({ ...f, [key]: "Cannot have numbers" }));
      else setFormControls((f) => ({ ...f, [key]: "" }));
    } else if (key === "email") {
      if (value === "")
        setFormControls((f) => ({ ...f, [key]: "Cannot be empty" }));
      else setFormControls((f) => ({ ...f, [key]: "" }));
    } else if (key === "password") {
      if (value === "")
        setFormControls((f) => ({ ...f, [key]: "Cannot be empty" }));
      else if (!regexCompare(value, pwdRegexes))
        setFormControls((f) => ({ ...f, [key]: "Conditions not met" }));
      else setFormControls((f) => ({ ...f, [key]: "" }));
    }

    setFormDetails((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = formDetails["firstName"].trim();
    const lastName = formDetails["lastName"].trim();
    const email = formDetails["email"].trim();
    const password = formDetails["password"];

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setMessage("Please fill out the form");
      setDialogOpen(true);
    } else if (!firstName.match(strRegex) || !lastName.match(strRegex)) {
      setMessage("First name or last name invalid");
      setDialogOpen(true);
    } else if (!regexCompare(password, pwdRegexes)) {
      setMessage("Password invalid");
      setDialogOpen(true);
    } else {
      upsertTable(formDetails);
      setFormDetails(emptyForm);
    }
  };

  return (
    <>
      <Container
        component="form"
        maxWidth="sm"
        sx={{ my: 4 }}
        onSubmit={handleSubmit}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={formControls["firstName"] !== ""}
                helperText={formControls["firstName"]}
                required
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                variant="outlined"
                type="text"
                onChange={handleInputChange}
                value={formDetails["firstName"]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={formControls["lastName"] !== ""}
                helperText={formControls["lastName"]}
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                variant="outlined"
                type="text"
                onChange={handleInputChange}
                value={formDetails["lastName"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={formControls["email"] !== ""}
                helperText={formControls["email"]}
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                type="email"
                onChange={handleInputChange}
                value={formDetails["email"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={formControls["password"] !== ""}
                helperText={formControls["password"]}
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                type="password"
                onChange={handleInputChange}
                value={formDetails["password"]}
              />
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ my: { xs: 1 }, p: { xs: 2 } }}>
                <Typography variant="h6" component="div">
                  Password should have atleast:
                </Typography>
                <List dense={true}>
                  <ListItem>
                    <ListItemIcon>
                      <Close />
                    </ListItemIcon>
                    <ListItemText primary="1 Capital letter" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Close />
                    </ListItemIcon>
                    <ListItemText primary="1 number" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Close />
                    </ListItemIcon>
                    <ListItemText primary="1 of these special characters '*, @, #, $, %'" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Close />
                    </ListItemIcon>
                    <ListItemText primary="8 characters long" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <TableContainer component={Container} maxWidth="md">
        <Table size="small" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {table.map((f, idx) => (
              <TableRow
                key={`tableRow#${idx}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{f["firstName"]}</TableCell>
                <TableCell>{f["lastName"]}</TableCell>
                <TableCell>{f["email"]}</TableCell>
                <TableCell>{f["password"]}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setEditIndex(idx);
                      setFormDetails(table[idx]);
                    }}
                  >
                    <Edit />
                  </IconButton>{" "}
                  <IconButton
                    onClick={() => {
                      deleteForm(idx);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
