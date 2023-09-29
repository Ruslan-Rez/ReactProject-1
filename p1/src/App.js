import logo from './logo.svg';
import Header from "./components/fragments/Header";
import Footer from "./components/fragments/Footer";
import {Routes, Route } from 'react-router-dom';
import ProductList from "./components/products/ProductList";
import AddProduct from "./components/addProduct/AddProduct";
import ContactPage from "./components/contact/ContactPage";
import OurValues from "./components/ourValues/OurValues";
import Main from "./components/main/Main";
function App() {
  return (
    <>
      <Header />
      <Routes>
          <Route path="/">
              <Route index={true} element={<Main />} />
          </Route>
          <Route path="products">
              <Route index={true} element={<ProductList />} />
          </Route>
          <Route path="addProduct">
              <Route index={true} element={<AddProduct />} />
          </Route>
          <Route path="contact">
              <Route index={true} element={<ContactPage />} />
          </Route>
          <Route path="ourValues">
              <Route index={true} element={<OurValues />} />
          </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
