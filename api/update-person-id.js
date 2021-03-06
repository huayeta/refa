const Person = require('../models/Person');

// -1未知错误，0更新成功，1未找到任务，2已经存在
const updatePersonId = async (req, res) => {
    const body = req.body;
    if(!body) return res.send({
        code: -1,
        message: 'body不存在'
    })
    try {
        console.log(body);
        const order_violation = body.order_violation;
        if(order_violation !==undefined){

        }
    }catch (e){
        res.send({
            code: -1,
            message: e.message
        })
    }
}
module.exports = updatePersonId;