import ShowCountry from "./ShowCountry";

const FilteredCountries = ({ wantedCountries, setWantedCountries }) => {

    const showCountry = (country) => {
        setWantedCountries([country]);
    }

    if ((wantedCountries.length) > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        );
    }

    else if  ((wantedCountries.length) === 1) {
        const country = wantedCountries[0]
        return (
            <ShowCountry country={country}/>
        )
    }

    else {
        return (
            <>
                {wantedCountries.map((c, i) => 
                    <p key={i}>{c.name.common} <button onClick={() => showCountry(c)}>Show</button></p>
                    )
                }
            </>
        );
    }
};

export default FilteredCountries;