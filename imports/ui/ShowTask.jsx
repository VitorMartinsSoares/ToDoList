import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DrawerAll } from './DrawerAll';
import { styled } from "@mui/system";
import Typography from '@mui/material/Typography';


export const ShowTask = () => {
  let location = useLocation();
  let task = location.state.task;
  const [editable, setEditable] = useState(true);
  const [userCreate, setUserCreate] = useState(task.name);
  const [situation, setSituation] = useState(task.situation);
  const [dataCreate, setDataCreate] = useState(dayjs(task.dataCreate));
  const [nameTask, setNameTask] = useState(task.text);
  const [description, setDescription] = useState(task.description);
  const [pessoal, setPessoal] = useState(task.pessoal);

  const navigate = useNavigate();

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleChange = (event) => {
    if (task.situation == 0 && event.target.value == 2) {
      console.log("Não pode")
    } else {
      setSituation(event.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    Meteor.call('tasks.edit', task._id, nameTask, dataCreate.format(), situation, description, pessoal);
    navigate('/task');
  };

  return (
    <Box
      noValidate
      autoComplete="off">
      <DrawerAll page={"Task"} />
      <Box
        onSubmit={handleSubmit}>
        <Grid container justifyContent="center" >
          <Grid item>
            <Box component="main"
              sx={{
                display: 'flex',
                flexDirection: 'column',  // organiza os filhos na vertical
                alignItems: 'center',     // centraliza os filhos na horizontal
                height: '100vh',          // usa 100% da altura da viewport
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}>
              <Toolbar />
              <Typography variant="h4" style={{ color: "gray" }}>
                Criado por {userCreate}
              </Typography>
              <IconButton edge="end" onClick={toggleEditable} aria-label="edit" style={{ marginRight: '8px', marginTop: '10px', alignItems: "flex-end" }} >
                <EditIcon />
                Habilitar Edição

              </IconButton>
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
                  disabled={editable}
                  label="Situação da Tarefa:">
                  <MenuItem value={0}>Cadastrada</MenuItem>
                  <MenuItem value={1}>Em Andamento</MenuItem>
                  {task.situation !== 0 && <MenuItem value={2}>Concluída</MenuItem>}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={editable}
                  defaultValue={dataCreate}
                  onChange={e => setDataCreate(e)}
                  disableFuture
                  label="Data de Criação"
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
              <TextField
                required
                disabled={true}
                defaultValue={userCreate}
                id="outlined-required"
                label="Usuário que criou"
                onChange={e => setUserCreate(e.target.value)} />
              <Typography variant="h6" style={{ color: "gray" }}>
                Tarefa Pessoal:
                <Checkbox
                  disabled={editable}
                  checked={pessoal}
                  onChange={e => setPessoal(e.target.checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Typography>
              <Button type="submit" variant="contained" disabled={editable} >Editar Tarefas</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}