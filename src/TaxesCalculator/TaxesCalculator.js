import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//excel tem que estar na ordem correta, para toda venda tem que ter compra no passado
//varrer elemento por elemento, se for compra adicionar no array pm, 
//se for venda remover do array pm na posição ativo e adicionar no array de lucros na posição mês
class TaxesCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pm: [], //cada posição é um ativo
            lucros: [] //cada posição é um mês
        }
    }

    componentWillReceiveProps(nextProps) {
        this.transformSellList(nextProps.tradeList)
    }

    //0 data, 2 cod, 3 preco, 4 qtd compra, 5 qtd venda
    transformSellList = (tradeList) => {
        let pm = []; //preço médio de compra
        let lucros = []; //lucro de cada mês
        tradeList.map((trade, i) => {
            const cod = trade[2];
            if (this.isBuy(trade)) {
                let op = {};
                op[cod] = {};

                //calcular qtd e pm da compra
                if (pm[cod]) {
                    op[cod].qtd = pm[cod].qtd + trade[4];
                    op[cod].preco = (pm[cod].qtd * pm[cod].preco + trade[3] * trade[4]) / (trade[4] + pm[cod].qtd);
                } else {
                    op[cod] = { qtd: trade[4], preco: trade[3] };
                }

                //cria obj que será adicionado no state
                console.log({ op });
                pm[cod] = op[cod];

            } else if (this.isSell(trade)) {
                if (!pm[cod]) {
                    //throw 'Erro: foi encontrado uma venda de '+cod+', mas não foi encontrado uma compra';
                    //tentando reverter uma falha de venda não encontrada
                    console.warn('Tentando reverter falha na leitura do arquivo, foi encontrado compra de ' + cod + ', mas não foi encontrado uma compra.');
                    let aux = trade[i + 1];
                    trade[i + 1] = trade[i];
                    trade[i] = aux;
                    return;
                }
                pm[cod].qtd -= trade[5];
                //01/01/2019
                const mes = new String('mes'+new Date(trade[0].substring(3,5)+'/'+trade[0].substring(0,2) + '/'+trade[0].substring(6,10)).getMonth()+1);
                if(!lucros[mes]) lucros[mes] = 0;
                lucros[mes] += (trade[3] - pm[cod].preco) * trade[5];

            } else {
                throw 'Erro: não foi possível identificar se trade é compra ou venda';
            }
        });
        this.setState({ pm });
        this.setState({ lucros });
        console.log(pm, lucros);
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.lucros).map(month => {
                    return (<Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{this.getMonthString(month)}</Card.Title>
                            <Card.Text>
                                <strong>Resultado: </strong>{this.state.lucros[month]}<br />
                                <strong>Imposto a pagar: </strong>{this.state.lucros[month] > 0 ? this.state.lucros[month] * 0.20: 0}
                            </Card.Text>
                            <Button variant="primary">Mais detalhes</Button>
                        </Card.Body>
                    </Card>)
                })}

            </div>
        );
    }

    isBuy = (trade) => {
        return trade[4] > 0 && trade[6];
    }

    isSell = (trade) => {
        return trade[5] > 0 && trade[7];
    }

    getMonthString = (month) => {
        switch (month) {
            case 'mes1': return 'Janeiro';
            case 'mes2': return 'Fevereiro';
            case 'mes3': return 'Março';
            case 'mes4': return 'Abril';
            case 'mes5': return 'Maio';
            case 'mes6': return 'Junho';
            case 'mes7': return 'Julho';
            case 'mes8': return 'Agosto';
            case 'mes9': return 'Setembro';
            case 'mes10': return 'Outubro';
            case 'mes11': return 'Novembro';
            case 'mes12': return 'Dezembro';
        }
    }
}

export default TaxesCalculator;