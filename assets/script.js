const cep = document.querySelector('#cep');
const botaoBuscar = document.querySelector('#botao-buscar');
const campoResultado = document.querySelector(".campo-resultado");

// Verifica quando o usuário digita no campo de CEP
cep.addEventListener("input", (event) => {
    const initialInput = cep.value;

    // Verifica se a tecla pressionada é o Backspace
    cep.value = printCepMask(initialInput);
});

botaoBuscar.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Busca iniciada!');
    // console.log(`Valor do input: ${cep.value}`);

    const endereco = await buscarCEP(cep.value);

    // Verifica se o CEP existe
    if (!endereco.erro) {
        // Imprime o resultado na tela
        campoResultado.classList.remove("hidden");
        imprimirResultado(endereco);
    } else {
        limparCampoResultado();
        alert("CEP não encontrado, tente novamente!");
    }
});

const printCepMask = (currentInput) => {
    // Regex que define máscara de CEP
    const cepMask = /^(\d{5})\-?(\d{3})$/g;

    currentInput = currentInput.replace(/\D/g, ""); // Remove tudo que não for dígito numérico
    currentInput = currentInput.replace(cepMask, "$1-$2"); // Adiciona hífen entre o 5º e 6º dígitos após digitar o CEP 
    /* Gerar a máscara após o input previne o erro "hífen block", 
    uma vez que o hífen sempre estava sendo gerado após o 5º dígito,
    não permitindo que usuário use o backspace */

    console.log("Definindo máscara de CEP...");

    return currentInput;
};

const buscarCEP = async cep => {
    const urlAPI = `https://viacep.com.br/ws/${cep}/json/`;
    const resposta = await fetch(urlAPI);
    const jsonResult = await resposta.json();

    console.log(resposta);
    console.log(jsonResult);

    return jsonResult;
}

const limparCampoResultado = () => {
    // Verifica se há elementos filhos no campoResultado
    if (campoResultado.hasChildNodes()) {
        campoResultado.innerHTML = "";
    }

    // Se não houver filhos, não faça nada
}

const imprimirResultado = (endereco) => {
    limparCampoResultado();

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
