import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from './TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import dayjs from 'dayjs';
const yesterday = dayjs().subtract(0, 'day');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const user = useTracker(() => Meteor.user());
    TasksCollection.insert({
      text,
      dataCreate: yesterday.format(),
      userId: this.userId,
      name: user.username,
      situation: 0,
      description: 0,
      pessoal: false
    })
  },

  'tasks.edit'(taskId, nameTask, dataCreate, situation, description, pessoal) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const user = useTracker(() => Meteor.user());
    if(this.userId==TasksCollection.findOne(taskId).userId){
    TasksCollection.update(taskId, {
      text: nameTask,      
      userId: this.userId,
      name: user.username,
      description: description,
      situation: situation,
      dataCreate: dataCreate,
      pessoal: pessoal
    })}
  },

  'tasks.remove'(taskId) {
    check(taskId, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    if(this.userId==TasksCollection.findOne(taskId).userId){
      TasksCollection.remove(taskId);
    }
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked
      }
    });
  }
});