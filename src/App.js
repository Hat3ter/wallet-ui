import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import WalletList from "./components/wallet/WalletList";
import {connect} from "react-redux";

function App() {
    return (
        <div className="App">
            <div className="container-sm">
                <div className="row">
                    <div className="col">
                        <WalletList/>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default connect()(App);
