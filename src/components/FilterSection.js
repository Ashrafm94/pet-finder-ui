import React from "react";
import { Form } from "react-bootstrap";

const FilterSection = ({ title, options, onChange, value }) => {

    return (
        <Form.Select
            onChange={e => onChange(e.target.value)}
            value={value}
            className="select-container">
            <option value="">{title}</option>
            {options.map(item => <option value={item} key={item}>{item}</option>)}
        </Form.Select>
    )
}

export default FilterSection;