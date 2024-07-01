import Part from "./Part";

const Content = ({parts}) => {
    return (
        <>
            <table>
                    {parts.map(part => <tbody key={part.id}><Part name={part.name} exercises={part.exercises}/></tbody>)}
            </table>
        </>
    )
}

export default Content;