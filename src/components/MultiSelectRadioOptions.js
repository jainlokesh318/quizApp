import { useState } from "react";

export default function MultiSelectRadioOptions({ options, onChange }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    return <ul multiple={true} className="flex flex-col gap-6">
        {
            options.map(option =>
                <li key={option} className={`flex items-center p-4 gap-2 border ${selectedOptions.includes(option) ? "border-green-500" : "bg-blue-100"} border-2 rounded-xl`}>
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
