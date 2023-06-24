import { FaBoxOpen,FaFileAlt } from "react-icons/fa";
import { Menu } from 'antd';
import { useState } from 'react';
import {Link} from "react-router-dom";

const { SubMenu } = Menu;

function getItem(label, key, icon, children, link) {
  return {
    key,
    icon,
    children,
    link,
    label,
    
  };
}

const items = [
  getItem('財務', 'sub1', <FaBoxOpen />, [
    getItem('綜合損益分析', '1',null,null,'/PL'),
    getItem('現金流量分析', '2',null,null,'/Cashflow'),
    getItem('應收應付帳款', '3',null,null,'/AccPayReceive'),
    getItem('產品事業表現', '4'),
    getItem('專業事業表現', '5',null,null,'/ProjectPerformance'),
    getItem('零用金進出帳', '6'),
  ]),
  getItem('銷售', 'sub2', <FaFileAlt />, [
    getItem('銷售總覽', '7'),
    getItem('銷售分析', '8'),
  ]),
  
];

const rootSubmenuKeys = ['sub1', 'sub2'];

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 200,
        color:'#bbc6d6',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        overflowY: 'auto',
      }}
    >
      {items.map((item) =>
        item.children ? (
          <SubMenu key={item.key} icon={item.icon} title={item.label}  >
            {item.children.map((subItem) => (
               <Menu.Item key={subItem.key}><Link to={subItem.link}>{subItem.label}</Link></Menu.Item> 
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default Sidebar;