// src/pages/PrivacyPolicy.jsx
import React from 'react';
// (Removemos os imports do TeamMemberCard e das fotos)

export default function PrivacyPolicy() { // <-- Nome da função alterado
  return (
  	// 1. DIV PRINCIPAL
    <div className="w-full">
      
      {/* 2. SEÇÃO AZUL (Banner + Texto) */}
      <div className="w-full bg-gradient-primary pt-32 pb-16 space-y-16">

        {/* --- Título do Banner (Alterado) --- */}
        <div className="flex flex-col items-center text-white text-center p-4">
          <span className="text-4xl font-bold">
            Política de 
            <span style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "var(--color-highlight)"}}> Privacidade</span>
          </span>
          <span className="mt-4 text-base font-medium max-w-xl text-white">
            Seu direito à privacidade levado a sério.
          </span>
        </div>

        {/* --- Seção de Texto da Política (Placeholder) --- */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          
          {/* Você pode substituir este conteúdo pelo texto real */}
          
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Visão Geral
          </h2>
          <p className="text-lg font-medium text-white leading-relaxed mb-8">
            Bem-vindo à Política de Privacidade do Quero Doar. Este documento explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossa plataforma. Sua confiança é fundamental para nós.
          </p>

          <hr className="my-10 border-gray-100/100" />

          <h3 className="text-2xl font-bold text-white mb-6">
            1. Coleta de Dados
          </h3>
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
            Coletamos informações que você nos fornece diretamente, como:
          </p>
          {/* Exemplo de formatação de lista */}
          <ul className="list-disc list-inside text-lg font-medium text-white leading-relaxed mb-4 pl-4">
            <li>Informações de Cadastro: Seu nome, e-mail, senha e localização.</li>
            <li>Informações de Anúncio: Descrições e fotos dos itens doados ou pedidos.</li>
            <li>Informações de Contato: Mensagens trocadas entre doadores e receptores através da plataforma.</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mb-6 mt-10">
            2. Uso das Informações
          </h3>
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
            Usamos suas informações para:
          </p>
          <ul className="list-disc list-inside text-lg font-medium text-white leading-relaxed mb-4 pl-4">
            <li>Operar e manter a plataforma Quero Doar.</li>
            <li>Facilitar a comunicação entre usuários.</li>
            <li>Implementar o sistema de "leveling" e destaques.</li>
            <li>Garantir a segurança e prevenir fraudes.</li>
          </ul>

          {/* (Adicione mais seções conforme o seu texto real) */}

        </div>
      </div>
      
      {/* 3. "FADE" (Removido) */}
      {/* 4. "SEÇÃO DA EQUIPE" (Removida) */}

    </div>
  );
}