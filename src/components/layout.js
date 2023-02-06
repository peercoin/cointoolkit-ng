import Header from "./header";
import Modals from "./modals";

function Layout({ children }) {
  return (
    <>
      <div id="wrap">
        <Header />
        <div id="content" className="container">
          <div className="tab-content">
            {children}

            <br />
            <p className="text-muted">
              This page uses javascript to generate your addresses and sign your
              transactions within your browser, this means we <i>never</i>{" "}
              receive your private keys, this can be independently verified by
              reviewing the source code on{" "}
              <a
                href="https://github.com/backpacker69/cointoolkit"
                target="_blank"
                rel="noreferrer"
              >
                github
              </a>
              . You can even{" "}
              <a href="https://github.com/backpacker69/cointoolkit/archive/gh-pages.zip">
                download
              </a>{" "}
              this page and host it yourself or run it offline!
            </p>
            <br />
          </div>
        </div>{" "}
      </div>
      {/* <div id="footer">
        <div className="container text-right">
          <p className="text-muted">
            Donations accepted{" "}
            <a
              // onClick="$('#verifyScript').val('02be1bddb4fbeb12db49d6ca5fb70a5e99936352647f1a9c4c4af4b091dfbc39f7');$('#verifyBtn').click();"
              href="#verify"
            >
              here
            </a>
          </p>
        </div>
      </div> */}

      <Modals />
    </>
  );
}

export default Layout;
