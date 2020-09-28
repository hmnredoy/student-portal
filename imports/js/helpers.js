import { Meteor } from 'meteor/meteor';

let modelHelper = {
    alert(error, success = 'Success!', fail = 'Failed!'){
        !error ? M.toast({html: success}) : M.toast({html: fail})
    },

    checkData(...args){
        console.log(args)
    },
    remove(methodName, id, callback = '') {
        modelHelper.checkData(methodName, id)

        /* if(!id) {
             that.alert('Item ID is missing!')
             return;
         }*/
        Meteor.call(methodName, id, (err) => {
            modelHelper.alert(err, 'Successfully Deleted!')
            try {callback(result)}catch{}
        })

    },

    update(methodName, data, callback = ''){
        // modelHelper.checkData(methodName, data._id, data)

        Meteor.call(methodName, data._id, data, (err, result) => {
            modelHelper.alert(err, 'Successfully Updated!')
            try {callback(result)}catch{}
        })
    },

    create(methodName, data, callback = '') {
        // Model.checkData(methodName, data)
        Meteor.call(methodName, data, (err, result) => {
            // console.log(result)
            modelHelper.alert(err, 'Successfully Added!')
            try {callback(result)}catch{}
        });

    }
}

export {modelHelper}