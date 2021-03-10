import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Table,Tooltip,Button,Form,Input,Select} from 'antd'
import axios from 'axios';
import {useState,useEffect} from 'react';
import moment from 'moment';
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();
    const [form] = Form.useForm();
    const updatePersonId = async (_id,body)=>{
        await axios.post('/api/update-person-id',{_id,...body});
        await fetchData();
    }
    const routerPush = (query)=>{
        router.push({
            query:{...router.query,...query}
        })
    }
    const routerPushDel = (param)=>{
        delete router.query[param];
        router.push({
            query:{...router.query}
        })
    }
    const handleSearchClick = (param,value)=>{
        if(router.query[param] === value+''){
            routerPushDel(param)
        }else{
            routerPush({[param]:value})
        }
    }
    const shop_types={
        0:'不清楚',
        1:'万阁',
        2:'广裕隆',
        3:'艾跃',
    }
    const task_contact_types ={
        1:'qq',
        2:'微信'
    }
    const task_types ={
        1:'淘宝单',
        2:'拼多多单'
    }
    const columns = [
        {
            title:'小猪id',
            dataIndex: 'pig_id'
        },
        {
            title: '联络',
            dataIndex: 'task_contact_type',
            render: task_contact_type=> task_contact_types[task_contact_type]
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
                return task_types[type]
            }
        },{
            title: '店铺名字',
            dataIndex: 'shop_type',
            render: shop_type =>{
                return <a onClick={()=>{handleSearchClick('shop_type',shop_type)}} className={styles.noSelect}>{shop_types[shop_type]}</a>
            }
        },{
            title: '刷手手机',
            dataIndex: 'phone',
            render: phone=>{
                return <a onClick={()=>{handleSearchClick('phone',phone)}} className={styles.noSelect}>{phone}</a>
            }
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
            dataIndex: 'qq',
            render: qq=>{
                return <a onClick={()=>{handleSearchClick('qq',qq)}} className={styles.noSelect}>{qq}</a>
            }
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
            render: (order_appraise_time,record)=>{
                if(order_appraise_time){
                    return moment(order_appraise_time).format('YYYY-MM-DD hh:mm:ss');
                }else{
                    return <Button onClick={()=>{
                        updatePersonId(record._id,{order_appraise_time:new Date().getTime()})
                    }
                    }>更新pj</Button>
                }
            }

        },{
            title: '默认评价时间',
            dataIndex: 'order_default_appraise_time',
            render: (order_default_appraise_time,record)=>{
                if(order_default_appraise_time){
                    return moment(order_default_appraise_time).format('YYYY-MM-DD hh:mm:ss');
                }else {
                    return <Button onClick={()=>{
                        updatePersonId(record._id,{order_default_appraise_time:new Date().getTime()})
                    }
                    }>更新mpj</Button>
                }
            }
        },{
            title: '追加评价时间',
            dataIndex: 'order_additional_appraise_time',
            render: (order_additional_appraise_time,record)=>{
                if(order_additional_appraise_time){
                    return moment(order_additional_appraise_time).format('YYYY-MM-DD hh:mm:ss');
                }else {
                    return <Button onClick={()=>{
                        updatePersonId(record._id,{order_additional_appraise_time:new Date().getTime()})
                    }
                    }>更新zpj</Button>
                }
            }
        },{
            title: '是否违规',
            dataIndex: 'order_violation',
            render: (order_violation,record)=>{
                switch (order_violation) {
                    case 1:
                        return <span className={styles.red}>违规</span>;
                    default:
                        return <div><span>未违规</span><Button onClick={()=>{
                            updatePersonId(record._id,{order_violation:1})
                        }
                        }>设为违规</Button></div>
                }
            }
        }
    ];
    const [persons,setPersons] = useState([]);
    const searchParams = new URLSearchParams(router.asPath.slice(2));
    const fetchData = async ()=>{
        const url = searchParams.toString();
        return (await axios.get(`/api/persons?${url}`,)).data.message;
    }
    const setFormValue = ()=>{
        form.setFieldsValue({
            qq:searchParams.get('qq'),
            phone:searchParams.get('phone'),
            shop_type:searchParams.get('shop_type')?searchParams.get('shop_type'):"0",
            task_type:searchParams.get('task_type')?searchParams.get('task_type'):"0",
        })
    }
    const onFinish = (values)=>{
        router.push({query:values})
    }
    useEffect(()=>{
        fetchData().then(res=>{
            setPersons(res);
        })
        setFormValue();
    },[router.query]);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Form name="search" layout="inline" onFinish={onFinish} form={form}>
                    <Form.Item name="task_type" label="任务类型">
                        <Select>
                            <Select.Option value="0">全部类型</Select.Option>
                            {Object.keys(task_types).map(task_type=>{
                                return <Select.Option value={task_type} key={task_type}>{task_types[task_type]}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="shop_type" label="店铺名字">
                        <Select>
                            {Object.keys(shop_types).map(shop_type=>{
                                return <Select.Option value={shop_type} key={shop_type}>{shop_types[shop_type]}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="qq" label="qq"><Input /></Form.Item>
                    <Form.Item name="phone" label="phone"><Input /></Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Table dataSource={persons} columns={columns} pagination={false} rowKey={record=>record._id} />
        </div>
    )
}