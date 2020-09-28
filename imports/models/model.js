import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

let collectionName = 'students'

export let Students = new Mongo.Collection('students');
export let Subjects = new Mongo.Collection('subjects');


/*Meteor.methods({
    ['db.insert'](collection, data) {
        let Col = eval(capitalize(collection))

        console.log(Col.insert(data))
        console.log(data)

        let formatted = Object.assign(data, {createdAt: new Date()})
        let _id =  Col.insert(formatted);
        return Object.assign({_id}, formatted);

    }

});*/

Meteor.methods({
    [`${collectionName}.insert`](data) {
        // check(text, String);
        let formatted = Object.assign(data, {createdAt: new Date()})
        let _id = Students.insert(formatted);
        return Object.assign({_id}, formatted);
    },
    [`${collectionName}.update`](id, data) {
        check(id, String);

        const student = Students.findOne(id);

        if (student) {
            Students.update(id, {$set: data});
            return Object.assign({_id: id}, data);
        }
    },
    [`${collectionName}.remove`](id) {
        check(id, String);

        // const student = Students.findOne(id);
        return Students.remove(id);
    },

});

collectionName = 'subjects'

Meteor.methods({
    [`${collectionName}.insert`](data) {
        // check(text, String);
        let formatted = Object.assign(data, {createdAt: new Date()})
        let _id = Subjects.insert(formatted);
        return Object.assign({_id}, formatted);
    },
    [`${collectionName}.update`](id, data) {
        check(id, String);

        const subject = Subjects.findOne(id);

        if (subject) {
            Subjects.update(id, {$set: data});
            return Object.assign({_id: id}, data);
        }
    },
    [`${collectionName}.remove`](id) {
        check(id, String);

        // const student = Students.findOne(id);
        return Subjects.remove(id);
    },

});