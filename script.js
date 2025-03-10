const buttonSubmit = document.getElementById('buttonSubmit');

const inputNome = document.getElementById('inputNome');
const inputEmail = document.getElementById('inputEmail')
const inputNumero = document.getElementById('inputNumero')

let contatos = JSON.parse(localStorage.getItem('contatos')) || []

buttonSubmit.addEventListener("click", function(){
    let nome = inputNome.value
    let email = inputEmail.value    
    let numero = inputNumero.value

    if(nome && email && numero){
        contatos.push({
            nome: nome,
            email: email,
            numero: numero
        })

        adicionarContato()
        localStorage.setItem('contatos', JSON.stringify(contatos))
        
        inputNome.value = ''
        inputEmail.value = ''   
        inputNumero.value = ''
    }else{
        alert('Preencha todos os campos.')
    }
})

function adicionarContato(){
    let contatosContainer = document.querySelector('.contatos-container')
    contatosContainer.innerHTML = ''

    contatos.forEach(contato => {
        let div = document.createElement('div')
        div.classList.add('contato')

        let h3 = document.createElement('h3')
        h3.classList.add('nomeCtt') 
        h3.textContent = contato.nome

        let pEmail = document.createElement('p')   
        pEmail.classList.add('emailCtt')
        pEmail.textContent = contato.email

        let pNumero = document.createElement('p')
        pNumero.classList.add('numeroCtt')
        pNumero.textContent = contato.numero

        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Excluir'
        deleteBtn.id = 'deleteBtn'
        deleteBtn.addEventListener('click', function(){
            contatos.splice(contatos.indexOf(contato), 1)
            localStorage.setItem('contatos', JSON.stringify(contatos))
            adicionarContato()
        })

        let editBtn = document.createElement('button')
        editBtn.textContent = 'Editar'
        editBtn.id = 'editBtn'
        editBtn.addEventListener('click', function(){
            inputNome.value = contato.nome
            inputEmail.value = contato.email
            inputNumero.value = contato.numero
            contatos.splice(contatos.indexOf(contato), 1)
            localStorage.setItem('contatos', JSON.stringify(contatos))
            adicionarContato()
        })

        div.appendChild(h3)
        div.appendChild(pEmail)
        div.appendChild(pNumero)
        div.appendChild(deleteBtn)
        div.appendChild(editBtn)
        contatosContainer.appendChild(div)
    })
}

adicionarContato()