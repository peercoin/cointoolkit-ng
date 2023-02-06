import { Route, Routes } from "react-router-dom";
import GenerateAddress from "../components/addresses/defaultaddress";
import HdAddress from "../components/addresses/hdaddress";
import MultiSigAddress from "../components/addresses/multisigaddress";
import SigWitAddress from "../components/addresses/sigwitaddress";
import TimeLockedAddress from "../components/addresses/timelockedaddress";

function Address() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GenerateAddress />} />
        <Route path="/sigwit" element={<SigWitAddress />} />
        <Route path="/multisig" element={<MultiSigAddress />} />
        <Route path="/timelocked" element={<TimeLockedAddress />} />
        <Route path="/hdwallet" element={<HdAddress />} />
      </Routes>
    </div>
  );
}

export default Address;
