const Total = ({ parts }) => {
    const exercises = parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <h4>Total of {exercises} exercises</h4>
    )
}

export default Total;