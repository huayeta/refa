const Person = require('../models/Person');

const Persons = async (req,res)=>{
    const persons = await Person.find().sort('-pig_create_time').exec();
    res.send({
        code:0,
        message:persons
    })
}

module.exports = Persons;