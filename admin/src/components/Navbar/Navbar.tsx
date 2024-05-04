import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 5 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Panel
            </Typography>
            <Button color="inherit">Generate Report</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          PaperProps={{ sx: { width: '300px' } }}
        >
          <List>
            <ListItem onClick={toggleDrawer}>
              <Link to="/livelogs" style={{ textDecoration: 'none' }}>
                <Button variant="text" color="inherit">Toggle Graph</Button>
              </Link>
            </ListItem>
            <ListItem onClick={toggleDrawer}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="text" color="inherit">Admin Panel</Button>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
