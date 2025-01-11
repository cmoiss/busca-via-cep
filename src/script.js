const cep = document.querySelector('#cep');
const botaoBuscar = document.querySelector('#botao-buscar');

botaoBuscar.addEventListener('click', () => {
  console.log('Botão clicado!');
  console.log(`Valor do input: ${cep.value}`);
});