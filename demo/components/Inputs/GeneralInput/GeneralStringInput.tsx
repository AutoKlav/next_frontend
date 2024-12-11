import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';

interface GeneralStringInputProps {    
    headerName: string;
    placeholder: string;   
    // support both useState and useRef 
    inputValue: React.MutableRefObject<string> | [string, React.Dispatch<React.SetStateAction<string>>];
    suggestions: string[] | undefined;  
}

const GeneralStringInput: React.FC<GeneralStringInputProps> = (props) => {
    const { headerName, inputValue, suggestions, placeholder } = props;
    
    const [items, setItems] = useState<string[]>([]);    

    // Determine if inputValue is useRef or useState
    const value = Array.isArray(inputValue) ? inputValue[0] : inputValue.current;
    const setValue = Array.isArray(inputValue) ? inputValue[1] : (val: string) => (inputValue.current = val);
    
    const search = (event: { query: string }) => {
        const filteredItems = suggestions?.filter(item =>
            item.toLowerCase().includes(event.query.toLowerCase())
        );

        if (filteredItems) {
            setItems(filteredItems);
        }
    }

    return (        
        <div className="flex flex-row gap-3">
            <div className="flex flex-column gap-2">
                <label>{headerName}</label>
                <AutoComplete 
                    value={value} 
                    suggestions={items} 
                    completeMethod={search} 
                    onChange={(e) => setValue(e.target.value)} 
                    placeholder={placeholder}
                />            
            </div>
        </div>
    );
};

export default GeneralStringInput;
