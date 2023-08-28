import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './Home.jsx';
import { TaskList } from './TaskList.jsx';
import { ShowTask } from './ShowTask.jsx';
import { LoginForm } from './LoginForm';
import { Profile } from './Profile';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<TaskList />} />
        <Route path="/task/edit" element={<ShowTask />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
