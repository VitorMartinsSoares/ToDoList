import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Meteor } from 'meteor/meteor';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

export const Task = ({ task }) => {
    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const handleButtonClick = () => {
        if(user._id==task.userId){
            navigate('/task/edit', {state:{task}});
        }
    }
    const onDeleteClick = () => {
        console.log(task)
        if(user._id==task.userId){
            Meteor.call('tasks.remove', task._id);
        }
    };
    
    return (<ListItem secondaryAction={<Box>
        <IconButton onClick={()=>handleButtonClick()} edge="end" aria-label="edit" style={{ marginRight: '8px' }} disabled={!(user._id==task.userId)}>
            <EditIcon />
        </IconButton>
        <IconButton onClick={()=> onDeleteClick(task)} edge="end" aria-label="delete" disabled={!(user._id==task.userId)}>
            <DeleteIcon />
        </IconButton>
    </Box>
    }>
        <ListItemIcon>
            <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={task.text} secondary={task.name} />
    </ListItem>)
};