import { ChangeEventHandler, FunctionComponent } from "react"

export interface SelectProps {
    value?: string
    values: string[]
    onChange: ChangeEventHandler<HTMLSelectElement>
}

const Select: FunctionComponent<SelectProps> = ({ values, value = values[0], onChange }) => {
    return (
        <select className="form-select" value={value} onChange={onChange}>
            {values.map(v => (
                <option value={v} key={v}>
                    {v}
                </option>
            ))}
        </select>
    )
}

export default Select
