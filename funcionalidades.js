
const produto1 = {
    nome: "manga",
    valor_unitario: 1000,
    quantidade: 10,
};

const produtos = [
    {
        nome: "morango",
        valor_unitario: 1000,
        quantidade: 10,
    },
    {
        nome: "maça",
        valor_unitario: 1000,
        quantidade: 10,
    }
]



const verificaProd = (prodNome, produtos) => {
    let dadosProduto;
    let nome = `${prodNome}`.toLowerCase()
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome === nome) {
            dadosProduto = produtos[i]
            break
        }
    }
    if (dadosProduto == undefined) {
        return ("Produto selecionado não existe")
    } else {
        return (dadosProduto)
    }
}

const verificaProdStatus = (prodNome, produtos) => {
    let dadosProduto;
    let nome = `${prodNome}`.toLowerCase()
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome === nome) {
            dadosProduto = produtos[i]
            if (dadosProduto.deletado == true) {
                return true
            } else {
                return false
            }
            break
        }
    }
    if (dadosProduto == undefined) {
        return ("Produto selecionado não existe")
    } else {
        return (dadosProduto)
    }
}


const mostrarProdutos = (produtos) => {
    return produtos
}

const obterProduto = (nome, produtos) => {
    let prodB = {}
    let vprod = verificaProd(nome, produtos)
    if (vprod == "Produto selecionado não existe") {
        return "Error, Product not found"
    } else {
        prodB = vprod
        return (prodB)
    }
}

/*const modificaStatus = (produtoNovo,produtos)=>{
    let deletado = verificaProdStatus(produtoNovo.nome, produtos)
    
        if (deletado == true) {
            let lista = produtoNovo
            let listaAtualizada = {
                nome: lista.nome,
                valor_unitario: lista.valor_unitario,
                quantidade: lista.quantidade,
                deletado: false
            }
            return listaAtualizada
}*/

const adicionarProduto = (produtoNovo, produtos) => {
    let vprod = verificaProd(produtoNovo.nome, produtos)
    
    if (vprod == "Produto selecionado não existe") {
        produtos.push(produtoNovo)
        return produtos
    } else {
        return false
    }  
}


const obterProdutoId = (prodId, produtos) => {

    let lista = produtos[prodId];
    if (lista) {
        return lista
    } else {
        return null
    }
}

const deletarProdutoId = (prodId, produtos) => {
    const lista = obterProdutoId(prodId, produtos);
    console.log(lista)
    const listaDeletado = {
        nome: lista.nome,
        valor_unitario: lista.valor_unitario,
        quantidade: lista.quantidade,
        deletado: true
    };

    if (lista) {
        produtos.splice(prodId, 1, listaDeletado);
        return listaDeletado;
    } else {
        return false;
    }

    /*    if (lista) {
          produtos.splice(prodId, 1);
          return true;
        } else {
          return false;
        }
    */
};


module.exports = {
    verificaProd: verificaProd,
    verificaProdStatus: verificaProdStatus,
    mostrarProdutos: mostrarProdutos,
    adicionarProduto: adicionarProduto,
    obterProduto: obterProduto,
    obterProdutoId: obterProdutoId,
    deletarProdutoId: deletarProdutoId
}





