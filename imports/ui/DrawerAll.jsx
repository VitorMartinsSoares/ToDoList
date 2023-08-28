import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
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
import { Avatar } from "@mui/material";

export const DrawerAll = ({ page }) => {
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
            <AppBar>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ marginLeft: '20px' }}>
                        {page}
                    </Typography>
                    <Typography variant="h6">
                        Logout:
                    </Typography>
                    <Button color="inherit" onClick={logout} >
                        <LogoutIcon />
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={handleDrawerClose}>
                <Grid container justifyContent="center" >
                    <Grid item>
                        <List>
                            <ListItem >
                                <h1>{user.username}</h1>
                            </ListItem>
                            <ListItem>
                                <Avatar
                                    alt="Uploaded Preview"
                                    src={user.profile.photo}
                                    sx={{ width: 75, height: 75 }}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
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