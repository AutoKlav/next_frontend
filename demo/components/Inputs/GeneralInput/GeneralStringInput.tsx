import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';

interface GeneralStringInputProps {    
    headerName: string;   
    inputValue: React.MutableRefObject<string | undefined>;
    suggestions: string[] | undefined;  
}

const GeneralStringInput: React.FC<GeneralStringInputProps> = (props) => {
    const {  headerName, inputValue, suggestions } = props;

    const [value, setValue] = useState('');
    const [items, setItems] = useState<string[]>([]);    
    
    console.log('suggestions from component', suggestions);
    const search = (event: { query: string }) => {
        const filteredItems = suggestions?.filter(item =>
            item.toLowerCase().includes(event.query.toLowerCase())
        );

        if(filteredItems){
            setItems(filteredItems);
        }
    }

    return (        
        <div className="flex flex-row gap-3 mt-3">
        <div className="flex flex-column gap-2">
            <label>{headerName}</label>
            <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} />
            <InputText
                defaultValue={inputValue.current} // Clear value on next step
                onChange={(e) => (inputValue.current = e.target.value)}
                className="p-inputtext-md p-2"
                style={{ borderRadius: '10px' }}
            />
        </div>
    </div>
    );
};

export default GeneralStringInput;