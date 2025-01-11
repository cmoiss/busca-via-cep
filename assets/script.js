const cep = document.querySelector('#cep');
const botaoBuscar = document.querySelector('#botao-buscar');

botaoBuscar.addEventListener('click', () => {
    console.log('Busca iniciada!');
    // console.log(`Valor do input: ${cep.value}`);

    buscarCEP(cep.value);
});

buscarCEP = async cep => {
    const urlAPI = `https://viacep.com.br/ws/${cep}/json/`;
    
    const respostaRequisicao = await fetch(urlAPI);
    console.log(respostaRequisicao.json());
}
