import React from 'react';
import Table from 'react-bootstrap/Table';
import classes from './TradeList.module.css';

const cols = {
    Cod: 'Dt. Negociação',
    DataNegocio: 'Conta',
    QtdeCompra: 'Ativo',
    QtdVenda: 'Preço',
    PrecoMedioCompra: 'Quantidade Compr',
    PrecoMedioVenda: 'Quantidade Venda',
    QtdeLiquida: 'Financeiro Compra',
    Posicao: 'Financeiro Venda'
}

const tradeList = (props) => {
    return (
        <div>
            {props.tradeList.length ? <Table striped bordered hover className={classes.Table}>
                <thead>
                    <tr>
                        {Object.keys(cols).map(colKey => {
                            return <th key={cols[colKey]} style={{ width: 100 / 8 + '%' }} >{cols[colKey]}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.tradeList.map(trade => {
                        return <tr>{trade.map(cell => {
                            return <td key={cell.id}
                                className={cell==='COMPRADA'? classes.Comprado:cell==='VENDIDA'?classes.Vendido:null}>
                                    <span>{cell}</span>
                                    </td>
                        })}</tr>
                    })}
                </tbody>
            </Table>:null}
        </div>
    )
}

export default tradeList;