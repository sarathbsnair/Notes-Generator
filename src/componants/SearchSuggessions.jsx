import React, { forwardRef } from 'react'

const SearchSuggessions = forwardRef(({ highlight, dataKey, suggestions, highlightText }, ref) => {
    return (
        <>
            {suggestions?.map((suggestion, index) => {
                return (
                    <li key={index} ref={ref}>
                        
                        {suggestion[dataKey] 
                        ? highlightText(suggestion[dataKey], highlight)
                        : suggestion}
                    </li>
                )
            })}
        </>
    )
})

export default SearchSuggessions