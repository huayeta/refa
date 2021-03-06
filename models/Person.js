const mongoose = require("mongoose");

/* PetSchema will correspond to a collection in your MongoDB database. */
const PersonSchema = new mongoose.Schema({
    // 小猪账号
    pig_account: { type: Number, required:true},
    // 任务联系方式 1qq，2微信
    task_contact_type: { type: Number, required: true},
    // 任务联系号码
    task_contact_number: { type: String, required: true},
    pig_id: Number,
    task_title: String,
    type: { type: Number, default: 0}, // 1淘宝单，2拼多多单
    shop_type: { type: Number,default: 0},// 0分不清楚，1万阁，2广裕隆，3艾跃
    phone: Number,
    name: String,// 姓名
    sex: {type: Number, default: 0},// 0保密，1男，2女
    qq: String,
    spare_qq: String,// 备用qq
    price: String,
    commission: String,// 佣金
    description: String,
    pig_create_time: Date,
    // 0未知状态, 1已完成，2已评价，3默认评价，4已追评
    status: {type: Number, default:0},
    // 旺旺号
    account: String,
    order_id: String, // 订单
    order_create_time: Date, // 订单创建时间
    order_appraise_time: Date, // 订单评价时间
    order_default_appraise_time: Date, // 订单默认评价时间
    order_additional_appraise_time: Date, // 订单追加评价时间
    order_violation: { type: Number, default: 0},// 0未违规，1违规
})

module.exports = mongoose.model('Person', PersonSchema)