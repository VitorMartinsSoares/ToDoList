import * as React from 'react';
import { useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task'
import { useTracker } from 'meteor/react-meteor-data';
import { TaskForm } from './TaskForm';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { DrawerAll } from './DrawerAll';
import Pagination from '@mui/material/Pagination';
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export const TaskList = () => {
    const [itens, setItens] = useState(0);
    const [count, setCount] = useState(1);
    const [checked, setChecked] = useState(false);
    const [dense, setDense] = useState(false);
    const [word, setWord] = useState("");
    const[total, setTotal] = useState(1);

    const { tasks } = useTracker(() => {
        const subscription = Meteor.subscribe('privateTasks', checked, word);
        const tasks = TasksCollection.find().fetch();
        return { tasks }
    });
    if (itens == 0) {
        setTotal(tasks.length);
        setItens(4);
    }
    const handleChange = (event) => {
        setChecked(!checked);
    };
    const pageChange = (event, value) => {
        setCount(value);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerAll />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <TaskForm />
                <Toolbar />
                <TextField
                    required
                    id="standard-required"
                    label="Research the Tasks"
                    value={word}
                    variant="standard"
                    type="text"
                    placeholder="Research..."
                    name="username"
                    onChange={e => setWord(e.target.value)}
                />
                <FormLabel component="legend">Exibir tarefas concluídas
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                    />
                </FormLabel>
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
            </Box>
        </Box>
    );
};
