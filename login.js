const supabaseUrl = "https://hgbahtkeuhrppjgksvdv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnYmFodGtldWhycHBqZ2tzdmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIwNTQsImV4cCI6MjA4OTg0ODA1NH0.Gbi7iV94CHgQj_B3PcnvxvnaixdIznyonRsFWmHrJsg";
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- DESAFIO 1: ATALHO DO TECLADO ---
// Seleciona o campo de senha e adiciona o ouvinte para a tecla Enter
document.getElementById("password").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    fazerLogin();
  }
});

async function fazerLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("mensagem");
  const btn = document.getElementById("btn-entrar");

  // Validação simples antes de tentar o login
  if (!email || !password) {
    msg.innerText = "Por favor, preencha todos os campos.";
    msg.style.color = "orange";
    return;
  }

  // Efeito de carregamento (Feedback visual)
  btn.innerText = "Verificando...";
  btn.disabled = true;

  // Comando que tenta logar no Supabase
  const { data, error } = await banco.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    msg.innerText = "Acesso Negado: " + error.message;
    msg.style.color = "red";
    btn.innerText = "Entrar no Painel";
    btn.disabled = false; // Libera o botão novamente
  } else {
    msg.innerText = "Acesso concedido! Carregando painel...";
    msg.style.color = "green";
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);
  }
}

// Alterna entre texto escondido e visível
function mostrarSenha() {
  let inputSenha = document.getElementById("password");
  let btnOlho = document.getElementById("btn-olho");

  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    btnOlho.innerText = "🙈"; // Troca o emoji
  } else {
    inputSenha.type = "password";
    btnOlho.innerText = "👁️";
  }
}
