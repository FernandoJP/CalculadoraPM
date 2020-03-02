import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const heading = (props) => {
    return (
        <Jumbotron>
            <h1>Calculadora IR</h1>
            <p>
                Calcule o valor a ser pago via DARF com preço médio das operações
            </p>
        </Jumbotron>
    )
}

export default heading;