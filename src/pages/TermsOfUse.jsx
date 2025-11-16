// src/pages/TermsOfUse.jsx
import React from 'react';

// Nome da função alterado
export default function TermsOfUse() { 
  return (
  	// 1. DIV PRINCIPAL
  	<div className="w-full">
      
      {/* 2. SEÇÃO AZUL (Banner + Texto) */}
      <div className="w-full bg-gradient-primary pt-32 pb-16 space-y-16">

        {/* --- Título do Banner (Alterado) --- */}
        <div className="flex flex-col items-center text-white text-center p-4">
          <span className="text-4xl font-bold">
            Termos de 
            <span style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "var(--color-highlight)"}}> Uso</span>
          </span>
          <span className="mt-4 text-base font-medium max-w-xl text-white">
            Conheça as regras para usar nossa plataforma.
          </span>
        </div>

        {/* --- Seção de Texto dos Termos (Placeholder) --- */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          
          {/* Você pode substituir este conteúdo pelo texto real */}
          
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Aceitação dos Termos
          </h2>
          <p className="text-lg font-medium text-white leading-relaxed mb-8">
          	Ao acessar e usar a plataforma Quero Doar, você concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
          </p>

          <hr className="my-10 border-gray-100/100" />

          <h3 className="text-2xl font-bold text-white mb-6">
            1. O Papel da Plataforma
          </h3>
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
          	O Quero Doar atua como um <strong className="font-semibold text-white">ponto de encontro</strong> (intermediário) para conectar doadores e receptores. Não nos responsabilizamos pela qualidade, segurança ou legalidade dos itens doados, nem pela veracidade das informações nos anúncios.
          </p>
        	<p className="text-lg font-medium text-white leading-relaxed mb-4">
        		A negociação, entrega e retirada dos itens são de inteira responsabilidade dos usuários envolvidos.
          </p>

          <h3 className="text-2xl font-bold text-white mb-6 mt-10">
            2. Responsabilidades do Usuário
          </h3>
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
          	Você concorda em:
          </p>
          <ul className="list-disc list-inside text-lg font-medium text-white leading-relaxed mb-4 pl-4">
            <li>Fornecer informações verdadeiras e precisas ao criar sua conta e seus anúncios.</li>
            <li>Não doar itens ilegais, perigosos ou impróprios.</li>
            <li>Tratar outros usuários com respeito e urbanidade nas comunicações.</li>
            <li>Não usar a plataforma para fins comerciais, spam ou qualquer atividade fraudulenta.</li>
          </ul>
        	<p className="text-lg font-medium text-white leading-relaxed mb-4">
        		O descumprimento destas regras pode levar à suspensão ou encerramento da sua conta.
          </p>

          {/* (Adicione mais seções conforme o seu texto real) */}

        </div>
      </div>
      
    	{/* As seções "Fade" e "Equipe" não existem nesta página */}

    </div>
  );
}