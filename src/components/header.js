import { Link } from "react-router-dom";

function Header() {
  return (
    <div id="header" className="navbar navbar-default " role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a href="/" className="navbar-brand" id="homeBtn">
            Cointoolkit
          </a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a href="!#" className="dropdown-toggle" data-toggle="dropdown">
                <span className="glyphicon glyphicon-plus"></span> New
                <b className="caret"></b>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/address">Address</Link>
                </li>
                <li>
                  <Link to="/address/sigwit">SegWit Address</Link>
                </li>
                <li>
                  <Link to="/address/multisig">MultiSig Address</Link>
                </li>
                <li>
                  <Link to="/address/timelocked">Time Locked Address</Link>
                </li>
                <li>
                  <Link to="/address/hdwallet">HD Address</Link>
                </li>
                <li className="divider"></li>
                <li>
                  <Link to="/transaction">Transaction</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/verify">
                <span className="glyphicon glyphicon-ok"></span> Verify
              </Link>
            </li>
            <li>
              <Link to="/sign">
                <span className="glyphicon glyphicon-pencil"></span> Sign
              </Link>
            </li>
            <li>
              <Link to="/broadcast">
                <span className="glyphicon glyphicon-globe"></span> Broadcast
              </Link>
            </li>
            <li className="hidden">
              <a href="#wallet">
                <span className="glyphicon glyphicon-briefcase"></span> Wallet
              </a>
            </li>
            <li>
              <Link to="/about">
                <span className="glyphicon glyphicon-info-sign"></span> About
              </Link>
            </li>

            <li>
              <Link to="/settings">
                <span className="glyphicon glyphicon-cog"></span> Settings
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-right">
            <li>
              <div
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  lineHeight: "20px",
                }}
              >
                <span>Peercoin Testnet</span>
                {/* :<select id="coinSelector"></select> */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
