import Header from "./Header";
import Footer from "./Footer";

export default ({ children = null, ...props }) => (
  <div className="page" {...props}>
    <Header />
    <div className="body">{children}</div>
    <Footer />
  </div>
);
