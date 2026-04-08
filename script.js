// 1. CONFIGURAÇÃO DO BANCO DE DADOS
const supabaseUrl = "https://hgbahtkeuhrppjgksvdv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnYmFodGtldWhycHBqZ2tzdmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIwNTQsImV4cCI6MjA4OTg0ODA1NH0.Gbi7iV94CHgQj_B3PcnvxvnaixdIznyonRsFWmHrJsg";

// Inicia a conexão
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. FUNÇÃO PARA BUSCAR E DESENHAR OS PRODUTOS
async function carregarCatalogo() {
  // Faz um SELECT * FROM produtos na nuvem
  let { data: produtos, error } = await banco.from("produtos").select("*");

  if (error) {
    console.error("Erro ao buscar dados:", error);
    return;
  }

  let vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = ""; // Limpa a tela antes de desenhar

  // Loop para desenhar cada produto na tela
  produtos.forEach((item) => {
    // PASSO 3: Cria a máscara de moeda Brasileira
    let precoFormatado = Number(item.preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    let div = document.createElement("div");
    div.className = "card-produto";
    div.innerHTML = `
        <img src="${item.imagem_url}" width="150">
        <h3>${item.nome}</h3>
        <p class="preco-destaque">${precoFormatado}</p>
    `;
    vitrine.appendChild(div);
  });
}

// Roda a função assim que o site abrir
carregarCatalogo();
