const form = document.querySelector('#novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criarElemento(elemento)

});


form.addEventListener('submit', (event) => {
    event.preventDefault()
    const nome = event.target.elements['nome']
    const quantidade = event.target.elements['quantidade']
    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual


    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0
        criarElemento(itemAtual)
        itens.push(itemAtual);

    }

    localStorage.setItem("itens", JSON.stringify(itens))



    nome.value = ''
    quantidade.value = ''
})


function criarElemento(item) {
    console.log(nome, quantidade)
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const númeroItem = document.createElement('strong')
    númeroItem.innerHTML = item.quantidade
    númeroItem.dataset.id = item.id


    novoItem.appendChild(númeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botãoDeleta(item.id))

    lista.appendChild(novoItem)

    console.log(novoItem)


}

function atualizaElemento(item) {
    document.querySelector("[data-id = '" + item.id + "']").innerHTML = item.quantidade

}

function botãoDeleta(id) {
    const elementoBotão = document.createElement("button")
    elementoBotão.innerText = "X"
    elementoBotão.addEventListener('click', function () {
        deletaElemento(this.parentNode, id)
    }
    )
    return elementoBotão
}

function deletaElemento(tag, id) {
    tag.remove()
    // remover item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    console.log(itens)
}