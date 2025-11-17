// src/pages/Contact.jsx
import React, { useState } from 'react';
// 1. Importe os componentes que vamos usar
import Input from '../components/Input/Input';
import TextArea from '../components/TextArea/TextArea';
import Button from '../components/Button/Button';
import { FaFacebookF, FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa6';

export default function Contact() {
  // 2. Estados para controlar os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Para erros de envio
  const [success, setSuccess] = useState(false); // Para mensagem de sucesso

  // 3. Função para lidar com o envio
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Cria o objeto de dados (pronto para o backend)
    const formData = {
      name,
      email,
      phone,
      message,
    };

    // --- SIMULAÇÃO (DEIXANDO PRONTO) ---
    // Aqui você faria a chamada para a API (ex: axios.post('/api/contato', formData))
    // Vamos simular uma espera de 2 segundos
    console.log('Dados do formulário prontos para enviar:', formData);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simular um sucesso
    setLoading(false);
    setSuccess(true);
    // Limpar o formulário
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');

    // (Se desse erro no backend, você faria: setError("Houve um erro..."), setLoading(false))
  };

  return (
    // 4. Layout (copiado do AboutUs.jsx)
    <div className="w-full">
      
      {/* SEÇÃO AZUL (Banner) */}
      <div className="w-full bg-gradient-primary pt-32 pb-16 space-y-16">
        {/* --- Título do Banner (Alterado) --- */}
        <div className="flex flex-col items-center text-white text-center p-4">
          <span className="text-4xl font-bold">
            Entre em 
            <span style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "var(--color-highlight)"}}> Contato</span>
          </span>
          <span className="mt-4 text-base font-medium max-w-xl text-white">
            Tem alguma dúvida ou sugestão? Fale conosco.
          </span>
        </div>
      </div>
      
      {/* "FADE" (Transição do azul para o cinza) */}
      <div className="w-full h-32 bg-gradient-to-b from-[var(--color-gradient-primary-end, #SEU_TOM_DE_AZUL_ESCURO)] to-slate-100 -mt-16" />

      {/* 5. SEÇÃO DO FORMULÁRIO (FUNDO CINZA) */}
      <div className="w-full bg-slate-100 pt-16 pb-16 space-y-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          
          {/* CARD BRANCO PARA O FORMULÁRIO */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* --- Lado Esquerdo: Formulário --- */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Formulário de Contato
                </h2>
                <p className="text-gray-600 mb-6">
                  Preencha os campos abaixo para nos enviar uma mensagem.
                </p>

                {/* Mensagem de Sucesso (só aparece se 'success' for true) */}
                {success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6" role="alert">
                    <strong className="font-bold">Mensagem enviada!</strong>
                    <span className="block sm:inline"> Obrigado por entrar em contato.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Nome"
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    appearance="default"
                  />
                  <Input
                    label="E-mail"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    appearance="default"
                  />
                  <Input
                    label="Telefone"
                    type="tel"
                    placeholder="(XX) XXXXX-XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    appearance="default"
                  />
                  <TextArea
                    label="Mensagem"
                    placeholder="Escreva sua dúvida ou sugestão aqui..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    appearance="default" // Aumenta a altura
                  />
                  
                  {/* Mensagem de Erro (só aparece se 'error' existir) */}
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}

                  <Button 
                    type="submit" 
                    appearance="primary" // Botão vermelho (baseado na sua foto)
                    size="large"
                    loading={loading} // Ativa o spinner no envio
                    className="w-full md:w-auto" // Ocupa 100% no mobile
                  >
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </div>

              {/* --- Lado Direito: Redes Sociais --- */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Outros Canais
                </h3>
                
                {/* E-mail */}
                <div className="flex items-center gap-4 mb-5">
                  <FaEnvelope className="w-6 h-6 text-gray-600" />
                  <a href="mailto:contato@querodoar.com.br" className="text-lg text-gray-700 hover:text-blue-600">
                    contato@querodoar.com.br
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-10">
                  Redes Sociais
                </h3>
                <div className="flex items-center gap-6">
                  {/* Ícones (use seus links reais) */}
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-800 transition-colors">
                    <FaFacebookF className="w-8 h-8" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors">
                    <FaWhatsapp className="w-8 h-8" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors">
                    <FaInstagram className="w-8 h-8" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}