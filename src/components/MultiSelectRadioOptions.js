import { useState } from "react";

export default function MultiSelectRadioOptions({ options, onChange }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    return <ul multiple={true} >
        {
            options.map(option =>
                <li key={option} className={`flex item-center m-2 p-2 gap-2 border ${selectedOptions.includes(option) ? "border-green-500" : "border-gray-200"} border-2 rounded`}>
                    <input type='checkbox' key={option} checked={selectedOptions.includes(option)} value={option} onChange={
                        e => {
                            if (selectedOptions.includes(option)) {
                                setSelectedOptions(prev => prev.filter(item => item !== option))
                            } else {
                                setSelectedOptions(prev => [...prev, e.target.value])
                            }
                            onChange(e)
                        }

                    } />
                    <label>{option}</label>
                </li>
            )
        }
    </ul>
}
