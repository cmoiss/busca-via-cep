const cep = document.querySelector('#cep');
const botaoBuscar = document.querySelector('#botao-buscar');
const campoResultado = document.querySelector(".campo-resultado");

botaoBuscar.addEventListener('click', async () => {
    console.log('Busca iniciada!');
    // console.log(`Valor do input: ${cep.value}`);

    const endereco = await buscarCEP(cep.value);

    imprimirResultado(endereco);
});

const buscarCEP = async cep => {
    const urlAPI = `https://viacep.com.br/ws/${cep}/json/`;
    const resposta = await fetch(urlAPI);
    const result = await resposta.json();

    console.log(resposta);
    console.log(result);

    return result;
}

const imprimirResultado = (endereco) => {
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
