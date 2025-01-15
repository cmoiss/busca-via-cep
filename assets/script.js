const cep = document.querySelector('#cep');
const botaoBuscar = document.querySelector('#botao-buscar');
const campoResultado = document.querySelector(".campo-resultado");

botaoBuscar.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Busca iniciada!');
    // console.log(`Valor do input: ${cep.value}`);

    const endereco = await buscarCEP(cep.value);

    imprimirResultado(endereco);
});

const cepMask = (currentInput) => {
    console.log("Criando máscara");

    // Se o campo estiver vazio, não faz nada
    // if (!currentInput) return "";

    // Define máscara de CEP
    // const regexMask = /^(\d{5})\-?(\d{3})$/g;


    // let inputLength = currentInput.length    
    // if (inputLength > 4) {
    //     currentInput += "-";
    // }

    currentInput = currentInput.replace(/\D/g, ""); // Remove tudo que não for dígito numérico
    currentInput = currentInput.replace(/^(\d{5})\-?/g, "$1-"); // Adiciona hífen após o 5º dígito  
    currentInput = currentInput.replace(/(\d{3})$/g, "$1"); // Inclui os 3 últimos dígitos 

    return currentInput;
}


const buscarCEP = async cep => {
    const urlAPI = `https://viacep.com.br/ws/${cep}/json/`;
    const resposta = await fetch(urlAPI);
    const jsonResult = await resposta.json();

    console.log(resposta);
    console.log(jsonResult);

    return jsonResult;
}

const imprimirResultado = (endereco) => {
    // Verifica se há elementos filhos no campoResultado
    if (campoResultado.hasChildNodes()) {
        campoResultado.innerHTML = "";
    }

    const { logradouro, bairro, localidade: cidade, uf } = endereco;

    const textoLogadouro = document.createElement("p");
    textoLogadouro.innerHTML = `<b>Endereço:</b> ${logradouro}`;
    campoResultado.appendChild(textoLogadouro);

    const textoBairro = document.createElement("p");
    textoBairro.innerHTML = `<b>Bairro:</b> ${bairro}`;
    campoResultado.appendChild(textoBairro);

    const textoCidade = document.createElement("p");
    textoCidade.innerHTML = `<b>Cidade:</b> ${cidade}`;
    campoResultado.appendChild(textoCidade);

    const textoEstado = document.createElement("p");
    textoEstado.innerHTML = `<b>Estado:</b> ${uf}`;
    campoResultado.appendChild(textoEstado);
};
