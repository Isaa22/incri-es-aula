document.getElementById('inscricaoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        interesse: document.getElementById('interesse').value
    };
    
    // Enviar dados para o servidor (simulado)
    enviarDadosParaEmail(formData);
});

function enviarDadosParaEmail(data) {
    // Aqui você precisará de um serviço backend para enviar emails
    // Solução temporária: abrir o cliente de email padrão
    
    const assunto = 'Nova Inscrição Recebida';
    const corpo = `Nome: ${data.nome}\nEmail: ${data.email}\nTelefone: ${data.telefone}\nInteresse: ${data.interesse}`;
    
    // Substitua SEU_EMAIL pelo seu endereço de email real
    window.location.href = `mailto:SEU_EMAIL@exemplo.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    
    // Mensagem de sucesso
    alert('Inscrição enviada com sucesso! Em breve entraremos em contato.');
    
    // Limpar formulário
    document.getElementById('inscricaoForm').reset();
}
