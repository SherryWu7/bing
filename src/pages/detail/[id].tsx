import classnames from "classnames";
import Head from "next/head";
import { fetchPictureDetail } from "@/actions/home";
import { QINIU_IMAGE_URL } from "@/lib/constants";
import styles from "@/styles/detail.module.less";

export default ({ detail }: any) => {
  const { url, title, datetime, likes, views } = detail;
  return (
    <>
      <Head>
        <title>{title} - 必应每日高清壁纸</title>
      </Head>
      <div className="full-screen">
        <div>
          <img src={QINIU_IMAGE_URL + url} title={title} />
        </div>
        <div className="container bg-light-gray">
          {/* {pictures.map((item) => <Media key={item.id} {...item} />)} */}
        </div>
      </div>
      <section className="affix">
        <div className={classnames("container", styles.footer)}>
          <div className={styles.title}>{title}</div>
          <div className={styles.action}>
            <span title="浏览量">
              <b className="iconfont icon-eye" />
              <small>{views || 999}</small>
            </span>
            <span title="喜欢">
              <b className="iconfont icon-heart" />
              <small>{likes || 999}</small>
            </span>
            {/* <span title="评论">
              <b className="iconfont icon-message text-md" />
              <small>{likes || 999}</small>
            </span> */}
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
