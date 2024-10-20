const SelectInput = ({ options, value, onChange, placeholder }) => {
    return(
        <select value={value} onChange={onChange} required>
            <option value="" disabled>{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    );
};

export default SelectInput;