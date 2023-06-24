import React , { useEffect, useState }from 'react';
import { Card,Table } from 'antd'; 
import '../App.css';
import { Pie, G2 } from '@ant-design/plots';

const AccPayReceive = () => {
    const [receiveList, setreceiveList]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/accPayReceive/receiveList")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setreceiveList(data.data);
        });
      },[]);
    const [payList, setpayList]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/accPayReceive/payList")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setpayList(data.data);
        });
      },[]);
    const [receiveCompare, setreceiveCompare]=useState('');
    useEffect(()=>{
    fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/accPayReceive/receiveCompare?startYear=2023&endYear=2023&startMonth=4&endMonth=4")
        .then((data) => data.json())
        .then((data)=>{
        console.log(data);
        setreceiveCompare(data.data);
        });
    },[]);
    const [payCompare, setpayCompare]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/accPayReceive/payCompare?startYear=2023&endYear=2023&startMonth=4&endMonth=4")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setpayCompare(data.data);
        });
      },[]);
    const [receiveDetail, setreceiveDetail]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/accPayReceive/receiveDetail")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setreceiveDetail(data.data);
        });
      },[]);
    const receiveDetailColumns = [
    {
        title: '發票編號',
        dataIndex: 'receive_no',
        sorter: {
        compare: (a, b) => a.receive_no - b.receive_no,
        multiple: 3,
        },
    },
    {
        title: '對象',
        dataIndex: 'customer_name',
        sorter: {
        compare: (a, b) => a.customer_name - b.customer_name,
        multiple: 3,
        },
    },
    {
        title: '產品/專案',
        dataIndex:'type',
        sorter: {
        compare: (a, b) => a.type - b.type,
        multiple: 3,
        },
    },
    {
        title: '預計付款日',
        dataIndex: 'estimated_date',
        sorter: {
        compare: (a, b) => a.estimated_date - b.estimated_date,
        multiple: 3,
        },
    },
    {
        title: '帳齡',
        dataIndex: 'aging',
        sorter: {
        compare: (a, b) => a.aging - b.aging,
        multiple: 3,
        },
    },
    {
        title: '金額',
        dataIndex: 'salesAmount',
        sorter: {
        compare: (a, b) => a.salesAmount - b.salesAmount,
        multiple: 3,
        },
    },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    };
    const receiveDetailData=[]
    const projectIncomelength=receiveDetail?.projectIncome?.length
    for(let i=0;i<projectIncomelength;i++){
        receiveDetailData.push(
            {
                receive_no:receiveDetail?.projectIncome[i].receive_no,
                customer_name:receiveDetail?.projectIncome[i].buyer.customer_name,
                type:'專案',
                estimated_date:receiveDetail?.projectIncome[i].estimated_date,
                aging:receiveDetail?.projectIncome[i].aging,
                salesAmount:receiveDetail?.projectIncome[i].salesAmount,
            }
        )        
    }
    const G = G2.getEngine('canvas');
    const cfg = {
        appendPadding: 10,
        data:receiveCompare,
        angleField: 'ratio',
        colorField: 'name',
        radius: 0.75,
        legend: false,
        label: {
          type: 'spider',
          labelHeight: 40,
          formatter: (data, mappingData) => {
            const group = new G.Group({});
            group.addShape({
              type: 'circle',
              attrs: {
                x: 0,
                y: 0,
                width: 40,
                height: 50,
                r: 5,
                fill: mappingData.color,
              },
            });
            group.addShape({
              type: 'text',
              attrs: {
                x: 10,
                y: 8,
                text: `${data.name}`,
                fill: mappingData.color,
              },
            });
            group.addShape({
              type: 'text',
              attrs: {
                x: 0,
                y: 25,
                text: `金額：${data.amount.toLocaleString()}`,
                fill: 'rgba(0, 0, 0, 0.65)',
                fontWeight: 700,
              },
            });
            
            return group;
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
      };

      const cfg_pay = {
        appendPadding: 10,
        data:payCompare,
        angleField: 'ratio',
        colorField: 'name',
        radius: 0.75,
        legend: false,
        label: {
          type: 'spider',
          labelHeight: 40,
          formatter: (data, mappingData) => {
            const group = new G.Group({});
            group.addShape({
              type: 'circle',
              attrs: {
                x: 0,
                y: 0,
                width: 40,
                height: 50,
                r: 5,
                fill: mappingData.color,
              },
            });
            group.addShape({
              type: 'text',
              attrs: {
                x: 10,
                y: 8,
                text: `${data.name}`,
                fill: mappingData.color,
              },
            });
            group.addShape({
              type: 'text',
              attrs: {
                x: 0,
                y: 25,
                text: `金額：${data.cost_amount.toLocaleString()}`,
                fill: 'rgba(0, 0, 0, 0.65)',
                fontWeight: 700,
              },
            });
            
            return group;
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
      };
      
    const productSalesRecordlength=receiveDetail?.productSalesRecord?.length
    for(let i=0;i<productSalesRecordlength;i++){
        receiveDetailData.push(
            {
                receive_no:receiveDetail?.productSalesRecord[i].receive_no,
                customer_name:receiveDetail?.productSalesRecord[i].buyer.customer_name,
                type:'產品',
                estimated_date:receiveDetail?.productSalesRecord[i].estimated_time,
                aging:receiveDetail?.productSalesRecord[i].aging,
                salesAmount:receiveDetail?.productSalesRecord[i].salesAmount,
            }
        )        
    }
    console.log(receiveDetailData)

    return (
        <div className='page'>
            <h1>應收應付帳款</h1>
            (所有資料累積至yyyy/mm/dd)
            <h3 className='pl'>概覽</h3>
            <Card  title="目前應收帳款" bordered={false} style={{ width: 1200 }} id='bigcard' >
                <div className='container'>
                    <div className='card'>
                        <text className='cardText'>本月應收</text>
                        <text className='amount'>
                            <h2 id='dollarsign'>$</h2>
                            <h2 class='number'>{receiveList?.currMonthReceive && receiveList.currMonthReceive.toLocaleString()}</h2>
                        </text>              
                    </div>
                    <div className='card'>
                        <text className='cardText'>下月應收</text>
                        <text className='amount'>
                        <h2 id='dollarsign'>$</h2>
                        <h2 class='number' >{receiveList?.nextMonthReceive && receiveList.nextMonthReceive.toLocaleString()}</h2>
                        </text>
                    </div>
                    <div className='card'>
                        <text className='cardText'>本季應收</text>
                        <text className='amount'>
                        <h2 id='dollarsign'>$</h2>
                        <h2 class='number' >{receiveList?.currSeasonReceive && receiveList.currSeasonReceive.toLocaleString()}</h2>
                        </text>
                    </div>
                    <div className='card'id='lastcard'>
                        <text className='cardText'>今年應收</text>
                        <text className='amount'>
                        <h2 id='dollarsign'>$</h2>
                        <h2 class='number' >{receiveList?.currYearReceive && receiveList.currYearReceive.toLocaleString()}</h2>
                        </text>
                    </div>
                </div>
            </Card>
            <Card  title="目前應付帳款" bordered={false} style={{ width: 1200 }}id='bigcard'>
                <div className='container'>
                        <div className='card'>
                            <text className='cardText'>本月應付</text>
                            <text className='amount'>
                                <h2 id='dollarsign'>$</h2>
                                <h2 class='number'>{payList?.currMonth && payList.currMonth.toLocaleString()}</h2>
                            </text>              
                        </div>
                        <div className='card'>
                            <text className='cardText'>下月應付</text>
                            <text className='amount'>
                            <h2 id='dollarsign'>$</h2>
                            <h2 class='number' >{payList?.nextMonth && payList.nextMonth.toLocaleString()}</h2>
                            </text>
                        </div>
                        <div className='card'>
                            <text className='cardText'>本季應付</text>
                            <text className='amount'>
                            <h2 id='dollarsign'>$</h2>
                            <h2 class='number' >{payList?.currSeason && payList.currSeason.toLocaleString()}</h2>
                            </text>
                        </div>
                        <div className='card' id='lastcard'>
                            <text className='cardText'>今年應付</text>
                            <text className='amount'>
                            <h2 id='dollarsign'>$</h2>
                            <h2 class='number' >{payList?.currYear && payList.currYear.toLocaleString()}</h2>
                            </text>
                        </div>
                </div>
            </Card>
            <div className='twoCard'>
                <Card  title="應收項目比較" bordered={false} style={{ width: 590 }} id='bigcard'>
                    <Pie {...cfg} />
                </Card>
                <Card  title="應付項目比較" bordered={false} style={{ width: 590 }}id='bigcard'>
                <Pie {...cfg_pay} />
                </Card>
            </div>
            <Card  title="應收項目詳細資料" bordered={false} style={{ width: 1200 }} id='bigcard'>
                <Table columns={receiveDetailColumns} dataSource={receiveDetailData} onChange={onChange} />;
            </Card>
                
            
          
        </div>
      );
    };
    
export default AccPayReceive;