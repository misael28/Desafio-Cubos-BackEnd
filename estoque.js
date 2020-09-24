// como fazer o processo de enviar o produto
// pro carrinho sem alterar ele no estoque

const estoque = [];
const pedidos = [];

const produto = {
  id: "1",
  nome: "Morango",
  valor_unitario: 1000,
  quantidade: 10,
};

const pedido = {
  id: "1",
  produtos: [],
  valor_total: 0,
};

estoque.push(produto);
pedidos.push(pedido);

// console.log(estoque);
// console.log(pedidos);

const adicionarProdutoNoPedido = (id_pedido, produto) => {
  /**
   * 1. Precisa verificar se o produto existe;
   * 2. Verificar a quantidade disponível;
   * 3. Abater quantidade disponível;
   * 4. Adicionar no pedido. Verificar se esse produto já existe pedido.
   * 5. Atualizar a propriedade valor total;
   */

  // 1 // obterUmProduto(id);
  const produtoNoEstoque = estoque[produto.id - 1];
  if (produtoNoEstoque) {
    // 2. Verificar a quantidade disponível;
    console.log("Quantidade", produto.quantidade);
    if (produtoNoEstoque.quantidade >= produto.quantidade) {
      // 3. Abater quantidade disponível;
      estoque[produto.id - 1].quantidade =
        estoque[produto.id - 1].quantidade - produto.quantidade;
      console.log("Quantidade", produto.quantidade);
      const pedidoAtual = pedidos[id_pedido - 1];
      if (pedidoAtual) {
        const produto_ja_existe =
          pedidoAtual.produtos.filter((pdt) => pdt.id === produto.id).length >
          0;

        //  4. Adicionar no pedido. Verificar se esse produto já existe pedido.
        if (produto_ja_existe) {
          for (let i = 0; i < pedidoAtual.produtos.length; i++) {
            if (pedidoAtual.produtos[i].id === produto.id) {
              console.log("qtd", pedidoAtual.produtos[i].quantidade);
              console.log("qtd", produto.quantidade);
              pedidoAtual.produtos.splice(i, 1, {
                nome: produto.nome,
                id: produto.id,
                quantidade:
                  pedidoAtual.produtos[i].quantidade + produto.quantidade,
              });
            }
          }
        } else {
          pedidoAtual.produtos.push(produto);
        }

        // 5. Atualizar a propriedade valor total;
        console.log(pedidoAtual.valor_total);
        console.log(produto.valor_unitario);
        console.log(produto.quantidade);
        pedidoAtual.valor_total =
          pedidoAtual.valor_total + produto.valor_unitario * produto.quantidade;
        pedidos[pedidoAtual.id - 1] = pedidoAtual;
      }
    }
  }
};

adicionarProdutoNoPedido("1", {
  id: "1",
  nome: "Morango",
  valor_unitario: 1000,
  quantidade: 5,
});
adicionarProdutoNoPedido("1", {
  id: "1",
  nome: "Morango",
  valor_unitario: 1000,
  quantidade: 5,
});
console.log(pedidos[0]);
