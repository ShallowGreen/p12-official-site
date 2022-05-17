import * as React from 'react';
import { useGlobal } from '@/hooks/useGlobal';
interface IVisionProps {
}

const Vision: React.FunctionComponent<IVisionProps> = (props) => {
    const { pageID, setPageID} = useGlobal();
    console.log(pageID, 'vision');
    
  return <div>
      主页
  </div>;
};

export default Vision;
