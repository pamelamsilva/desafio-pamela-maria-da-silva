const cardapio = {
    cafe: 3.0,
    chantily: 1.5,
    suco: 6.2,
    sanduiche: 6.5,
    queijo: 2.0,
    salgado: 7.25,
    combo1: 9.5,
    combo2: 7.5,
};

const extras = {
    chantily: "cafe",
    queijo: "sanduiche",
};

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length == 0) {
            return "Não há itens no carrinho de compra!";
        }

        let resultadoCalculaItens = this.calculaItens(itens);

        if (isNaN(resultadoCalculaItens)) {
            return resultadoCalculaItens;
        }

        return this.metodosPagamento(metodoDePagamento, resultadoCalculaItens);
    }

    calculaItens(itens) {
        let valorConta = 0;
        for (let i = 0; i < itens.length; i++) {
            let item = itens[i];
            let [nomeProduto, quantidadeProduto] = item.split(",");

            let precoProduto = cardapio[nomeProduto];

            if (!precoProduto) {
                return "Item inválido!";
            }

            if (isNaN(quantidadeProduto) || quantidadeProduto <= 0) {
                return "Quantidade inválida!";
            }

            let dependencia = extras[nomeProduto];

            if (
                dependencia &&
                !itens.some((itemPedido) => itemPedido.includes(dependencia))
            ) {
                return "Item extra não pode ser pedido sem o principal";
            }

            valorConta += precoProduto * quantidadeProduto;
        }

        return valorConta;
    }

    metodosPagamento(metodoDePagamento, valor) {
        let valorFormatado;
        switch (metodoDePagamento) {
            case "dinheiro":
                valor -= valor * 0.05;
                break;

            case "debito":
                break;

            case "credito":
                valor += valor * 0.03;
                break;

            default:
                return "Forma de pagamento inválida!";
        }

        valorFormatado = valor.toFixed(2).replace(".", ",");
        return `R$ ${valorFormatado}`;
    }
}

export { CaixaDaLanchonete };
