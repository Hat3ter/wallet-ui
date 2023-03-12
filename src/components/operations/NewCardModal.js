import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {appendCard} from "../../redux/cardActions";

function NewCardModal(props) {

    const dispatch = useDispatch();
    const [cardName, setCardName] = useState('')
    const [currency, setCurrency] = useState('USD')

    async function addNewCard() {

        const data = {
            walletName: cardName,
            currencyType: currency
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        await fetch("http://localhost:8080/wallets", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(data => {
                console.log(data.data);
                dispatch(appendCard(data.data));
                props.setShowAddCard(!props.hiden);
                props.setError(null);
            })
            .catch(error => {
                error.json().then((json: any) => {
                    console.log(json);
                    props.setError(json.errorMessage);
                })
            });
    }

    return (
        <div hidden={props.hiden}>
            <div className="card text-dark bg-light mb-4 card-size ">

                <div className="card-header">

                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Enter card name"
                                  onChange={(event) => setCardName(event.target.value)}></textarea>
                        <label htmlFor="floatingTextarea">Card name</label>

                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col">

                            <select onChange={(event) => setCurrency(event.target.value)}>
                                <option>USD</option>
                            </select>
                        </div>
                        <div className="col">
                            <button type="button" onClick={addNewCard}>Add new card</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NewCardModal;