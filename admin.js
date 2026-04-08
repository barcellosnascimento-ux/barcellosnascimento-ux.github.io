// 1. CONFIGURAÇÃO DO BANCO
const supabaseUrl = "https://hgbahtkeuhrppjgksvdv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnYmFodGtldWhycHBqZ2tzdmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIwNTQsImV4cCI6MjA4OTg0ODA1NH0.Gbi7iV94CHgQj_B3PcnvxvnaixdIznyonRsFWmHrJsg";

// Inicializa o cliente do banco antes de usar nas funções
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

async function verificarAcesso() {
  // Pergunta ao Supabase: Tem alguém logado?
  const {
    data: { user },
  } = await banco.auth.getUser();

  if (!user) {
    alert("Área restrita! Faça login primeiro.");
    window.location.href = "login.html"; // Expulsa o invasor
  } else {
    // Se estiver logado, mostra o e-mail no crachá
    document.getElementById("nome-usuario").innerText = user.email;
  }
}

// Executa a verificação ao abrir a página
verificarAcesso();

// 2. FUNÇÃO DE LOGOUT (NOVO)
async function sairDoSistema() {
  await banco.auth.signOut();
  window.location.href = "index.html"; // Manda de volta para a vitrine pública
}

// 3. FUNÇÃO DE CADASTRO
async function cadastrarProduto() {
  let nomeProduto = document.getElementById("input-nome").value;
  let precoDigitado = document.getElementById("input-preco").value;
  let imagemProduto = document.getElementById("input-imagem").value;
  let aviso = document.getElementById("mensagem-aviso");

  let precoProduto = parseFloat(precoDigitado);

  if (nomeProduto === "" || precoDigitado === "" || imagemProduto === "") {
    aviso.innerText = "Preencha todos os campos!";
    aviso.style.color = "red";
    return;
  }

  if (isNaN(precoProduto)) {
    aviso.innerText = "Digite um preço válido (ex: 199.90)";
    aviso.style.color = "red";
    return;
  }

  aviso.innerText = "Salvando na nuvem...";
  aviso.style.color = "blue";

  let { error } = await banco.from("produtos").insert([
    {
      nome: nomeProduto,
      preco: precoProduto,
      imagem_url: imagemProduto,
    },
  ]);

  if (error) {
    aviso.innerText = "Erro ao salvar: " + error.message;
    aviso.style.color = "red";
  } else {
    aviso.innerText = "✅ Produto cadastrado com sucesso!";
    aviso.style.color = "green";

    document.getElementById("input-nome").value = "";
    document.getElementById("input-preco").value = "";
    document.getElementById("input-imagem").value = "";
    document.getElementById("input-nome").focus();
  }
}
