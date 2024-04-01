import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children}) => {
  return (
    <>
      <Header/>
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;