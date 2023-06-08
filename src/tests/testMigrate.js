const User = require('../models/User')
const { request } = require('../app');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models');

const main = async() => {
    try{
        await sequelize.sync({ force: true });

        await User.create({
            firstName: "testuser",
            lastName: "testuser",
            email: "testuser@gmail.com",
            password: "1234",
            phone: "1334425442"
        })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();