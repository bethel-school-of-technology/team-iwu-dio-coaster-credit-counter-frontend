import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN_NAME } from '../Login/components/apiConstants';
import Carousel from '../slideshow/controls';
import SearchBar from '../SearchBar/components/searchBar';

import DisplayBucketList from '../DisplayDBData/displayBucketList';


function BucketList() {
    const [bucketList, setBucketList] = useState([])
    useEffect(() => {
        fetch("http://localhost:7080/coasters/bucketlist")
        .then(response => response.json())
        .then(json => setBucketList(json));
    }, []);

    const [state, setState] = useState({
        coaster: "",
        park: "",
        successMessage: ""
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const sendDetailsToServer = () => {
        if (state.coaster.length && state.park.length) {
            const payload = {
                "coaster": state.coaster,
                "park": state.park,
            }
            const apiBaseUrl = "http://localhost:7080"
            let config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            }
            axios.post(apiBaseUrl + '/coasters/bucketlist', payload, config)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Coaster successfully added!'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        
                        // bucketList.push(response.data)
                        // if the post request is successful
                             // update the bucketlist inside the displayBucketList 
                    } else {
                        // props.showError("some error ocurred")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            // props.showError('Something went wrong')
        }
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer();
    }

    return (
        <div className="card col-12 col-lg-4 addCoaster-card mt-2 hv-center">
            <SearchBar />
            <h2>My Bucket List</h2>
            <Carousel />
            
            <div>

                <DisplayBucketList />

                <form>
                    <div className="form-group text-left">
                        <label htmlFor="addcoaster" type="text">Add Coaster</label>
                        <input
                            type="coaster"
                            className="form-control"
                            id="coaster"
                            placeholder="Add Coaster"
                            value={state.coaster}
                            onChange={handleChange} />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="addpark" type="text">Add Park</label>
                        <input type="addPark"
                            className="form-control"
                            id="park"
                            placeholder="Add Park"
                            value={state.park}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmitClick}
                        >Add
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )

}

export default BucketList;