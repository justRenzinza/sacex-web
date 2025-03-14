function atualizarData() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;

    const elementosData = document.querySelectorAll('.data-atual');
    elementosData.forEach(elemento => {
        elemento.textContent = dataAtual;
    });
}

window.onload = () => {
    atualizarData();
};

function aplicarVariacaoClasse(elemento, variacao) {
    if (variacao >= 0) {
        elemento.classList.add("up");
        elemento.classList.remove("down");
    } else {
        elemento.classList.add("down");
        elemento.classList.remove("up");
    }
}

async function atualizarCotacaoCafe(dados) {
    const londres = dados.stocks.find(stock => stock.name === "LONDRES");
    if (londres) {
        document.getElementById("cotacao-londres").textContent = `US$ ${londres.price.toFixed(2)}`;
        const variacaoElemento = document.getElementById("variation-londres");
        variacaoElemento.textContent = `${londres.change.toFixed(2)}%`;
        aplicarVariacaoClasse(variacaoElemento, londres.change);
    }

    const ny = dados.stocks.find(stock => stock.name === "N.YORK");
    if (ny) {
        document.getElementById("cotacao-ny").textContent = `US$ ${ny.price.toFixed(2)}`;
        const variacaoElemento = document.getElementById("variation-ny");
        variacaoElemento.textContent = `${ny.change.toFixed(2)}%`;
        aplicarVariacaoClasse(variacaoElemento, ny.change);
    }
}

async function atualizarValoresCafe(dados) {
    const conilon = dados.values.find(valor => valor.name === "Conilon 7/8");
    if (conilon) {
        document.getElementById("valor-conilon").textContent = `R$ ${conilon.value.toFixed(2)}`;
    }

    const arabica = dados.values.find(valor => valor.name === "Arábica RIO");
    if (arabica) {
        document.getElementById("valor-arabica").textContent = `R$ ${arabica.value.toFixed(2)}`;
    }
}

async function atualizarDadosCafe() {
    try {
        const resposta = await fetch("https://api.coffee-panel.mitrix.online/api/home/information"); 
        const dados = await resposta.json();

        atualizarCotacaoCafe(dados);
        atualizarValoresCafe(dados);
        atualizarData();
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

async function atualizarCotacaoDolar() {
    try {
        const resposta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
        const dados = await resposta.json();

        const cotacaoAtual = parseFloat(dados["USDBRL"].bid);
        const variacao = parseFloat(dados["USDBRL"].pctChange);

        document.getElementById("cotacao-dolar").textContent = `R$ ${cotacaoAtual.toFixed(2)}`;
        const variacaoElemento = document.getElementById("variation-dolar");
        variacaoElemento.textContent = `${variacao.toFixed(2)}%`;
        aplicarVariacaoClasse(variacaoElemento, variacao);
    } catch (erro) {
        console.error("Erro ao buscar cotação do dólar:", erro);
    }
}

setInterval(atualizarDadosCafe, 60000); 
setInterval(atualizarCotacaoDolar, 60000); 

atualizarDadosCafe();
atualizarCotacaoDolar();
