export const CarTableHeader = ({
    tableColumns,
    sortMode,
    onColumnClick
}) => {
    return (
        <thead>
            <tr>
                {tableColumns.map(({ label, key }) => {
                    let sortSuffix = ''
                    if (key === sortMode.field) {
                        sortSuffix = sortMode.dir > 0 ? ' (asc)' : ' (desc)'
                    }
                    return (
                        <th
                            key={`${key}`}
                            onClick={() => onColumnClick(key)}
                        >{label + sortSuffix}</th>
                    )
                }
                )}
            </tr>
        </thead>
    )
}