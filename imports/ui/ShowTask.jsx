import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { DrawerAll } from './DrawerAll';
import Toolbar from '@mui/material/Toolbar';

export const ShowTask = () => {
  let location = useLocation();
  let task = location.state.task;
  const [editable, setEditable] = useState(true);
  const [userCreate, setUserCreate] = useState(task.name);
  const [situation, setSituation] = useState(task.situation);
  const [dataCreate, setDataCreate] = useState(task.createdAt);
  const [nameTask, setNameTask] = useState(task.text);
  const [description, setDescription] = useState(task.description);
  const [pessoal, setPessoal] = useState(task.pessoal);

  const navigate = useNavigate();

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleChange = (event) => {
    if (situation == 0 && event.target.value == 2) {
      console.log("Não pode")
    } else {
      setSituation(event.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(pessoal)
    Meteor.call('tasks.edit', task._id, nameTask, dataCreate, situation, description, pessoal);
    navigate('/task');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerAll />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
      <Toolbar />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}>
          <Box>
            <TextField
              required
              disabled={editable}
              id="outlined-required"
              label="Nome da Tarefa"
              defaultValue={task.text}
              onChange={e => setNameTask(e.target.value)} />
            <TextField
              disabled={editable}
              id="outlined-required"
              label="Descrição"
              defaultValue={task.description}
              onChange={e => setDescription(e.target.value)} />
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel id="demo-simple-select-helper-label">Situação da Tarefa:</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={situation}
                onChange={handleChange}
                label="Situação da Tarefa:">
                <MenuItem value={0}>Cadastrada</MenuItem>
                <MenuItem value={1}>Em Andamento</MenuItem>
                <MenuItem value={2}>Concluída</MenuItem>
              </Select>
            </FormControl>
            <TextField
              disabled={editable}
              id="outlined-required"
              label="Data"
              defaultValue={task.createdAt}
              onChange={e => setDataCreate(e.target.value)} />
            {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Usuário que criou:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={userCreate}
          label="Usuário que criou:">
          {users.map(users => <MenuItem value={users._id}>
            {users.name}</MenuItem>)}
        </Select>
      </FormControl> */}
            <TextField
              required
              disabled={editable}
              id="outlined-required"
              label="Usuário que criou"
              onChange={e => setUserCreate(e.target.value)} />
            <IconButton edge="end" onClick={toggleEditable} aria-label="edit" style={{ marginRight: '8px', marginTop: '10px' }}>
              <EditIcon />
            </IconButton>
            <Checkbox
              checked={pessoal}
              onChange={e => setPessoal(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
          <Button type="submit" variant="contained" >Add Tasks</Button>
        </Box>
      </Box>
    </Box>
  );
}