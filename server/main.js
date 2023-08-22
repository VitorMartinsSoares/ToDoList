import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';
import '/imports/api/tasksMethods';
import dayjs from 'dayjs';
const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });
const yesterday = dayjs().subtract(1, 'day');

const SEED_USERNAME = 'vitor';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});

Meteor.publish('privateTasks', function (checked = true, word = "", now=0, limit=0) {
  const regex = new RegExp(word, 'i');
  if (checked) {
    return tasks = TasksCollection.find({
      $or: [
        { userId: { $ne: Meteor.userId() }, pessoal: false, text: regex },
        { userId: Meteor.userId(), text: regex }
      ]
    },{skip:now,limit:limit});
  } else {
    return tasks = TasksCollection.find({
      $or: [
        { userId: { $ne: Meteor.userId() }, pessoal: false, situation: { $ne: 2 }, text: regex },
        { userId: Meteor.userId(), situation: { $ne: 2 }, text: regex }
      ]
    },{skip:now*4,limit:limit});
  }
});

Meteor.publish('allTasks', function () {
  return tasks = TasksCollection.find({
    $or: [
      { userId: { $ne: Meteor.userId() }, pessoal: false },
      { userId: Meteor.userId()}
    ]
  });
});