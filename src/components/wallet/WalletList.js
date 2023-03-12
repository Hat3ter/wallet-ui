import React, {useEffect, useState} from "react";
import Wallet from "./Wallet";
import NewCardModal from "../operations/NewCardModal";
import {connect, useDispatch, useSelector} from "react-redux";
import {initCards} from "../../redux/cardActions";
import store from "../../redux/store";

function WalletList() {

    const cardSelector = useSelector(state => state.value);
    const dispatch = useDispatch();
    const [showAddCard, setShowAddCard] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {

        const fetchData = async () => {
            const data = await fetch('http://localhost:8080/wallets');
            const json = await data.json();
            dispatch(initCards(json.data))
        }
        fetchData().catch(console.error)
    }, [cardSelector, dispatch]);


    function openAddCard() {
        console.log("modal")
        setShowAddCard(!showAddCard);
    }

    function renderError() {
        if (error) {
            return <p className="alert-danger align-content-center">{error}</p>
        }
    }

    return (
        <div className="container">
            {renderError()}

            <div className="d-flex align-content-around flex-wrap">
                {store.getState().map(value => {
                    return <div key={value.id} className="p-2">
                        <Wallet key={value.id} value={value} setError={setError}/>
                    </div>
                })}
            </div>

            <i className="bi bi-file-plus" onClick={() => openAddCard()}></i>
            <NewCardModal hiden={showAddCard} setShowAddCard={setShowAddCard} setError={setError}/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        cards: state
    };
}

export default connect(mapStateToProps)(WalletList);