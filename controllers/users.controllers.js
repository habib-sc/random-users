const fs = require('fs/promises');

// Getting all users and users by limit controller 
module.exports.getAllUsers = async (req, res, next) => {
    try {
        // getting limit from query 
        const limit = req.query.limit;

        // Reading userData.json file 
        const usersJson = await fs.readFile('./usersData.json');
        const users = JSON.parse(usersJson);

        // If limit then sending data by limit otherwise sending all data 
        if (limit) {
            let limitData = [];
            for (let i = 0; i < limit; i++) {
                currentData = users[i];
                limitData.push(currentData);
            };
            res.send(limitData);
        } else {
            res.send(users);
        };
    } catch (error) {
        next(error);
    };
};


// Getting A random user controller 
module.exports.getRandomUser = async (req, res, next) => {
    try {
        // Reading userData.json file 
        const usersJson = await fs.readFile('./usersData.json');
        const users = JSON.parse(usersJson);

        // Getting total user count 
        const totalUsers = users.length;
        // Getting random index by 0 to total users count 
        const randomIndex = Math.floor(Math.random() * (totalUsers));

        // Sending response with random user 
        res.send(users[randomIndex]);

        console.log(randomIndex);

    } catch (error) {
        next(error);
    };
};