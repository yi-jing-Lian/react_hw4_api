import React , { useEffect, useState }from 'react';
import { Card } from 'antd'; 
import '../App.css';
import './Cashflow.css';
import { G2, Line } from '@ant-design/plots';

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
  const keys = Object.keys(trendAnalystic);
  const data=[]
  for(var i=0 ; i < 12 ; i++){
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
      
  return (
    <div className='page'>
      <Card  title="每月現金流量趨勢" bordered={false} style={{ width: 1200 }} >
        <Line {...config} />;
      </Card>
      <br></br>
      <Card  title="每月淨現金、現金水位趨勢" bordered={false} style={{ width: 1200 }} >
        {/* <Column {...config} />; */}
      </Card>
      <br></br>
      <div className='cashflowCompare'>
        <Card  title="現金流入項目比較" bordered={false} style={{ width: 590 }} >
          {/* <Column {...config} />; */}
        </Card>
        <Card  title="現金流出項目比較" bordered={false} style={{ width: 590 }} >
          {/* <Column {...config} />; */}
        </Card>
      </div>
      
    </div>
  );
};

export default Cashflow;