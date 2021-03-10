const Person = require('../models/Person');

// -1未知错误，0更新成功，1未找到任务，2已经存在
const updatePerson = async (req, res) => {
    const body = req.body;
    if(!body) return res.send({
        code: -1,
        message: 'body不存在'
    })
    try {
        console.log(body);
        // 判断是否添加过
        const task_qq = body.task_qq;
        const start_time = Date.now()-2*24*3600*1000;
        const person = await Person.findOne({qq:task_qq,pig_create_time:{$gte:start_time}}).exec();
        if(!person)return res.send({
            code: 1,
            message: '未找到任务'
        });
        if(person.account)return res.send({
            code: 2,
            message: '已上传过了',
            person:person
        })
        // 更新
        await person.updateOne(body).exec();
        res.send({
            code: 0,
            message: '更新成功'
        })
    }catch (e){
        res.send({
            code: -1,
            message: e.message
        })
    }
}
module.exports = updatePerson;