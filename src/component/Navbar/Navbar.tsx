import { Tab, Tabs, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  return (
    <Tabs
      variant="fullWidth"
      role="navigation"
      indicatorColor="secondary"
      textColor="secondary"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
      }}
      aria-label="navigation tabs"
    >
      <Link to="/">
        <Tab label="Home" />
      </Link>
      <Link to="/todo">
        <Tab label="Todo" />
      </Link>
      <Link to="/about">
        <Tab label="About" />
      </Link>
    </Tabs>
  );
};

export default Navbar;
