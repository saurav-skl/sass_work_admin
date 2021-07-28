import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Watch from "./assets/watch.png";
import Lotus from "./assets/flower.png";
import Apple from "./assets/apple.png";
import laptop from "./assets/laptop.png";
import mobile from "./assets/code.png";
import shoes from "./assets/shoes.png";
import cup from "./assets/cup.png";
import vass from "./assets/vass.png";
import navbarBtn from "./assets/nav.png";
import Welcome from "./assets/Welcome.png";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
    maxWidth: 1000,
    margin: "auto",
  },
  tablecnt: {
    marginLeft: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [content, setContent] = useState([]);

  const fetchSearch = async () => {
    try {
      const data = await axios.get("https://track-app-1.herokuapp.com/all-items");
      setContent(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, []);

  return (
    <div className="App">
      <AppBar position="static" className="appbar">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            User Click Events Tracker
          </Typography>
          <Button color="inherit">Welcome</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <TableContainer component={Paper} className={classes.tablecnt}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell align="right">Count</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {content.length > 0 &&
                content.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      <div className="box">
                        <span style={{ "margin-top": "1rem" }}>
                          {item.name}
                        </span>
                        <img
                          src={
                            item.name === "Watch"
                              ? Watch
                              : item.name === "vass"
                              ? vass
                              : item.name === "Lotus"
                              ? Lotus
                              : item.name === "Apple"
                              ? Apple
                              : item.name === "laptop"
                              ? laptop
                              : item.name === "shoes"
                              ? shoes
                              : item.name === "mobile"
                              ? mobile
                              : item.name === "cup"
                              ? cup
                              : item.name === "navbarBtn"
                              ? navbarBtn
                              : Welcome
                          }
                          alt={item.name}
                          style={{ height: "50px", width: "50px" }}
                        />
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.used}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
    // // {console.log(rows)}
    // // {rows.map((row) => (
    //   <StyledTableRow key={row.name}>
    //     <StyledTableCell component="th" scope="row">
    //       {/* {row.name} */}
    //     </StyledTableCell>
    //     <StyledTableCell align="right">
    //       {/* {row.count} */}
    //     </StyledTableCell>
    //   </StyledTableRow>
    // // ))}
  );
}

export default App;
