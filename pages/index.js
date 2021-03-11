import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Table,Tooltip,Button,Form,Input,Select} from 'antd'
import axios from 'axios';
import {useState,useEffect} from 'react';
import moment from 'moment';
import {useRouter} from "next/router";

const {TextArea} = Input;

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
        const persons = (await axios.get(`/api/persons?${url}`,)).data.message;
        setPersons(persons);
    }
    const setFormValue = ()=>{
        form.setFieldsValue({
            qq:searchParams.get('qq'),
            phone:searchParams.get('phone'),
            shop_type:searchParams.get('shop_type')?searchParams.get('shop_type'):"0",
            type:searchParams.get('type')?searchParams.get('type'):"0",
        })
    }
    const onFinish = (values)=>{
        router.push({query:values})
    }
    useEffect(()=>{
        fetchData()
        setFormValue();
    },[router.query]);
    const addQQChange = (record,index,e)=>{
        const value = e.target.value.trim();
        // console.log(record,index,value);
        addPersons[index].qq = value;
        setAddPersons(addPersons)
    }
    const addPerson = async (person) => {
        const res = (await axios.post('/api/update-person', {...person})).data;
        console.log(res);
        await fetchData();
    }
    const addColumns = [
        {
            title:'旺旺号',
            dataIndex:'account'
        },
        {
            title: '订单号',
            dataIndex: 'order_id'
        },
        {
            title: 'qq',
            dataIndex: 'qq',
            render: (qq,record,index)=>{
                return <Input type="text" value={qq} onChange={addQQChange.bind(this,record,index)} />
            }
        },
        {
            title: '操作',
            dataIndex: 'handle',
            render: (handle,record)=>{
                return <Button onClick={addPerson.bind(this,record)}>插入</Button>
            }
        }
    ];
    const [addPersons,setAddPersons] = useState(JSON.parse('[{"shop_type":3,"account":"tb_2229941","order_id":"1633566711098219421","order_create_time":1615370044000,"product_id":637327644510},{"shop_type":3,"account":"王庄张大美女","order_id":"1633162034319796600","order_create_time":1615368438000,"product_id":637327644510},{"shop_type":3,"account":"qiaozhizz","order_id":"1631290717478986445","order_create_time":1615308091000,"product_id":637327644510},{"shop_type":3,"account":"小小小鱼儿_88","order_id":"1631264545970263306","order_create_time":1615306504000,"product_id":637327644510},{"shop_type":3,"account":"tyfen0713","order_id":"1260982455107055393","order_create_time":1615297573000,"product_id":637327644510},{"shop_type":3,"account":"zf675621269","order_id":"1631638875229485365","order_create_time":1615296750000,"product_id":637327644510},{"shop_type":3,"account":"迷茫少女520","order_id":"1629962028367304440","order_create_time":1615296388000,"product_id":637327644510},{"shop_type":3,"account":"幺九九四二二","order_id":"1630964953711237640","order_create_time":1615296252000,"product_id":637327644510},{"shop_type":3,"account":"简单的幸福在幸福","order_id":"1628321690956441440","order_create_time":1615207840000,"product_id":637327644510},{"shop_type":3,"account":"a124918046","order_id":"1628609871693721859","order_create_time":1615207063000,"product_id":637327644510},{"shop_type":3,"account":"为什么我还是小学渣","order_id":"1260401738192268894","order_create_time":1615206282000,"product_id":637327644510},{"shop_type":3,"account":"胡莹晶","order_id":"1628050934298309675","order_create_time":1615203150000,"product_id":637327644510},{"shop_type":3,"account":"tb55977374","order_id":"1624348692047357239","order_create_time":1615133459000,"product_id":637327644510},{"shop_type":3,"account":"yangqilove0618","order_id":"1625284477512081454","order_create_time":1615132148000,"product_id":637327644510}]'));
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.txtarea}>
                    <TextArea style={{width:'420px'}} rows={10}></TextArea>
                    <div>
                        <Table dataSource={addPersons} columns={addColumns} pagination={false} rowKey={record=>record.order_id} />
                    </div>
                </div>
                <Form name="search" layout="inline" onFinish={onFinish} form={form}>
                    <Form.Item name="type" label="任务类型">
                        <Select>
                            <Select.Option value="0">全部类型</Select.Option>
                            {Object.keys(task_types).map(type=>{
                                return <Select.Option value={type} key={type}>{task_types[type]}</Select.Option>
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