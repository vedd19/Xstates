import React, { useEffect, useState } from 'react';

export default function Xstates() {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");


    useEffect(() => {
        setStates([]);
        setCities([]);
        setSelectedState("");
        setSelectedCity("");
        const fetchData = async () => {

            try {
                const countriesResponse = await fetch('https://crio-location-selector.onrender.com/countries');
                const countriesData = await countriesResponse.json();
                setCountries(countriesData);
                console.log(countriesData, "countries data");
            } catch (err) {
                console.log(err);
            }

        };

        fetchData();
    }, []);

    useEffect(() => {
        setStates([]);
        setCities([]);
        setSelectedState("");
        setSelectedCity("");
        // console.log(selectedCountry, "selected country from useEffect");
        fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`).then((res) => res.json()).then((data) => setStates(data)).catch((err) => console.log(err));

    }, [selectedCountry])

    useEffect(() => {
        setCities([]);
        setSelectedCity("");
        // console.log(selectedState, "selected state from useEffect");
        fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`).then((res) => res.json()).then((data) => setCities(data)).catch((err) => console.log(err));

    }, [selectedState])




    return (
        <div>
            <h1>Select Location</h1>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                <select value={selectedCountry} style={{ padding: "4px" }} onChange={(e) => { setSelectedCountry(e.target.value) }}>
                    <option value="">Select Country</option>

                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>

                <select value={selectedState} style={{ padding: "4px" }} disabled={!selectedCountry} onChange={(e) => { setSelectedState(e.target.value) }}>
                    <option value="">Select State</option>

                    {selectedCountry && states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>

                <select style={{ padding: "4px" }} value={selectedCity} disabled={!selectedState} onChange={(e) => { setSelectedCity(e.target.value) }}>

                    <option value="">Select City</option>

                    {selectedState && cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>



            </div>

            {selectedCity && <div style={{ display: 'flex', gap: '5px', alignItems: 'baseline', justifyContent: 'center' }}>
                <h2>You Selected </h2> <h1>{selectedCountry},</h1> <h2 style={{ color: 'gray' }}>{selectedState} , {selectedCity}</h2>
            </div>}

        </div>

    )
}