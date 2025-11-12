// src/pages/DonationTips.jsx
import React from 'react';

// Nome da função alterado
export default function DonationTips() { 
  return (
  	// 1. DIV PRINCIPAL
  	<div className="w-full">
      
      {/* 2. SEÇÃO AZUL (Banner + Texto) */}
      <div className="w-full bg-gradient-primary pt-32 pb-16 space-y-16">

        {/* --- Título do Banner (Alterado) --- */}
        <div className="flex flex-col items-center text-white text-center p-4">
          <span className="text-4xl font-bold">
            Dicas de 
            <span style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "var(--color-highlight)"}}> Doação</span>
          </span>
          <span className="mt-4 text-base font-medium max-w-xl text-white">
            Faça sua doação ter o maior impacto possível.
          </span>
        </div>

        {/* --- Seção de Texto das Dicas (Placeholder) --- */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          
          {/* Você pode substituir este conteúdo pelo texto real */}
          
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Como Preparar sua Doação
          </h2>
          <p className="text-lg font-medium text-white leading-relaxed mb-8">
            Doar é um ato de generosidade, e prepará-lo bem garante que quem recebe possa aproveitar ao máximo. Lembre-se da regra de ouro: 
            <strong className="font-semibold text-white"> "Eu usaria isso?"</strong>. Se a resposta for não (por estar quebrado, manchado ou inutilizável), é provável que não sirva para mais ninguém.
          </p>

          <hr className="my-10 border-gray-100/100" />

          <h3 className="text-2xl font-bold text-white mb-6">
            1. Roupas e Calçados
          </h3>
          <ul className="list-disc list-inside text-lg font-medium text-white leading-relaxed mb-4 pl-4">
            <li>Lave as peças antes de doar.</li>
            <li>Verifique se não há rasgos, furos ou manchas grandes.</li>
            <li>Doe pares de calçados (e, se possível, amarre os cadarços um no outro).</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mb-6 mt-10">
            2. Móveis e Eletrodomésticos
          </h3>
          <ul className="list-disc list-inside text-lg font-medium text-white leading-relaxed mb-4 pl-4">
            <li>Seja honesto na descrição: informe se há algum defeito ou se falta alguma peça.</li>
            <li>Limpe o item antes de fotografar. Boas fotos aumentam a chance da doação ser aceita.</li>
            <li>Verifique se eletrodomésticos estão funcionando (ex: teste a geladeira, o micro-ondas).</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mb-6 mt-10">
            3. Segurança na Entrega
          </h3>
          <ul className="list-disc list-inside text-lg font-medium text-white leading-relaxed mb-4 pl-4">
            <li>Combine a entrega/retirada em locais públicos e movimentados, se possível.</li>
            <li>Se for em casa, tente ter mais alguém com você no momento da retirada.</li>
            <li>Não passe informações pessoais desnecessárias (como seu CPF ou dados bancários) pelo chat.</li>
          </ul>

        </div>
      </div>
      
      {/* As seções "Fade" e "Equipe" não existem nesta página */}

    </div>
  );
}