class contas {
    constructor(nome, valor) {
        this.nome = nome;
        this.valor = valor;
    }
}
function soma(lista) {
    let total = lista.reduce((a, v) => a + v.valor, 0);
    return total;
}
let lista_contas = [];
let pos = '';
let campos = document.querySelectorAll(".c-form");
let btn_salvar = document.querySelector("#btn_salvar");
let tabela = document.querySelector("#tabela");
let total = document.getElementById("total");
let container = document.querySelector(".tabela");
function listar_gastos(lista) {
    let auxHtml = '';
    lista.forEach((l, i) => {
        auxHtml += '<tr>' +
            '<td>' + l.nome + '</td>' +
            '<td>' + l.valor + '</td>' +
            '<td>' + '<a href="#" class="fa-regular fa-pen-to-square btnAlterar " rel="' + i + '">' + '</a>' + '</td>' +
            '<td>' + '<a href="#" class="fa-solid fa-trash btnExcluir " rel="' + i + '">' + '</a>' + '</td>' +
            '</tr>';
    });
    return auxHtml;
}
btn_salvar.addEventListener('click', salvar);
function salvar() {
    let nome = document.getElementById("nome").value;
    let valor = document.getElementById("valor").value;
    valor = parseFloat(valor);
    if (nome == '' || isNaN(nome) == false || valor == '' || isNaN(valor) == true) {
        alert('Insira dados corretos');
    }
    else {

        let conta = new contas(nome, valor);
        if (pos == '') {
            lista_contas.push(conta);
        }
        else {
            lista_contas[pos] = conta;
            pos = '';
        }
        container.classList.remove("ativa");
        total.classList.remove("ativa");
    }
    tabela.innerHTML = listar_gastos(lista_contas);
    total.innerHTML = soma(lista_contas);
    campos.forEach((c) => { c.value = '' })

}

tabela.addEventListener('click', operacoes);
function operacoes(event) {
    pos = event.target.rel;
    if (event.target.classList.contains("btnAlterar")) {
        nome.value = lista_contas[pos].nome;
        valor.value = lista_contas[pos].valor;
    }
    else if (event.target.classList.contains("btnExcluir")) {
        lista_contas.splice(pos, 1);
        tabela.innerHTML = listar_gastos(lista_contas);
        total.innerHTML = soma(lista_contas);
    }
    if (lista_contas.length == 0) {
        container.classList.add("ativa");
        total.classList.add("ativa");

    }
    else {
        container.classList.remove("ativa")
        total.classList.remove("ativa");
    }

}


