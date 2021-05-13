import Head from "next/head";
import Link from "next/link";

export default () => (
  <header className="header">
    <Head>
      <title>必应每日高清壁纸 - 精彩，从这里开始</title>
      <link rel="icon" href="/bing.ico" />
    </Head>
    <div className="container h-container">
      <h1>必应壁纸</h1>
      <ul>
        <li>
          <Link href="/about">
            <a>关于</a>
          </Link>
        </li>
      </ul>
    </div>
  </header>
);
