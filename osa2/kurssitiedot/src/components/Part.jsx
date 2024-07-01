const Part = ({ name, exercises }) => {
    return (
        <tr>
            <td>{name} {exercises}</td>
        </tr>
    )
}

export default Part;