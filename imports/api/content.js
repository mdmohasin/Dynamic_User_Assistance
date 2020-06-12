import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Content = new Mongo.Collection('content');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks
  Meteor.publish('content', function contextDataPublication() {
    return Content.find({});
  });
}

Meteor.methods({
  'content.remove' (contentData) {
    check(contentData.elementId, String);
	check(contentData.content, String);

    const content = Content.findOne({elementId:contentData.elementId});
    if (content) {
      Content.remove({elementId:contentData.elementId});
    }
  },
  'content.update' (contentData) {
    check(contentData.elementId, String);
	check(contentData.content, String);
    /*const content = Content.findOne({elementId:contentData.elementId});
    if (!content) {
       Content.insert({
      elementId:contentData.elementId,
      createdAt: new Date(),
      content: contentData.content,
      type: contentData.type,
    });
    }*/
	Content.update({elementId:contentData.elementId},contentData,{ upsert: true });	
  }

});
