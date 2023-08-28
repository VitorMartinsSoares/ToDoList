import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { DrawerAll } from './DrawerAll';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TasksCollection } from '/imports/api/TasksCollection';

export const Home = () => {
  const { tasks } = useTracker(() => {
    const subscription = Meteor.subscribe('allTasks');
    const tasks = TasksCollection.find().fetch();
    return { tasks }
  });

  const countTaskCreated = tasks.filter(tasks => tasks.situation == 0).length;
  const countTaskProgress = tasks.filter(tasks => tasks.situation == 1).length;
  const countTaskConcluded = tasks.filter(tasks => tasks.situation == 2).length;
  const taskPrivate = tasks.filter(tasks => tasks.userId == Meteor.userId());
  const countTaskPrivateCreated = taskPrivate.filter(taskPrivate => taskPrivate.situation == 0).length;
  const countTaskPrivateProgress = taskPrivate.filter(taskPrivate => taskPrivate.situation == 1).length;
  const countTaskPrivateConcluded = taskPrivate.filter(taskPrivate => taskPrivate.situation == 2).length;

  return (
    
    <Box sx={{ display: 'flex' }}>
      <DrawerAll page={"Home"} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Box sx={{ minWidth: 275, marginTop: '10px' }}>
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Tarefas Gerais
              </Typography>
              <Typography variant="h5" component="div">
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Quantidade de Tarefas Cadastradas:
              </Typography>
              <Typography variant="body2">
                {countTaskCreated}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Tarefas Gerais
              </Typography>
              <Typography variant="h5" component="div">
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Quantidade de Tarefas em Andamento:
              </Typography>
              <Typography variant="body2">
                {countTaskProgress}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Tarefas Gerais
              </Typography>
              <Typography variant="h5" component="div">
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Quantidade de Tarefas Concluídas:
              </Typography>
              <Typography variant="body2">
                {countTaskConcluded}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Tarefas Pessoais
              </Typography>
              <Typography variant="h5" component="div">
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Quantidade de Tarefas Cadastradas:
              </Typography>
              <Typography variant="body2">
                {countTaskPrivateCreated}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Tarefas Pessoais
              </Typography>
              <Typography variant="h5" component="div">
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Quantidade de Tarefas em Andamento:
              </Typography>
              <Typography variant="body2">
                {countTaskPrivateProgress}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Tarefas Pessoais
              </Typography>
              <Typography variant="h5" component="div">
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Quantidade de Tarefas Concluídas:
              </Typography>
              <Typography variant="body2">
                {countTaskPrivateConcluded}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
