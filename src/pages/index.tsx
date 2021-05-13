import { fetchPictures } from "@/actions/home";
import Layout from "@/components/Layout";
import MediaList from "@/components/MediaList";
import { QINIU_IMAGE_URL } from "@/lib/constants";

export default ({ pictures }) => {
  return (
    <Layout style={{
      backgroundImage: `url(${QINIU_IMAGE_URL}${pictures[0]?.url})`,
    }}>
      <div className="container bg-light-gray">
        <MediaList datas={pictures}/>
        {/* {pictures.map((item) => <Media key={item.id} {...item} />)} */}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const {data} = await fetchPictures();
  return {
    props: {
      pictures: data,
    },
  };
}
