// 1. Selecionar os elementos do HTML
const cepInput = document.getElementById('cep');
const buscarBtn = document.getElementById('btn-buscar');
const logradouroSpan = document.getElementById('logradouro');
const bairroSpan = document.getElementById('bairro');
const localidadeSpan = document.getElementById('localidade');
const ufSpan = document.getElementById('uf');

// 2. Criar a função que busca o CEP
async function buscarCep() {
    // Pega o valor digitado no campo de input
    const cep = cepInput.value;

    // Verifica se o CEP tem 8 dígitos
    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        return; // Para a execução da função
    }

    try {
        // 3. Faz a "chamada do garçom" (requisição à API)
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
        // Converte a resposta para o formato JSON (o "prato" que o garçom nos trouxe)
        const data = await response.json();

        // Verifica se a API retornou um erro (CEP não encontrado)
        if (data.erro) {
            alert('CEP não encontrado. Verifique o número digitado.');
            limparCampos();
            return;
        }

        // 4. Preenche os campos na tela com os dados recebidos
        logradouroSpan.textContent = data.logradouro;
        bairroSpan.textContent = data.bairro;
        localidadeSpan.textContent = data.localidade;
        ufSpan.textContent = data.uf;

    } catch (error) {
        // Se der algum erro de rede ou na requisição
        alert('Não foi possível buscar o CEP. Tente novamente.');
        console.error(error);
    }
}

// Função bônus para limpar os campos caso o CEP não seja encontrado
function limparCampos() {
    logradouroSpan.textContent = '';
    bairroSpan.textContent = '';
    localidadeSpan.textContent = '';
    ufSpan.textContent = '';
}

// 5. Adicionar o "ouvidor de evento" ao botão
buscarBtn.addEventListener('click', buscarCep);