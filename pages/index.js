import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Table,Tooltip} from 'antd'
import axios from 'axios';
import {useState} from 'react';
import moment from 'moment'

export default function Home({persons:persons_origin}) {
    const columns = [
        {
            title:'小猪id',
            dataIndex: 'pig_id'
        },
        {
            title: '联络',
            dataIndex: 'task_contact_type',
            render: task_contact_type=>{
                switch (task_contact_type) {
                    case 1:
                        return 'qq';
                    case 2:
                        return '微信';
                }
            }
        },{
            title: '联络号',
            dataIndex: 'task_contact_number',
        },
        {
            title: '任务标题',
            dataIndex: 'task_title',
            ellipsis: true,
            render: task_title=>{
                return <Tooltip placement="topLeft" title={task_title}>
                    {task_title}
                </Tooltip>
            }
        },
        {
            title: '任务类型',
            dataIndex: 'type',
            render: type =>{
                return type === 1?'淘宝单':'拼多多单'
            }
        },{
            title: '店铺名字',
            dataIndex: 'shop_type',
            render: shop_type =>{
                switch (shop_type) {
                    case 1:
                        return '万阁';
                    case 2:
                        return '广裕隆';
                    case 3:
                        return '艾跃';
                    default:
                        return '不清楚';
                }
            }
        },{
            title: '刷手手机',
            dataIndex: 'phone'
        },
        // {
        //     title: '刷手姓名',
        //     dataIndex: 'name'
        // },
        // {
        //     title: '性别',
        //     dataIndex: 'sex',
        //     render: sex=>{
        //         switch (sex) {
        //             case 1:
        //                 return '男';
        //             case 2:
        //                 return '女';
        //             default:
        //                 return '保密';
        //         }
        //     }
        // },
        {
            title: 'qq',
            dataIndex: 'qq'
        },{
            title: '备用qq',
            dataIndex: 'spare_qq'
        },
        // {
        //     title: '价格',
        //     dataIndex: 'price'
        // },
        // {
        //     title: '佣金',
        //     dataIndex: 'commission'
        // },
        {
            title: '任务描述',
            dataIndex: 'description',
            ellipsis: true,
            render: description=>{
                return <Tooltip placement="topLeft" title={description}>
                    {description}
                </Tooltip>
            }
        },{
            title: '小猪时间',
            dataIndex: 'pig_create_time',
            render: pig_create_time=>{
                return pig_create_time && moment(pig_create_time).format('YYYY-MM-DD hh:mm:ss');
            }
        },{
            title: '状态',
            dataIndex: 'status',
            render: status=>{
                switch (status) {
                    case 1:
                        return '已完成';
                    case 2:
                        return '已评价';
                    case 3:
                        return '默认评价';
                    case 4:
                        return '已追评';
                    default:
                        return '未知状态';
                }
            }
        },{
            title: '旺旺号',
            dataIndex: 'account'
        },{
            title: '订单号',
            dataIndex: 'order_id'
        },{
            title: '订单时间',
            dataIndex: 'order_create_time',
            render: order_create_time=>{
                return order_create_time && moment(order_create_time).format('YYYY-MM-DD hh:mm:ss');
            }
        },{
            title: '评价时间',
            dataIndex: 'order_appraise_time',
            render: order_appraise_time=>{
                return order_appraise_time && moment(order_appraise_time).format('YYYY-MM-DD hh:mm:ss');
            }
        },{
            title: '默认评价时间',
            dataIndex: 'order_default_appraise_time',
            render: order_default_appraise_time=>{
                return order_default_appraise_time && moment(order_default_appraise_time).format('YYYY-MM-DD hh:mm:ss');
            }
        },{
            title: '追加评价时间',
            dataIndex: 'order_additional_appraise_time',
            render: order_additional_appraise_time=>{
                return order_additional_appraise_time && moment(order_additional_appraise_time).format('YYYY-MM-DD hh:mm:ss');
            }
        },{
            title: '是否违规',
            dataIndex: 'order_violation',
            render: order_violation=>{
                switch (order_violation) {
                    case 1:
                        return <span className={styles.red}>违规</span>;
                    default:
                        return '未违规'
                }
            }
        }
    ];
    const [persons,setPersons] = useState(persons_origin);
    return (
        <div className={styles.container}>
            <div className={styles.header}></div>
            <Table dataSource={persons} columns={columns} pagination={false} rowKey={record=>record._id} />
        </div>
    )
}

export async function getStaticProps(){
    const persons = (await axios.get('http://127.0.0.1:3000/api/persons')).data.message;
    return {
        props:{
            persons
        }
    }
}