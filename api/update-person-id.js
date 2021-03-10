const Person = require('../models/Person');

// {_id,order_violation?,order_appraise_time?,order_default_appraise_time?,order_additional_appraise_time?}
const updatePersonId = async (req, res) => {
    const body = req.body;
    if(!body) return res.send({
        code: -1,
        message: 'body不存在'
    })
    try {
        console.log(body);
        const _id = body._id;
        if(!_id)return res.send({
            code: -1,
            message:'没有_id'
        })
        const person = await Person.findOne({_id}).exec();
        if(!person) return res.send({
            code: -1,
            message:'没有找到person'
        })
        // 更新违规
        const order_violation = body.order_violation;
        if(order_violation !==undefined){
            await person.updateOne({order_violation}).exec();
            return res.send({
                code: 0,
                message: '违规记录更新'
            })
        }
        // 更新评价时间
        const order_appraise_time = body.order_appraise_time;
        if(order_appraise_time !==undefined){
            await person.updateOne({order_appraise_time,status:2}).exec();
            return res.send({
                code: 0,
                message: '评价时间更新'
            })
        }
        // 更新默认评价时间
        const order_default_appraise_time = body.order_default_appraise_time;
        if(order_default_appraise_time !==undefined){
            await person.updateOne({order_default_appraise_time,status:3}).exec();
            return res.send({
                code: 0,
                message: '默认评价时间更新'
            })
        }
        // 更新追加评价时间
        const order_additional_appraise_time = body.order_additional_appraise_time;
        if(order_additional_appraise_time !==undefined){
            await person.updateOne({order_additional_appraise_time,status:4}).exec();
            return res.send({
                code: 0,
                message: '追加评价时间更新'
            })
        }
        res.send({
            code: 0,
            message:'无更新'
        })
    }catch (e){
        res.send({
            code: -1,
            message: e.message
        })
    }
}
module.exports = updatePersonId;