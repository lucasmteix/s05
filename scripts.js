// objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  
  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // na lista, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // Caso exista armário(s) disponíveil, seguimos sorteando uma opção. 
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Depois localizamos o armário emprestado na lista de armarios e mudamos o status do armário.
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;
  
  //Registra-se data e hora de emprestimo
  const dataHoraEmprestimo = new Date(); //obtendo data e hora
  armarioEmprestado.dataHoraEmprestimo = dataHoraEmprestimo; //registrando em uma chave nova do objeto

  //Calcula-se e registra-se data e hora de entrega
  armarioEmprestado.dataHoraEntrega = calcularDataHoraEntrega(dataHoraEmprestimo);

  // Finalmente, mudamos a pendencia do usuário para verdadeira.
  usuario.pendencia = true;
  
  // Impmimimos uma mensagem confirmando a reserva e o horario de entrega para o usuario
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! Data e hora de entrega: ${armarioEmprestado.dataHoraEntrega.toLocaleString("pt-BR")}`;
}

// Funcao que calcula e retorna a data e a hora de entrega, com base nas de emprestimo
function calcularDataHoraEntrega(dataHoraEmprestimo){

  const prazoEmDias = 1;
  let dataHoraEntrega = new Date(dataHoraEmprestimo);

  dataHoraEntrega.setDate(dataHoraEmprestimo.getDate() + prazoEmDias);

  return dataHoraEntrega;
}