const Person = require('../models/Person');

// -1添加错误，0添加成功，1已经存在
const addPerson = async (req, res) => {
    const body = req.body;
    if(!body) return res.send({
        code: -1,
        message: 'body不存在'
    })
    try {
        // 判断是否添加过
        const pig_id = body.pig_id;
        const pre_person = await Person.findOne({pig_id}).exec();
        if(pre_person)return res.send({
            code: 1,
            message: pre_person
        });
        // 添加
        const person = new Person(body);
        await person.save();
        res.send({
            code: 0,
            message: '添加成功'
        })
    }catch (e){
        res.send({
            code: -1,
            message: e.message
        })
    }
}
module.exports = addPerson;