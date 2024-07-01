const ShowCountry = ({ country }) => {

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h2>Languages:</h2>

            <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                    <li key={key}>
                        {value}
                    </li>
                ))}
            </ul>

            <img src={country.flags.png}></img>
        </>
    )
}

export default ShowCountry;
