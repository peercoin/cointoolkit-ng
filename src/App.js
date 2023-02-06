import Address from "./pages/address";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/index";
import Transaction from "./pages/transaction";
import Verify from "./pages/verify";
import Sign from "./pages/sign";
import BroadCast from "./pages/broadcast";
import Settings from "./pages/settings";
import About from "./pages/about";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/broadcast" element={<BroadCast />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/address/*" element={<Address />} />
          <Route path="/transaction/*" element={<Transaction />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
