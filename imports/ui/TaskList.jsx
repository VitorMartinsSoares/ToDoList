import * as React from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task'
import { useTracker } from 'meteor/react-meteor-data';
import { TaskForm } from './TaskForm';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { DrawerAll } from './DrawerAll';
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export const TaskList = () => {
    const logout = () => Meteor.logout();
    const [dense, setDense] = React.useState(false);
    const { tasks } = useTracker(() => {
        const subscription = Meteor.subscribe('privateTasks');
        const tasks = TasksCollection.find().fetch();
        return { tasks }
    });

    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerAll />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <TaskForm />
                <Grid>
                    <Demo>
                        <React.Fragment>
                            <List dense={dense}>
                                {tasks.map(task => <Task
                                    key={task._id}
                                    task={task}
                                />)}
                            </List>
                        </React.Fragment>
                    </Demo>
                </Grid>
                <Box>
                    <Button variant="contained" onClick={logout}><LogoutIcon /></Button>
                </Box>
            </Box>
        </Box>
    );
};
