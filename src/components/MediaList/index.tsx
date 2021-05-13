import classnames from "classnames";
import { QINIU_IMAGE_URL } from "@/lib/constants";
import Link from "next/link";
import "./style.less";

export default ({ datas = [] }) => {
  // const infoCls = classnames("media-info", {
  //   [`media-info-${size}`]: size,
  // });
  return (
    <div className="list">
      {datas.map(({ id, thumbnail, title, datetime, likes, views }) => (
        <div className="list-item" key={id}>
          <div className="item-body">
            <div className="media">
              <Link href={`/detail/${id}`}>
                <a className="media-img" title={title}>
                  <img src={`${QINIU_IMAGE_URL}${thumbnail}`} />
                </a>
              </Link>
            </div>
            <div className="item-content">
              <div className="cont-title text-md">
                <Link href={`/detail/${id}`}>{title}</Link>
              </div>
              <div className="cont-info">
                <span>
                  <i className="iconfont icon-time-circle text-md" />
                  {datetime}
                </span>
                <span>
                  <span>
                    <i className="iconfont icon-eye text-md" />
                    {views || 0}
                  </span>
                  <span style={{ marginLeft: 10 }}>
                    <i className="iconfont icon-heart text-md" />
                    {likes || 0}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
