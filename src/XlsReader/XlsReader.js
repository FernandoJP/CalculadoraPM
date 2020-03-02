import React from "react";
import Form from 'react-bootstrap/Form';
import classes from './XlsReader.module.css';

const xlsReader = (props) => {
    const inputRef = React.createRef();

    return <div>
        <Form>
            <Form.Group controlId="formBasicEmail" className={classes.CustomFileLabel}>
                <Form.Label>Selecione um arquivo</Form.Label>
                <Form.Control type="file" ref={inputRef}
                    onChange={() => props.change(inputRef.current.files[0])}
                    accept=".xls,.xlsx,.csv" />
            </Form.Group>
        </Form>
    </div>
}

export default xlsReader;