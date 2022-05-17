import React, {useEffect} from 'react';
import { MENU_LIST, MenuListType } from '@/constant/menuConfig';
import { useGlobal } from '@/hooks/useGlobal';
import { PageIDType } from '@/constant';
import classnames from 'classnames';
import { EE } from './index.utils';
import styles from './index.less';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const { pageID, setPageID, isLoading } = useGlobal();
    console.log(pageID, 'home');

    useEffect(()=> {
        if(isLoading){
            EE.on('done', ()=> {
                setPageID(PageIDType.Vision)
            })
        }
        return () => {
            EE.off('done')
        }
    }, [isLoading, setPageID])

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        console.log(e.deltaY);
        // 如果正在加载界面或者已经正在滚动，不处理

        // 如果当前是第一页，只能往后滚，如果当前是最后一夜，只能往前滚

    }

    return <div onWheel={handleWheel} className={classnames(styles.container, isLoading ? styles.appLoading : null)}>
        {/* Logo */}
        <div className={styles.logo}></div>
        {/* 导航 */}
        <div className={styles.menu}>
            {
                MENU_LIST.map((item: MenuListType[0]) => {
                    return item.menuTitle && (
                        <div key={item.menuTitle} className={styles.menuItem} onClick={() => setPageID(item.type)}>
                            {item.menuTitle.toLocaleUpperCase()}
                        </div>
                    )
                })
            }
        </div>
        {/* TODO 钱包连接 */}

        {/* 内容 */}
        <div className={styles.content}>
            {
                MENU_LIST.map((item: MenuListType[0]) => {
                    return <div key={item.type} className={classnames(styles.pageWrap, pageID === item.type ? styles.pageActive : null)}>
                        {item.component}
                    </div>
                })
            }
        </div>
    </div>;
};

export default Home;
