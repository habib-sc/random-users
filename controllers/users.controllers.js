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


// Adding New user in ranndo user list 
module.exports.saveUser = async (req, res, next) => {
    const userData = req.body;
    const { id, gender, name, contact, address, photoUrl } = userData;

    // checking all input data available or not 
    if (id && gender && name && contact && address && photoUrl) {
        let updatedUserList = [];
        // Reading userData.json file 
        const usersJson = await fs.readFile('./usersData.json');
        const users = JSON.parse(usersJson);

        // checking already user exist or not 
        const isExist = users.filter(user => user.id === id);
        if (isExist.length > 0) {
            res.send({ success: false, message: "User Alrady Exist" });
            return;
        }

        // adding data to userlist array with userdata 
        if (users) {
            updatedUserList = users;
            updatedUserList.push(userData);
        }

        // Stringifing the data 
        const stringified = JSON.stringify(updatedUserList);

        // adding data in json file by wrinting json file 
        fs.writeFile('./usersData.json', stringified, 'utf8', (err) => {
            if (err) {
                res.send({ success: false, message: "Failed to write data!" });
                return;
            }
        });

        // Sending success response 
        res.send({ success: true, message: "User Added!" });


    } else {
        res.send({ success: false, message: "All parameters are required - id, gender, name, contact, address, photoUrl" })
    };

};

// Patch a user in ranndom user list 
module.exports.updateUser = async (req, res, next) => {
    const userData = req.body;
    const idType = typeof userData.id;

    // checking user id 
    if (userData.id && idType == "number") {
        // Reading userData.json file 
        const usersJson = await fs.readFile('./usersData.json');
        const users = JSON.parse(usersJson);

        // getting the user by id
        const currentUser = users.find(user => user.id === userData.id);
        // Updating the user info 
        if (currentUser) {
            if (userData.gender) {
                currentUser.gender = userData.gender;
            } else if (userData.name) {
                currentUser.name = userData.name;
            } else if (userData.contact) {
                currentUser.contact = userData.contact;
            } else if (userData.address) {
                currentUser.address = userData.address;
            } else if (userData.photoUrl) {
                currentUser.photoUrl = userData.photoUrl;
            };
        } else {
            res.send({ success: false, message: "User Not Found!" });
            return;
        }

        // updating user data
        users.map(user => user.id !== currentUser.id ? user : currentUser);

        // Stringifing the data 
        const stringified = JSON.stringify(users);

        // updating data in json file by wrinting json file 
        fs.writeFile('./usersData.json', stringified, 'utf8', (err) => {
            if (err) {
                res.send({ success: false, message: "Failed to write data!" });
                return;
            }
        });

        // Sending success response 
        res.send({ success: true, message: "User Updated !" });


    } else {
        res.send({ success: false, message: "User id should be required and number." })
    };

};


// Bulk update user
module.exports.bulkUpdateUsers = async (req, res, next) => {
    const userInfoArray = req.body;
    let idTypeError;

    // Reading userData.json file 
    const usersJson = await fs.readFile('./usersData.json');
    const users = JSON.parse(usersJson);

    // looping the user data array and update user info 
    for (const userData of userInfoArray) {
        const idType = typeof userData.id;
        if (idType == "number") {
            // getting the user by id
            const currentUser = users.find(user => user.id === userData.id);
            // Updating the user info 
            if (currentUser) {
                if (userData.gender) {
                    currentUser.gender = userData.gender;
                }
                if (userData.name) {
                    currentUser.name = userData.name;
                }
                if (userData.contact) {
                    currentUser.contact = userData.contact;
                }
                if (userData.address) {
                    currentUser.address = userData.address;
                }
                if (userData.photoUrl) {
                    currentUser.photoUrl = userData.photoUrl;
                };
            }
        } else {
            idTypeError = "User id should be required and number.";
        };
    };

    // Handling id type error 
    if (idTypeError) {
        res.send({ success: false, message: "All Users id should be required and number." });
        return;
    }

    // Stringifing the data 
    const stringified = JSON.stringify(users);

    // updating data in json file by wrinting json file 
    fs.writeFile('./usersData.json', stringified, 'utf8', (err) => {
        if (err) {
            res.send({ success: false, message: "Failed to write data!" });
            return;
        }
    });

    // Sending success response 
    res.send({ success: true, message: "Bulk Users Updated !" });
};


// Deleting a user 
module.exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.query.id;
        const idType = typeof Number(userId);
        // checking user id 
        if (userId && idType == "number") {
            // Reading userData.json file 
            const usersJson = await fs.readFile('./usersData.json');
            const users = JSON.parse(usersJson);

            // getting user list without requested user id
            const filteredUsers = users.filter(user => user.id != userId);

            // Stringifing the data 
            const stringified = JSON.stringify(filteredUsers);

            // updating data in json file by wrinting json file 
            fs.writeFile('./usersData.json', stringified, 'utf8', (err) => {
                if (err) {
                    res.send({ success: false, message: "Failed to write data!" });
                    return;
                }
            });

            // Sending success response 
            res.send({ success: true, message: "User Deleted !", filteredUsers: filteredUsers });


        } else {
            res.send({ success: false, message: "User id should be number and required in query parameter." })
        };
    } catch (error) {
        next(error)
    }
};