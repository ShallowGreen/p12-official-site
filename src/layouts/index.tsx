import React from 'react';
import styles from './index.css';
import { useGlobal } from '@/hooks/useGlobal';

const BasicLayout: React.FC = props => {
  const {pageID, setPageID} = useGlobal();

  const handleWheel = (e:React.WheelEvent<HTMLDivElement>) => {
    console.log(e.deltaY);
    // 如果正在加载界面或者已经正在滚动，不处理

    // 如果当前是第一页，只能往后滚，如果当前是最后一页，只能往前滚
    
  }
  return (
    <div className={styles.normal} onWheel={handleWheel}>
      {props.children}
    </div>
  );
};

export default BasicLayout;
