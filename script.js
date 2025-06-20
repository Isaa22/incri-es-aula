document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const form = document.getElementById('inscricaoForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const alertBox = document.getElementById('alertBox');

    // Função para mostrar alerta
    function showAlert(message, type = 'success') {
        alertBox.textContent = message;
        alertBox.className = `alert ${type}`;
        alertBox.style.display = 'block';
        
        // Esconder o alerta após 5 segundos
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 5000);
    }

    // Função para validar o formulário
    function validateForm(data) {
        if (!data.nome || data.nome.length < 3) {
            showAlert('Por favor, insira um nome válido (mínimo 3 caracteres)', 'error');
            return false;
        }

        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            showAlert('Por favor, insira um e-mail válido', 'error');
            return false;
        }

        if (data.telefone && !/^[\d\s()-]{10,}$/.test(data.telefone)) {
            showAlert('Por favor, insira um telefone válido', 'error');
            return false;
        }

        if (!data.interesse) {
            showAlert('Por favor, selecione uma área de interesse', 'error');
            return false;
        }

        // Verificar reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showAlert('Por favor, complete a verificação reCAPTCHA', 'error');
            return false;
        }

        return true;
    }

    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            interesse: document.getElementById('interesse').value
        };

        // Validar formulário
        if (!validateForm(formData)) return;

        // Configurar estado de loading
        submitBtn.disabled = true;
        btnText.textContent = 'Enviando...';
        btnLoading.style.display = 'inline-block';

        // Enviar via EmailJS
        emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showAlert('Inscrição enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
                grecaptcha.reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                showAlert('Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.', 'error');
            })
            .finally(function() {
                // Restaurar estado normal do botão
                submitBtn.disabled = false;
                btnText.textContent = 'Enviar Inscrição';
                btnLoading.style.display = 'none';
            });
    });

    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        // Formatar como (00) 00000-0000
        if (value.length > 2) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        }
        if (value.length > 10) {
            value = `${value.substring(0, 10)}-${value.substring(10)}`;
        }
        
        e.target.value = value;
    });
});
