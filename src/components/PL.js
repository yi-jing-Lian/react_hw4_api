import React , { useEffect, useState }from 'react';
import { Card } from 'antd'; 
import '../App.css';
import { Column } from '@ant-design/plots';

const PL = () => {
  const [accumulatedEarnings, setaccumulatedEarnings]=useState('');
    useEffect(()=>{
      fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/comprehensiveIncomeAnalysis/accumulatedEarnings")
        .then((data) => data.json())
        .then((data)=>{
          console.log(data);
          setaccumulatedEarnings(data);
        });
      },[]);
  const [monthlyIncome, setmonthlyIncome]=useState('');
  useEffect(()=>{
    fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/comprehensiveIncomeAnalysis/monthlyIncome")
      .then((data) => data.json())
      .then((data)=>{
        console.log(data);
        setmonthlyIncome(data.data);
      });
    },[]);
  const [monthlyExpensesCosts, setmonthlyExpensesCosts]=useState('');
  useEffect(()=>{
    fetch("http://ec2-35-77-78-80.ap-northeast-1.compute.amazonaws.com:8000/api/comprehensiveIncomeAnalysis/monthlyExpensesCosts")
      .then((data) => data.json())
      .then((data)=>{
        console.log(data);
        setmonthlyExpensesCosts(data.data);
      });
    },[]);
  const formatNumber = (number) => {
    if (typeof number === 'number') {
      return number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return "";
  };
  const getNumberColor = (number) => {
    return number < 0 ? '#f2753f' : '#007eae';
  };
  const keys = Object.keys(monthlyIncome);
  const data=[]
  for(var i=0 ; i < 12 ; i++){
    data.push(
      {
        name: '營業淨利',
        時間: keys[i],
        value: monthlyIncome?.[keys[i]]?.netOperatingRevenue,
      },
      {
        name: '營業毛利',
        時間: keys[i],
        value: monthlyIncome?.[keys[i]]?.grossProfit,
      },
      {
        name: 'netMargin',
        時間: keys[i],
        value: monthlyIncome?.[keys[i]]?.netMargin,
      },
    )
  }
  const ExpenseData=[]
  for(var i=0 ; i < 12 ; i++){
    ExpenseData.push(
      {
        name: '營業成本',
        時間: keys[i],
        value: monthlyExpensesCosts?.[keys[i]]?.operatingCost,
      },
      {
        name: '營業費用',
        時間: keys[i],
        value: monthlyExpensesCosts?.[keys[i]]?.operatingExpense,
      },
    )
  }
 
  const config = {
    data,
    isGroup: true,
    xField: '時間',
    yField: 'value',
    seriesField: 'name',
    xAxis: {
      // type: 'timeCat',
      tickCount: 7,
    },
  };

  const config_expense = {
    data:ExpenseData,
    isGroup: true,
    xField: '時間',
    yField: 'value',
    seriesField: 'name',
    xAxis: {
      // type: 'timeCat',
      tickCount: 7,
    },
  };
  return (
    <div className='page'>
      <h1>綜合損益分析</h1>
      (所有資料累積至yyyy/mm/dd)
      <h3 className='pl'>累計損益</h3>
      <Card  title="累計損益" bordered={false} style={{ width: 1200 }} >
      <div className='container'>
        <div className='card'>
            <text className='cardText'>營收淨額</text>
            <text className='amount'>
              <h2 id='dollarsign'>$</h2>
              <h2 class='number'style={{ color: getNumberColor(accumulatedEarnings?.netOperatingRevenue) }}>{accumulatedEarnings?.netOperatingRevenue && accumulatedEarnings.netOperatingRevenue.toLocaleString()}</h2>
            </text>
            <text className='cardText' id='percent' style={{ color: getNumberColor(accumulatedEarnings?.netOperatingRevenuePer) }}>{ accumulatedEarnings?.netOperatingRevenuePer}%</text>          
        </div>
        <div className='card'>
            <text className='cardText'>營業成本</text>
            <text className='amount'>
              <h2 id='dollarsign'>$</h2>
              <h2 class='number' style={{ color: getNumberColor(accumulatedEarnings?.totalOperatingCost) }}>{accumulatedEarnings?.totalOperatingCost && accumulatedEarnings.totalOperatingCost.toLocaleString()}</h2>
            </text>
            <text className='cardText' id='percent' style={{ color: getNumberColor(accumulatedEarnings?.operatingCostPer) }}>{ formatNumber(accumulatedEarnings?.operatingCostPer)}%</text>          
        </div>
        <div className='card'>
            <text className='cardText'>營業毛利</text>
            <text className='amount'>
              <h2 id='dollarsign'>$</h2>
              <h2 class='number' style={{ color: getNumberColor(accumulatedEarnings?.operatingProfit) }}>{accumulatedEarnings?.operatingProfit && accumulatedEarnings.operatingProfit.toLocaleString()}</h2>
            </text>
            <text className='cardText' id='percent' style={{ color: getNumberColor(accumulatedEarnings?.operatingProfitPer) }}>{ formatNumber(accumulatedEarnings?.operatingProfitPer)}%</text>          
        </div>
        <div className='card'>
            <text className='cardText'>營業費用</text>
            <text className='amount'>
              <h2 id='dollarsign'>$</h2>
              <h2 class='number' style={{ color: getNumberColor(accumulatedEarnings?.operatingExpense) }}>{accumulatedEarnings?.operatingExpense && accumulatedEarnings.operatingExpense.toLocaleString()}</h2>
            </text>
            <text className='cardText' id='percent' style={{ color: getNumberColor(accumulatedEarnings?.operatingExpensePer) }}>{ formatNumber(accumulatedEarnings?.operatingExpensePer)}%</text>          
        </div>
        <div className='card' id='lastcard'>
            <text className='cardText'>營業淨利</text>
            <text className='amount'>
              <h2 id='dollarsign'>$</h2>
              <h2 class='number' style={{ color: getNumberColor(accumulatedEarnings?.operatingNetProfit) }}>{accumulatedEarnings?.operatingNetProfit && accumulatedEarnings.operatingNetProfit.toLocaleString()}</h2>
            </text>
            <text className='cardText' id='percent' style={{ color: getNumberColor(accumulatedEarnings?.operatingNetProfitPer) }}>{ formatNumber(accumulatedEarnings?.operatingNetProfitPer)}%</text>          
        </div>
      </div>
      </Card>

      <br></br>
      <Card  title="每月收益" bordered={false} style={{ width: 1200 }} >
        <Column {...config} />
      </Card>
      <br></br>
      <Card  title="每月費損" bordered={false} style={{ width: 1200 }} >
      <Column {...config_expense} />      
      </Card>
    </div>
  );
};

export default PL;