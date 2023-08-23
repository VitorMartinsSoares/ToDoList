import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const TaskForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setText("");
    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText('');
  };

  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}      
    noValidate
      style={{marginBottom:"20px"}}
      autoComplete="off" className="task-form" onSubmit={handleSubmit}
    >
      <Typography variant="h5" style={{ color: "gray" }}>
        Criar Tarefas:
      </Typography>
      <TextField
        required
        id="standard-required"
        label="Type to add new tasks"
        value={text}
        variant="standard"
        type="text"
        placeholder="New Tasks"
        name="username"
        onChange={e => setText(e.target.value)}
      />

      <Button type="submit" variant="contained" >Add Tasks</Button>
    </Box>
  );
};