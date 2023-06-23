import React , { useEffect, useState }from 'react';
import { Card,Table } from 'antd'; 
import '../App.css';
import { G2, Line, Bar } from '@ant-design/plots';

const Cashflow = () => {
  const [trendAnalystic, settrendAnalystic]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/cashflow/trendAnalystic")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          settrendAnalystic(data.data);
        });
      },[]);
  const [levelTrend, setlevelTrend]=useState('');
  useEffect(()=>{
    fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/cashflow/levelTrend")
      .then((data) => data.json())
      .then((data)=>{
        console.log(data);
        setlevelTrend(data.data);
      });
    },[]);
  const [inflowAnalystic, setinflowAnalystic]=useState('');
  useEffect(()=>{
    fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/cashflow/inflowAnalystic")
      .then((data) => data.json())
      .then((data)=>{
        console.log(data);
        setinflowAnalystic(data.data);
      });
    },[]);

  const [outflowAnalystic, setoutflowAnalystic]=useState('');
  useEffect(()=>{
    fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/cashflow/outflowAnalystic")
      .then((data) => data.json())
      .then((data)=>{
        console.log(data);
        setoutflowAnalystic(data.data);
      });
    },[]);

    const [futureInflow, setfutureInflow]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/cashflow/futureInflow")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setfutureInflow(data.data);
        });
      },[]);

    const [futureOutflow, setfutureOutflow]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/cashflow/futureOutflow")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setfutureOutflow(data.data);
        });
      },[]);

    const [inflowDetail, setinflowDetail]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/cashflow/inflowDetail")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setinflowDetail(data.data);
        });
      },[]);


  const keys = Object.keys(trendAnalystic);
  const data=[]
  for(var i=0 ; i < keys.length ; i++){
    data.push(
      {
        name: '流入量',
        時間: keys[i],
        value: trendAnalystic?.[keys[i]]?.entry_amount,
      },
      {
        name: '流出量',
        時間: keys[i],
        value: trendAnalystic?.[keys[i]]?.exit_amount,
      },
      {
        name: '淨現金流量',
        時間: keys[i],
        value: trendAnalystic?.[keys[i]]?.netCashflow,
      },
    )
  }
  const levelTrendData=[]
  for(var i=0 ; i < 12 ; i++){
    levelTrendData.push(
      {
        name: '淨現金流',
        時間: keys[i],
        value: levelTrend?.[keys[i]]?.netCashflow,
      },
      {
        name: '現金水位',
        時間: keys[i],
        value: levelTrend?.[keys[i]]?.balance,
      },
    )
  }

  const inflowAnalysticData=[
    {
      name:'營運',
      amount:inflowAnalystic?.營運?.entry_amount,
    },
    {
      name:'投資',
      amount:inflowAnalystic?.投資?.entry_amount,
    },
    {
      name:'融資',
      amount:inflowAnalystic?.融資?.entry_amount,
    }
  ]

  const outflowAnalysticData=[
    {
      name:'營運',
      amount:outflowAnalystic?.營運?.exit_amount,
    },
    {
      name:'投資',
      amount:outflowAnalystic?.投資?.exit_amount,
    },
    {
      name:'融資',
      amount:outflowAnalystic?.融資?.exit_amount,
    }
  ]

  const futureInflowKeys = Object.keys(futureInflow);
  const futureInflowData=[]
  for(var i=0 ; i < futureInflowKeys.length ; i++){
    futureInflowData.push(
      {
        name: 'funtureInflow',
        時間: futureInflowKeys[i],
        金額: futureInflow?.[futureInflowKeys[i]]?.funtureInflow,
      },
    )
  }

  const futureOutflowKeys = Object.keys(futureOutflow);
  const futureOutflowData=[]
  for(var i=0 ; i < futureOutflowKeys.length ; i++){
    futureOutflowData.push(
      {
        name: 'funtureOutflow',
        時間: futureOutflowKeys[i],
        金額: futureOutflow?.[futureOutflowKeys[i]]?.funtureOutflow,
      },
    )
  }

  const inflowDetailColumns = [
    {
      title: '帳目時間',
      dataIndex: 'time',
      sorter: {
        compare: (a, b) => a.time - b.time,
        multiple: 3,
      },
    },
    {
      title: '銀行代碼',
      dataIndex: 'bank_code',
      sorter: {
        compare: (a, b) => a.bank_code - b.bank_code,
        multiple: 3,
      },
    },
    {
      title: '銀行帳戶',
      dataIndex: 'bank_acc',
      sorter: {
        compare: (a, b) => a.bank_acc - b.bank_acc,
        multiple: 3,
      },
    },
    {
      title: '帳目類別',
      dataIndex: 'category',
      sorter: {
        compare: (a, b) => a.category - b.category,
        multiple: 3,
      },
    },
    {
      title: '出帳金額',
      dataIndex: 'exit_amount',
      sorter: {
        compare: (a, b) => a.exit_amount - b.exit_amount,
        multiple: 3,
      },
    },
    {
      title: '入帳金額',
      dataIndex: 'entry_amount',
      sorter: {
        compare: (a, b) => a.entry_amount - b.entry_amount,
        multiple: 3,
      },
    },
    {
      title: '帳目事由',
      dataIndex: 'entry_and_exit',
      sorter: {
        compare: (a, b) => a.entry_and_exit - b.entry_and_exit,
        multiple: 3,
      },
    },
    {
      title: '帳戶餘額',
      dataIndex: 'balance',
      sorter: {
        compare: (a, b) => a.balance - b.balance,
        multiple: 3,
      },
    },  
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  G2.registerShape('point', 'breath-point', {
    draw(cfg, container) {
      const data = cfg.data;
      const point = {
        x: cfg.x,
        y: cfg.y,
      };
      const group = container.addGroup();
      return group;
    },
  });
  const config = {
    autoFit: true,
    height: 500,
    data,
    meta: {
      cpu: {
        time: {
          type: 'cat',
        },
        max: 100,
        min: 0,
      },
    },
    xField: '時間',
    yField: 'value',
    seriesField: 'name',
    tooltip: {
      showMarkers: false,
    },
    point: {
      shape: 'breath-point',
    },
  };

 
  const levelTrendConfig = {
    autoFit: true,
    height: 500,
    data:levelTrendData,
    meta: {
      cpu: {
        time: {
          type: 'cat',
        },
        max: 100,
        min: 0,
      },
    },
    xField: '時間',
    yField: 'value',
    seriesField: 'name',
    tooltip: {
      showMarkers: false,
    },
    point: {
      shape: 'breath-point',
    },
  };

  const inflowAnalysticConfig = {
    data:inflowAnalysticData,
    xField: 'amount',
    yField: 'name',
    seriesField: 'name',
    legend: {
      position: 'right-top',
    },
  };

  const outflowAnalysticConfig = {
    data:outflowAnalysticData,
    xField: 'amount',
    yField: 'name',
    seriesField: 'name',
    legend: {
      position: 'right-top',
    },
  };

  const futureInflowConfig = {
    autoFit: true,
    height: 500,
    data:futureInflowData,
    meta: {
      cpu: {
        time: {
          type: 'cat',
        },
        max: 100,
        min: 0,
      },
    },
    xField: '時間',
    yField: '金額',
    seriesField: 'name',
    tooltip: {
      showMarkers: false,
    },
    point: {
      shape: 'breath-point',
    },
  };

  const futureOutflowConfig = {
    autoFit: true,
    height: 500,
    data:futureOutflowData,
    meta: {
      cpu: {
        time: {
          type: 'cat',
        },
        max: 100,
        min: 0,
      },
    },
    xField: '時間',
    yField: '金額',
    seriesField: 'name',
    tooltip: {
      showMarkers: false,
    },
    point: {
      shape: 'breath-point',
    },
  };
      
  return (
    <div className='page'>
      <Card  title="每月現金流量趨勢" bordered={false} style={{ width: 1200 }} >
        <Line {...config} />
      </Card>
      <br></br>
      <Card  title="每月淨現金、現金水位趨勢" bordered={false} style={{ width: 1200 }} >
        <Line {...levelTrendConfig} />
      </Card>
      <br></br>
      <div className='twoCard'>
        <Card  title="現金流入項目比較" bordered={false} style={{ width: 590 }} >
          <Bar {...inflowAnalysticConfig} />
        </Card>
        <Card  title="現金流出項目比較" bordered={false} style={{ width: 590 }} >
          <Bar {...outflowAnalysticConfig} />
        </Card>
      </div>
      <br></br>
      <div className='twoCard'>
        <Card  title="未來預計現金流入量" bordered={false} style={{ width: 590 }} >
          <Line {...futureInflowConfig} />
        </Card>
        <Card  title="未來預計現金流出量" bordered={false} style={{ width: 590 }} >
        <Line {...futureOutflowConfig} />
        </Card>
      </div>
      <Card  title="現金流量詳細資訊" bordered={false} style={{ width: 1200 }} >
        <Table columns={inflowDetailColumns} dataSource={inflowDetail} onChange={onChange} />
      </Card>
    </div>
  );
};

export default Cashflow;