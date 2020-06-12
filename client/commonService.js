import { Meteor } from 'meteor/meteor';
import { Content } from '../imports/api/content.js';
export default function() {

  var vm = {};
  vm.contentList = [];


    function setContent( content )
    {
        vm.contentList.push(content);
		Meteor.call('content.update', content);
    }

    function getContent()
    {
        //return vm.contentList;
		return Content.find({}, {
          sort: {
            createdAt: -1
          }
        }).fetch();
    }

    return {
        setContent: setContent,
        getContent: getContent
    };
}