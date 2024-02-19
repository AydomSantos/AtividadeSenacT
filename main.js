// Função para exibir dados registrados em um container estilizado
function exibirDadosRegistrados(dados) {
  const container = document.getElementById('dadosRegistradosContainer');

  // Limpa o conteúdo atual do container
  container.innerHTML = '';

  // Cria um elemento div para cada conjunto de dados
  dados.forEach((aluno) => {
    const divAluno = document.createElement('div');
    divAluno.classList.add('card', 'mb-3');

    const divCardBody = document.createElement('div');
    divCardBody.classList.add('card-body');

    // Adiciona os detalhes do aluno ao corpo do cartão
    divCardBody.innerHTML = `
        <h5 class="card-title">${aluno.nome}</h5>
        <p class="card-text">Matrícula: ${aluno.matricula}</p>
        <p class="card-text">Curso: ${aluno.curso}</p>
        <p class="card-text">Data de Nascimento: ${aluno.data_nascimento}</p>
        <p class="card-text">Telefone: ${aluno.telefone}</p>
    `;

    // Adiciona o corpo do cartão ao cartão e o cartão ao container
    divAluno.appendChild(divCardBody);
    container.appendChild(divAluno);
  });

  // Limpa os campos do formulário
  document.getElementById('nomeCompleto').value = '';
  document.getElementById('matricula').value = '';
  document.getElementById('curso').value = '';
  document.getElementById('dataNascimento').value = '';
  document.getElementById('telefone').value = '';
}


// Modificando a função salvar para acumular os dados registrados
function salvar() {
  const nome = document.getElementById('nomeCompleto').value;
  const matricula = document.getElementById('matricula').value;
  const curso = document.getElementById('curso').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  const telefone = document.getElementById('telefone').value;

  fetch('https://alunos-192-default-rtdb.firebaseio.com/alunos.json', {
    method: 'POST',
    body: JSON.stringify({
      nome: nome,
      matricula: matricula,
      curso: curso,
      data_nascimento: dataNascimento,
      telefone: telefone,
    })
  })
  .then(response => response.json())
  .then(data => {
    // Obtém todos os alunos existentes
    fetch('https://alunos-192-default-rtdb.firebaseio.com/alunos.json')
      .then(response => response.json())
      .then(alunos => {
        // Verifica se o novo aluno já está presente no array
        const todosAlunos = Object.values(alunos || {});
        const alunoExistente = todosAlunos.find(aluno => aluno.matricula === matricula);

        if (!alunoExistente) {
          todosAlunos.push({ ...data, nome, matricula, curso, data_nascimento: dataNascimento, telefone });
        }

        // Exibe os dados registrados
        exibirDadosRegistrados(todosAlunos);
      })
      .catch(error => console.error('Erro ao buscar alunos:', error));
  })
  .catch(error => console.error('Erro ao salvar os dados:', error));
}


// Inicializa exibição com dados de exemplo
exibirDadosRegistrados([
  {
    nome: 'Exemplo Nome',
    matricula: '12345',
    curso: 'Exemplo Curso',
    data_nascimento: '01/01/2000',
    telefone: '1234567890'
  }
]);
