import { carRowPropTypeWithActions, carTableColumnsDefType } from "../../../shared/propTypes/car"

export const CarViewRow = ({
    car,
    tableColumns,
}) => {
    return (
        <tr>
            {tableColumns.map(
                ({ key, fmt = v => v }) =>
                    <td key={`${car.id}.${key}`}>
                        {fmt(car[key])}
                    </td>
            )}
        </tr>
    )
}

CarViewRow.propTypes = {
    car: carRowPropTypeWithActions.isRequired,
    tableColumns: carTableColumnsDefType.isRequired
}
