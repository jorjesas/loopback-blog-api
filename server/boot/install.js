'use strict';

var installed = true;
module.exports = function (app) {
    if (!installed) {
        var User = app.models.account;
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
    
        User.create([
            {username: 'jorje', email: 'jorje12@gmail.com', password: 'admin', 'firstName': 'Jorje', 'lastName': 'S'},
            {username: 'dea', email: 'jorje12@gmail.com', password: 'user', 'firstName': 'Dea', 'lastName': 'M'}
        ], function(err, users) {
            if (err) throw err;
    
            console.log("Created User: ", users);
            //create the admin role
            Role.create({
            name: 'admin'
            }, function(err, role) {
                if (err) throw err;
    
            //make jorje an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
            }, function(err, principal) {
                if (err) throw err;
                console.log('Created principal: ', principal);
            });
            });
        });
    }

};