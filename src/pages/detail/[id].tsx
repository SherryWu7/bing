import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import Head from 'next/head';
import { fetchPictureDetail } from '@/actions/home';
import { QINIU_IMAGE_URL } from '@/lib/constants';
import styles from '@/styles/detail.less';

export default ({ detail }: any) => {
  const { url, title, datetime, author, country, copyrightlink, likes, views } = detail;
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [footerVisible, setFooterVisible] = useState<boolean>(true);

  // 全屏
  const setBrowserFullScreen = () => {
    const el = document.documentElement;
    const rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (typeof rfs != 'undefined' && rfs) {
      rfs.call(el);
      setTimeout(() => {
        setFullScreen(true);
      }, 100);
    }
    return;
  };

  // 退出全屏
  const exitScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const isFullscreen = () => {
    return document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ? true : false;
  };

  useEffect(() => {
    window.onresize = function() {
      if (fullScreen && !isFullscreen()) {
        setFullScreen(false);
      }
    };
  });
  return (
    <>
      <Head>
        <title>{title} - 必应每日高清壁纸</title>
      </Head>
      <div className={classnames('full-screen', styles.screen)}>
        <div>
          <img src={QINIU_IMAGE_URL + url} title={title} />
          {fullScreen ? (
            <a className={styles.iconScreen} title='退出全屏' onClick={exitScreen}>
              <i className='iconfont icon-fullscreen-exit text-md' />
            </a>
          ) : (
            <a className={styles.iconScreen} title='全屏' onClick={setBrowserFullScreen}>
              <i className='iconfont icon-fullscreen text-md' />
            </a>
          )}
        </div>
        <span className={classnames(styles.iconAction, { [styles.iconActionHide]: !footerVisible })} onClick={() => setFooterVisible(!footerVisible)}>
          {footerVisible ? <i className='iconfont icon-doubledown' /> : <i className='iconfont icon-doubleup' />}
        </span>
      </div>
      <section className={classnames('affix', { [styles.affixHide]: !footerVisible })}>
        <div className={classnames('container', styles.footer)}>
          <div className={styles.info}>
            <div className={styles.title}>
              {title}
              <a href={copyrightlink} target='_blank'>
                <i className='iconfont icon-info-circle' />
              </a>
            </div>
            <div className={styles.action}>
              <span title='浏览量'>
                <b className='iconfont icon-eye' />
                <small>{views || 999}</small>
              </span>
              <span title='喜欢'>
                <b className='iconfont icon-heart' />
                <small>{likes || 999}</small>
              </span>
              {/* <span title="评论">
              <b className="iconfont icon-message text-md" />
              <small>{likes || 999}</small>
            </span> */}
            </div>
          </div>
          <div className={styles.desc}>
            <span>
              <i className='iconfont icon-time-circle-fill text-md' />
              {datetime}
            </span>
            {author ? (
              <span>
                <i className='iconfont icon-copyright-circle-fill text-md' />
                {author}
              </span>
            ) : null}
            {country ? (
              <span>
                <i className='iconfont icon-location-fill text-md' />
                {country}
              </span>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps({ params }: any) {
  const { data }: any = await fetchPictureDetail({
    id: params.id,
  });
  return {
    props: {
      detail: data[0],
    },
  };
}
