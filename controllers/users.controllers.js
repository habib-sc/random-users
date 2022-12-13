const fs = require('fs/promises');

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