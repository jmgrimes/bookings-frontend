import { ChangeEventHandler, FunctionComponent } from "react"
import { FormSelect } from "react-bootstrap"

type SelectProps = {
    value?: string
    values: string[]
    onChange: ChangeEventHandler<HTMLSelectElement>
}

const Select: FunctionComponent<SelectProps> = ({ values, value = values[0], onChange }) => {
    return (
        <FormSelect value={value} onChange={onChange}>
            {values.map(v => (
                <option value={v} key={v}>
                    {v}
                </option>
            ))}
        </FormSelect>
    )
}

export default Select
