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
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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
    const [total, setTotal] = useState(1);
    const { tasks } = useTracker(() => {
        const subscription = Meteor.subscribe('privateTasks', checked, word);
        const tasks = TasksCollection.find().fetch();
        if(tasks.length !== total){
            setTotal(tasks.length);
        }
        return { tasks }
    });
    
    const handleChange = (event) => {
        setChecked(!checked);
    };
    const pageChange = (event, value) => {
        setCount(value);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerAll page={"To Do List"} />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                display="flex"
                flexDirection="column"
                minHeight="100vh"
            >
                <Toolbar />
                <TaskForm />
                <Divider />
                <Box flexGrow={1}>
                    <Typography variant="h5" style={{ color: "gray", marginTop: "20px" }} >
                        Visualizar Tarefas:
                    </Typography>
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
                        <Box>
                            <Demo>
                                <React.Fragment>
                                    <List dense={dense}>
                                        {tasks.slice((count - 1) * 4, (count - 1) * 4 + 4).map(task => <Task
                                            key={task._id}
                                            task={task}
                                        />)}
                                    </List>
                                </React.Fragment>
                            </Demo>
                        </Box>
                    </Grid>
                </Box>
                <Box display="flex" justifyContent="center" mb={2}>
                    <Pagination count={Math.ceil(total / 4)} page={count} onChange={pageChange} style={{ marginBottom: '50px' }} />
                </Box>
            </Box>
        </Box>
    );
};
