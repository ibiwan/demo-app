import { CarViewRow } from "./CarViewRow"

const nf = new Intl.NumberFormat('en-US')

const tableColumns = [
    // { key: 'id', label: 'Id' },
    { key: 'year', label: 'Year' },
    { key: 'make', label: 'Make' },
    { key: 'model', label: 'Model[trim]' },
    { key: 'color', label: 'Color' },
    { key: 'price', label: 'Price New', fmt: v => `$${nf.format(v)}` },
]

export const CarTable = ({ cars }) => (
    <table>
        <thead>
            <tr>
                {tableColumns.map(({ label }) => <th key={`${label}`}>{label}</th>)}
            </tr>
        </thead>
        <tbody>
            {cars.map((car) =>
                <CarViewRow key={car.id} car={car} tableColumns={tableColumns} />
            )}
        </tbody>
    </table>
)
