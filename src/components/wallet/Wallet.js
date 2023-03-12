import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import {initCards} from "../../redux/cardActions";

function Wallet(props) {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState('');
    const [transferRecipientId, setTransferRecipientId] = useState(props.cards[0].id);

    const handleClose = () => {
        setShow(!show);
    }

    const handleChangeRecipient = (target) => {
        setTransferRecipientId(target.value);
        console.log(transferRecipientId)
    }

    const cashOperations = (walletId, inputCards, type, recipientId) => {

        function updateBalanceAndDispatch(data) {
            const updatedCardFromApi = data.data;
            const cards = inputCards.map(card => {
                if (card.id === walletId) {
                    card.balance = updatedCardFromApi.balance;
                }
                return card;
            })
            dispatch(initCards(cards));
        }

        const request = {amount};
        let url = ''

        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request)
        };

        switch (type) {
            case "CASH-IN":
                url = `http://localhost:8080/wallets/${walletId}/cash-in`;
                break;
            case "CASH-OUT":
                url = `http://localhost:8080/wallets/${walletId}/cash-out`;
                break;
            case "TRANSFER":
                url = `http://localhost:8080/wallets/${walletId}/transfer`;
                console.log("transferRecipientId", transferRecipientId)
                requestOptions.body = JSON.stringify({amount, walletId: recipientId})
                break;
            default :
                break;
        }

        async function asyncCashOperation(url, options) {

            await fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
                .then(data => {
                    if (type === "TRANSFER") {
                        const fetchData = async () => {
                            const data = await fetch('http://localhost:8080/wallets');
                            const json = await data.json();
                            console.log("JSON", json.data)

                            dispatch(initCards(json.data))
                        }
                        fetchData()
                    } else {
                        updateBalanceAndDispatch(data)
                    }
                })
                .catch(error => {
                    error.json().then((json: any) => {
                        console.log(json)
                        props.setError(json.errorMessage)
                    })
                });
        }

        asyncCashOperation(url, requestOptions);
        setAmount(null)
        handleClose();
        props.setError(null)

    }

    return (
        <div className="col">

            <div className={"card text-white  mb-4 card-size bg-primary"} onClick={handleClose}>
                <div className="card-header">{props.value.name ? props.value.name : 'Name'}</div>
                <div className="card-body">
                    <h5 className="card-title">
                        {`${props.value.balance}  ${props.value.currencyType}`}
                    </h5>
                    <span className="card-text">
                        <div>
                            <i className="bi-arrow-down-circle">Operations</i>
                        </div>
                    </span>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Card operations</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Pls choose the operation for card <strong>{props.value.name}</strong>,
                    balance <strong>{props.value.balance}</strong> {props.value.currencyType}
                </Modal.Body>

                <Modal.Footer>
                    <div className="input-group mb-3">
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <span className="input-group-text">0.00</span>
                            <input type="number" className="form-control"
                                   aria-label="Dollar amount (with dot and two decimal places)" value={amount}
                                   onChange={(event) => setAmount(event.target.value)}/>
                        </div>

                        <Button variant="primary"
                                onClick={() => cashOperations(props.value.id, props.cards, "CASH-IN")}>
                            cash-in
                        </Button>
                        <Button variant="primary"
                                onClick={() => cashOperations(props.value.id, props.cards, "CASH-OUT")}>
                            cash-out
                        </Button>

                        <select className="form-select" onChange={(event) => handleChangeRecipient(event.target)}>
                            {props.cards.map(card => {
                                return <option id={card.id} key={card.id} value={card.id}>{card.name}</option>
                            })}
                        </select>
                        <button className="btn btn-primary" type="button"
                                onClick={() => cashOperations(props.value.id, props.cards, "TRANSFER", transferRecipientId)}>
                            Transfer
                        </button>
                    </div>

                </Modal.Footer>

            </Modal>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        cards: state
    };
}


export default connect(mapStateToProps)(Wallet);