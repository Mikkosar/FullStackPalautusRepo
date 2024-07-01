const CountryInput = ({ userInput, setUserInput }) => {
    return (
        <>
            <p>Find countries <input value={userInput} onChange={(e) => setUserInput(e.target.value)}/></p>
        </>
    )
};

export default CountryInput;