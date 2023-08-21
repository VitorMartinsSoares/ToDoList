import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const submit = e => {
    e.preventDefault();
    console.log(Meteor.users.findOne())
    Meteor.loginWithPassword(username, password);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off" onSubmit={submit}
    >
      <TextField
          required
          id="standard-required"
          label="UserName"
          defaultValue=""
          variant="standard"
          type="text"
          placeholder="Username"
          name="username"
          onChange={e => setUsername(e.target.value)}
        />
      <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          placeholder="Password"
          name="password"
          required
          onChange={e => setPassword(e.target.value)}
        />
      <Button type="submit" variant="contained" >Login</Button>
    </Box>
  );
};