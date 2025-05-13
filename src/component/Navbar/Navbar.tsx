import { Tab, Tabs, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { TABS } from "../../Constants";

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
      {
        TABS.map((tab)=>(
          <Link to={tab==='Home' ? '/' : '/'+ tab.toLowerCase()}>
            <Tab label={tab}/>
          </Link>
        ))
      }
    </Tabs>
  );
};

export default Navbar;
