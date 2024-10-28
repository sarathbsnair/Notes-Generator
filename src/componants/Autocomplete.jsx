import React, { useState, useEffect } from 'react'
import SearchSuggessions from './SearchSuggessions'

const Autocomplete = ({ staticData, placeholderText, customLoading, customErrorMessage, fetchSuggestions, dataKey }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const highlightText = (text, query) => {
        return text;
    }

    const getSuggestions = async (query) => {
        setError(null);
        setLoading(true);
        try {
            let result;
            // if (staticData) {
            //     console.log("Entered IF");
            //     result = staticData.filter((item) => {
            //         return item?.toLowerCase().includes(query.toLowerCase());
            //     })
            // } else {
            //     result = await fetchSuggestions(query);
            // }
            result = await fetchSuggestions(query);
            console.log('result - ', result);
            setSuggestions(result);
        } catch (error) {
            setError("Error Occurred");
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (inputValue?.length > 1) {
            getSuggestions(inputValue)
        }else{
            setSuggestions([]);
        }
    }, [inputValue]);
    
    return (
        <>
            <input
                placeholder={placeholderText}
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
            />
            {error && <div>{error}</div>}
            {loading && <div>{customLoading}</div>}
            <ul>
                <SearchSuggessions highlightText={highlightText} suggestions={suggestions} highlight={inputValue} dataKey={dataKey}/>
            </ul>
        </>
    )
}

export default Autocomplete