import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useTracker } from 'meteor/react-meteor-data';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DrawerAll } from './DrawerAll';
import Toolbar from '@mui/material/Toolbar';

const yesterday = dayjs().subtract(1, 'day');
export const Profile = () => {
    const [editable, setEditable] = useState(true);
    const user = useTracker(() => Meteor.user());
    if (user.profile === undefined) {
        Meteor.users.update(user._id, {
            $set: {
                "profile.birthdate": yesterday.format(),
                "profile.gender": 0,
                "profile.company": "Default",
                "profile.photo": "link"
            }
        });
    }
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState((typeof user.email === 'undefined') ? 'exemplo@email.com' : user.email);
    const [birthDate, setBirthDate] = useState(dayjs(user.profile.birthdate));
    const [gender, setGender] = useState(user.profile.gender);
    const [company, setCompany] = useState(user.profile.company);
    const [photo, setPhoto] = useState(user.profile.photo);

    if (birthDate == undefined) {
        setBirthDate[dayjs().subtract(1, 'day')];
    }

    const handleChange = (event) => {
        setGender(event.target.value);
    }

    const toggleEditable = () => {
        console.log(birthDate)
        setEditable(!editable);
    }

    const handleSubmit = e => {
        Meteor.users.update(user._id, {
            $set: {
                username: username,
                email: email,
                "profile.birthdate": birthDate.format(),
                "profile.gender": gender,
                "profile.company": company,
                "profile.photo": photo,
            }
        });
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerAll />
            <Box component="main"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}>

                <Toolbar />
                <div>
                    <TextField
                        required
                        disabled={editable}
                        id="outlined-required"
                        label="Nome do Usuário"
                        defaultValue={username}
                        onChange={e => setUsername(e.target.value)} />
                    <TextField
                        required
                        disabled={editable}
                        id="outlined-required"
                        label="Email do Usuário"
                        defaultValue={email}
                        onChange={e => setEmail(e.target.value)} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disabled={editable}
                            defaultValue={birthDate}
                            label="Data de Nascimento"
                            disableFuture
                            views={['day', 'month', 'year']}
                            onChange={e => setBirthDate(e.target.value)}
                        />
                    </LocalizationProvider>
                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id="demo-simple-select-helper-label">Gênero</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={gender}
                            disabled={editable}
                            onChange={handleChange}
                            label="Gênero">
                            <MenuItem value={0}>Não Definido</MenuItem>
                            <MenuItem value={1}>Masculino</MenuItem>
                            <MenuItem value={2}>Feminino</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        disabled={editable}
                        id="outlined-required"
                        label="Empresa"
                        defaultValue={company}
                        onChange={e => setCompany(e.target.value)} />
                    <TextField
                        required
                        disabled={editable}
                        id="outlined-required"
                        label="Foto"
                        defaultValue={photo}
                        onChange={e => setPhoto(e.target.value)} />
                </div>

                <IconButton edge="end" onClick={toggleEditable} aria-label="edit" style={{ marginRight: '8px', marginTop: '10px' }}>
                    <EditIcon />
                </IconButton>

                <Button type="submit" variant="contained" >Editar Perfil</Button>
            </Box>
        </Box>
    );
};