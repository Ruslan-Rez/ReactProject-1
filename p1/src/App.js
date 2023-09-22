import logo from './logo.svg';
import Header from "./components/fragments/Header";
import Footer from "./components/fragments/Footer";
import {Routes, Route } from 'react-router-dom';
import ProductList from "./components/products/ProductList";
function App() {
  return (
    <>
      <Header />
      <Routes>
          <Route path="products">
              <Route index={true} element={<ProductList />} />
          </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
