import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Button } from '@mui/material';

export const DrawerAll = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const user = useTracker(() => Meteor.user());
    const logout = () => Meteor.logout();
    const navigate = useNavigate();
    const toConfigProfile = () => {
        navigate('/profile');
    };
    const toTodoList = () => {
        navigate('/task');
    };
    const toHome = () => {
        navigate('/');
    };
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Bem Vindo {user.username}
                    </Typography>

                    <Button color="inherit" onClick={logout}  style={{textAlign: 'right', justifyContent:"flex-end"}}>
                        <LogoutIcon />
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={handleDrawerClose}>
                <Toolbar />
                <Divider />
                <List>
                    <ListItem disablePadding onClick={() => toHome()}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => toConfigProfile()}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ManageAccountsIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Profile"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => toTodoList()}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ChecklistIcon />
                            </ListItemIcon>
                            <ListItemText primary={"To Do List"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}