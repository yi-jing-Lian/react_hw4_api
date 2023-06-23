import React , { useEffect, useState }from 'react';
import '../App.css';
import { Card, Table } from 'antd'; 
import { Column } from '@ant-design/plots';

const ProjectPerformance = () => {
    const [monthlyProjectExpensesCosts, setmonthlyProjectExpensesCosts]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/projectPerformance/monthlyProjectExpensesCosts")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setmonthlyProjectExpensesCosts(data.data);
        });
      },[]);
    const [projectIncomeDetail, setprojectIncomeDetail]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/projectPerformance/projectIncomeDetail")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setprojectIncomeDetail(data.data);
        });
      },[]);
      const Columns = [
        {
          title: '專案名稱',
          dataIndex:['project', 'project_name'] ,
          sorter: {
            compare: (a, b) => a.project.project_name - b.project.project_name,
            multiple: 3,
          },
        },
        {
          title: '買受人',
          dataIndex:['buyer', 'customer_name'] ,
          sorter: {
            compare: (a, b) => a.buyer.customer_name - b.buyer.customer_name,
            multiple: 3,
          },
        },
        {
          title: '買方統編',
          dataIndex: ['buyer', 'compilation'],
          sorter: {
            compare: (a, b) => a.buyer.customer_name - b.buyer.customer_name,
            multiple: 3,
          },
        },
        {
          title: '發票開立日',
          dataIndex: 'issue_time',
          sorter: {
            compare: (a, b) => a.issue_time - b.issue_time,
            multiple: 3,
          },
        },
        {
          title: '財務作業進',
          dataIndex: 'enter_status',
          sorter: {
            compare: (a, b) => a.enter_status - b.enter_status,
            multiple: 3,
          },
        },
        {
          title: '預計出款日',
          dataIndex: 'estimated_date',
          sorter: {
            compare: (a, b) => a.estimated_date - b.estimated_date,
            multiple: 3,
          },
        },
        {
            title: '實際出款日',
            dataIndex: 'posting_date',
            sorter: {
              compare: (a, b) => a.posting_date - b.posting_date,
              multiple: 3,
            },
          },
        {
          title: '銷售額',
          dataIndex: 'sales_amount',
          sorter: {
            compare: (a, b) => a.sales_amount - b.sales_amount,
            multiple: 3,
          },
        },
        {
          title: '營業稅額',
          dataIndex: 'sales_amount',
          sorter: {
            compare: (a, b) => a.sales_amount - b.sales_amount,
            multiple: 3,
          },
        },  
      ];
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
      const keys = Object.keys(monthlyProjectExpensesCosts);
      const data=[]
      for(var i=0 ; i < 12 ; i++){
        data.push(
          {
            type:'成本',
            時間: keys[i],
            amount: monthlyProjectExpensesCosts?.[keys[i]]?.projectCost,
          },
          {
            type:'費用',
            時間: keys[i],
            amount: monthlyProjectExpensesCosts?.[keys[i]]?.projectExpense,
          },
        )
      }
      console.log(data)
      const config = {
        data,
        isStack: true,
        xField: '時間',
        yField: 'amount',
        seriesField: 'type',
        interactions: [
          {
            type: 'active-region',
            enable: false,
          },
        ],
        legend: {
            position: 'top-left',
          },
        connectedArea: {
          style: (oldStyle, element) => {
            return {
              fill: 'rgba(0,0,0,0.25)',
              stroke: oldStyle.fill,
              lineWidth: 0.5,
            };
          },
        },
      };
    return (
        <div className='page'>
            <Card  title="每月專案費損" bordered={false} style={{ width: 1200 }} id='bigcard'>
                <Column {...config} />
            </Card>
            <Card  title="專案收入詳細資訊" bordered={false} style={{ width: 1200 }} id='bigcard'>
                <Table columns={Columns} dataSource={projectIncomeDetail} onChange={onChange} />
            </Card>
        </div>
        
      );
    };
    
export default ProjectPerformance;