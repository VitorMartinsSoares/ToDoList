import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const TaskForm = () => {
  const [text, setText] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
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
      autoComplete="off" className="task-form" onSubmit={handleSubmit}
    >
      <TextField
        required
        id="standard-required"
        label="Type to add new tasks"
        defaultValue=""
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