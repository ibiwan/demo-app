export const CarViewRow = ({ car, tableColumns }) => (
    <tr>
        {tableColumns.map(
            ({ key, fmt = v => v }) =>
                <td key={`${car.id}.${key}`}>
                    {fmt(car[key])}
                </td>
        )}
    </tr>
)
