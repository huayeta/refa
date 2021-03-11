const Person = require('../models/Person');

const Persons = async (req, res) => {
    const {qq, phone, shop_type,type} = req.query;
    let person_exec = Person.find();
    // 搜索qq
    if (qq) person_exec = person_exec.find({
        $or: [
            {qq}, {spare_qq: qq}
        ]
    })
    // 搜索手机
    if (phone) person_exec = person_exec.find({phone});
    // 搜索店铺
    if (shop_type) person_exec = person_exec.find({shop_type});
    // 搜索任务
    if (type!== undefined && type !== '0') person_exec = person_exec.find({type});
    person_exec.sort({'pig_create_time':"desc"}).limit(50).exec((err,persons)=>{
        res.send({
            code: 0,
            message: persons
        })
    });
}

module.exports = Persons;