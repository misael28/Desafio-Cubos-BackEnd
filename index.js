const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const bf = require('./funcionalidades.js')
const bfPd = require('./funcionalidades_pedidos')

const server = new Koa();

server.use(bodyparser())

let pedidos = [];
let estoque = [];
let pedido = []

const produto = {
    nome: "uva",
    valor_unitario: 1000,
    quantidade: 10,
    deletado: true
};

const produtos = [
    {
        nome: "morango",
        valor_unitario: 1000,
        quantidade: 10,
        deletado: true
    },
    {
        nome: "maça",
        valor_unitario: 1000,
        quantidade: 10,
        deletado: false
    }
]

estoque.push(produtos)
pedido = {
    id: "1",
    produtos: [],
    valor_total: 0,
    estado:"incompleto",
    deletado:false
};

pedidos.push(pedido);
estoque.push(produto);

const atualizarProdutoId = (id, valor, produtos) => {
    const lista = bf.obterProdutoId(id, produtos);
    const deletado = bf.verificaProdStatus(lista.nome,produtos)
    
    if(deletado===false){
        const listaAtualizada = {
            nome: lista.nome,
            valor_unitario: valor,
            quantidade: lista.quantidade,
            deletado: lista.deletado
        };
    
        if (lista) {
            produtos.splice(id, 1, listaAtualizada);
            return listaAtualizada;
        } else {
            return false;
        }
    }else{
        return "deletado"
    }

};

server.use((ctx) => {
    const path = ctx.url;
    const method = ctx.method;
    if (path == '/produtos') {
        if (method == 'GET') {
            respostaJson = bf.mostrarProdutos(produtos)
            ctx.body = {
                status: 'sucesso',
                dados: respostaJson
            }
        } else if (method == 'POST') {
            const produtoNovo = ctx.request.body
            respostaJson = bf.adicionarProduto(produtoNovo, produtos)
            //console.log(respostaJson)
            if (respostaJson == false) {
                ctx.body = {
                    status: 'Erro',
                    dados: {
                        mensagem: "Erro, você está tentando adicionar um produto já existente"
                    }
                }
            } else {
                ctx.body = {
                    status: 'sucesso',
                    dados: produtoNovo
                }
            }
        }
    } else if (path == '/pedidos'){
        if (method == 'GET') {
            respostaJson = bfPd.mostrarPedidos(pedidos)
            ctx.body = {
                status: 'sucesso',
                dados: respostaJson
            }
        }else if (method == 'POST') {
            const produtoNovo = ctx.request.body
            respostaJson = bf.adicionarProduto(produtoNovo, produtos)
            //console.log(respostaJson)
            if (respostaJson == false) {
                ctx.body = {
                    status: 'Erro',
                    dados: {
                        mensagem: "Erro, você está tentando adicionar um produto já existente"
                    }
                }
            } else {
                ctx.body = {
                    status: 'sucesso',
                    dados: produtoNovo
                }
            }
        }
    } else if (path.includes("/produtos/")) {
        const pathQuebrado = path.split("/");
        if (pathQuebrado[1] === "produtos") {
            const id = pathQuebrado[2];
            if (id) {
                if (method === 'GET') {
                    const produtoNovo = bf.obterProdutoId(id, produtos)
                    ctx.body = produtoNovo
                } else if (method === 'PUT') {
                    const valor = ctx.request.body.valor_unitario
                    if (valor) {
                        const resposta = atualizarProdutoId(id, valor, produtos)
                        if (resposta==="deletado") {
                            ctx.status = 404;
                            ctx.body = {
                                status: 'error',
                                dados: " Não é possível atualizar produto deletado."
                            };
                        } else {
                            ctx.body = {
                                status: 'sucesso',
                                dados: resposta
                            };
                        }
                    }
                } else if (method === 'DELETE') {
                    const resposta = bf.deletarProdutoId(id, produtos)
                    if (resposta === false) {
                        ctx.body = {
                            status: 'error',
                            dados: " Não foi possível deletar o produto."
                        }
                    } else {
                        ctx.body = {
                            status: 'sucesso',
                            dados: resposta
                        }
                    }
                }
            } else {
                ctx.status = 404
                ctx.body = {
                    status: 'Erro',
                    dados: {
                        mensagem: "Erro, não encontrado."
                    }
                }
            }
        }
    }

})

server.listen(2020, () => {
    console.log('Rodando na porta 2020!')
});