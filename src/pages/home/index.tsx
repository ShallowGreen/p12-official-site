import React, { useEffect } from 'react';
import { MENU_LIST, MenuListType } from '@/constant/menuConfig';
import { useGlobal } from '@/hooks/useGlobal';
import { useWeb3 } from '@/hooks/useWeb3';
import { PageIDType } from '@/constant';
import { useDebounceFn } from 'ahooks';
import classnames from 'classnames';
import { indexOf } from 'lodash-es';
import { EE } from './index.utils';
import styles from './index.less';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const { pageID, setPageID, isLoading } = useGlobal();
    const { address, connect, disconnect } = useWeb3();

    useEffect(() => {
        if (isLoading) {
            EE.on('done', () => {
                setPageID(PageIDType.Vision)
            })
        }
        return () => {
            EE.off('done')
        }
    }, [isLoading, setPageID])

    const { run } = useDebounceFn(
        (dy: number) => {
            const pageArray = MENU_LIST.filter(i => i.type !== PageIDType.Loading).map(i => i.type);

            let index = indexOf(pageArray, pageID);
            const length = pageArray.length;
            // 如果当前是第一页，只能往后滚，如果当前是最后一页，只能往前滚
            // 最大翻页数， 默认为1
            const maxTurn = 1;

            if (dy > 0) {
                // 下一页，并且当前页不能是最后一页
                if (index !== length - 1) {
                    index++;
                } else {
                    return
                }
            } else {
                if (index !== 0) {
                    index--;
                } else {
                    return
                }
            }

            setPageID(pageArray[index]);
        },
        {
            wait: 500,
        },
    );

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        // 如果正在加载界面或者已经正在滚动，不处理
        if (isLoading) {
            return
        }

        // 轻微滚动不跳页
        if (Math.abs(e.deltaY) < 30) {
            return
        }
        // 500ms防抖，只执行最后一次
        run(e.deltaY);
    }

    const connectToggle = async () => {
        try {
            if (address) {
                disconnect();
                alert(
                    'To fully disconnect, click "Connected" on MetaMask and disconnect your account.',
                );
            } else {
                await connect();
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown Error';
            alert(`Connection attempt failed: ${errorMessage}`);
        }
    };

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
        {/* 钱包连接 */}
        <div className={styles.wallet} onClick={connectToggle}>
            {address ? 'Disconnect' : 'Connect Wallet'}
        </div>

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
