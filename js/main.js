//CRIAÇÃO DAS VARIAVEIS 
const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

//PARA CADA ELEMENTO NO ARRAY, EXECUTE "CRIAR ELEMENTO"
itens.forEach( (elemento) =>{
    criaElemento(elemento)
})

//AO ENVIAR FORMULARIO, EXECUTE
form.addEventListener("submit", (evento) => {
//PREVENINDO O PROCEDIMENTO PADRÃO DO FORMULARIO DE AO SER ENVIADO, REINICIAR A PAGINA E ENVIAR OS DADOS PARA A URL
    evento.preventDefault()
    
//PEGANDO OS DADOS DO FORMULARIO
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    
//BUSCAR NO ARRAY SE O ITEM SUBMETIDO JÁ EXISTE
    const existe = itens.find(elemento => elemento.nome === nome.value)

//ATRIBUTIR AO ITEM ATUAL O NOME E QUANTIDADE DO ITEM 
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

//CASO JÁ EXISTA O ITEM NO ARRAY, ATRIBUA O ID DELE A VAR ITEMATUAL E EXECUTE ATUALIZAR ELEMENTO
    if (existe){
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)
//ATUALIZANDO O ITEM NO LOCALSTORAGE
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else {
//CASO O ITEM NÃO EXISTA, ATRIBUA UM NOVO ID, BASEADO NO TAMANHO DO ARRAY
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0
//ENVIE O ITEM PARA A FUNCAO DE CRIAR ELEMENTO NO FRONT-END
        criaElemento(itemAtual)
//ENVIANDO ELEMENTO PARA O ARRAY
        itens.push(itemAtual)
    }
//COLOCANDO O NOVO ITEM NO LOCALSTORAGE, PARA AO REINICIAR A PÁGINA, NÃO PERCA OS DADOS
    localStorage.setItem("itens", JSON.stringify(itens)) 
    
//LIMPAR FORMULARIO APÓS O ENVIO
    nome.value = ""
    quantidade.value = ""  
})

//FUNÇÃO PARA CRIAR O ITEM NO FRONT-END
function criaElemento(item){
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome
//ENVIANDO A QUE ITEM O BOTAO DELETE É RESPONSAVEL
    novoItem.appendChild(botaoDeleta(item.id))
    

    lista.appendChild(novoItem)
}

//FUNCAO PARA ATUALIZAR A QUANTIDADE DO ITEM QUE JÁ EXISTE NO LOCALSTORAGE
function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//CRIACAO DO BOTAO DELETE
function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"
//ENVIO DO ELEMENTO QUE SERA DELETADO
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}
//DELETE DO ELEMENTO E DO ARRAY
function deletaElemento(tag, id){
//DELETE ELEMENTO
    tag.remove()
//DELETE NO ARRAY
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
//ATUALIZACAO DO LOCALSTORAGE
    localStorage.setItem("itens", JSON.stringify(itens))
}