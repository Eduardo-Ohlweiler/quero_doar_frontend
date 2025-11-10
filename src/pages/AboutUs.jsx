// src/pages/AboutUs.jsx
import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard/TeamMemberCard'; // Mantenha a importação
import fotoMembro3 from '../assets/images/foto-membro-enzo.png';

export default function AboutUs() {
  return (
    // 1. DIV PRINCIPAL)
    <div className="w-full">
      
      {/* 2. SEÇÃO AZUL (Banner + Texto) */}
      {/* 'bg-gradient-primary': Seu fundo azul. */}
      {/* 'pt-32': (128px) Padding para pular o Header Fixo (que é transparente). */}
      {/* 'pb-16': Padding na base. */}
      <div className="w-full bg-gradient-primary pt-32 pb-16 space-y-16">

        {/* --- Título do Banner --- */}
        <div className="flex flex-col items-center text-white text-center p-4">
          <span className="text-4xl font-bold hover:cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            Conectando quem 
            <span style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "var(--color-highlight)"}}> ajuda</span>
            <span> a quem </span>
            <span style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "var(--color-highlight)"}}> precisa</span>
          </span>
          <span className="mt-4 text-base font-medium max-w-xl text-white">
            Sua doação transforma vidas. Entenda nossa missão.
          </span>
        </div>

        {/* --- Seção de Missão (AGORA NO FUNDO AZUL) --- */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Nossa Missão: O Poder da Doação
          </h2>
          {/* AQUI: Texto 'text-white' para ler bem no fundo azul */}
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
            Bem-vindo ao Quero Doar. Nascemos de uma ideia simples: 
            <strong className="font-semibold text-white"> a sua doação tem o poder de <span style={{color: "var(--color-highlight)"}}>transformar vidas</span>.</strong>
          </p>
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
            Muitas vezes, o que não tem mais utilidade para nós pode ser o item que realmente falta para outra pessoa. Um casaco esquecido no armário pode se tornar o abraço mais quente em um dia frio. Um livro que já lemos pode abrir um novo universo para um estudante. Um móvel antigo pode ser o começo de um novo lar.
          </p>
          <p className="text-lg font-medium text-white leading-relaxed mb-8">
            O Quero Doar é a <span style={{color: "var(--color-highlight)"}}>ponte</span> que conecta essas duas realidades. Nossa missão é mais do que facilitar a logística da doação; é construir uma <span style={{color: "var(--color-highlight)"}}>comunidade</span> forte, solidária e que acredita no impacto positivo de cada gesto.
          </p>

          <hr className="my-10 border-gray-100/100" />

          {/* --- "Como Funciona" (AGORA NO FUNDO AZUL) --- */}
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Como Funciona
          </h3>
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
            A plataforma funcionará como um ponto de encontro entre quem deseja doar itens e quem precisa deles. Usuários poderão criar anúncios de doação descrevendo o objeto, local de retirada e fotos.
          </p>
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
            Quem estiver em busca de doações pode navegar, filtrar por categorias e entrar em contato diretamente com o doador. Do mesmo modo, pessoas em necessidade registrarão pedidos específicos, e potenciais doadores serão notificados para oferecer ajuda.
          </p>
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
            Para incentivar as doações, uma sistemática de <span style={{color: "var(--color-highlight)"}}>leveling</span> onde a cada doação, feedback e interação gerará pontos. Usuários com maior pontuação no mês ou semana terá um <span style={{color: "var(--color-highlight)"}}>destaque</span> na home page da aplicação.
          </p>
        </div>
      </div>
      
      {/* 3. O "FADE" (Transição do azul para o cinza) */}
      <div className="w-full h-32 bg-gradient-to-b from-[var(--color-gradient-primary-end, #SEU_TOM_DE_AZUL_ESCURO)] to-slate-100 -mt-16" />
      {/* (Lembre-se de ajustar a cor 'from-' aqui para o seu tom de azul escuro) */}


      {/* 4. SEÇÃO DA EQUIPE (FUNDO CINZA) */}
      <div className="w-full bg-slate-100 pt-16 pb-16 space-y-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            
            <TeamMemberCard 
              imageUrl="https://via.placeholder.com/150" 
              name="Nome do Membro 1"
              role="Full-Stack Developer"
              githubUrl="https://github.com/membro1"   // <-- LINK ADICIONADO
            />
            
            <TeamMemberCard 
              imageUrl={fotoMembro3}
              name="Enzo Grigol Martins"
              role="Full-Stack Developer"
              githubUrl="https://github.com/grigolenzo"   // <-- LINK ADICIONADO
              linkedinUrl="https://www.linkedin.com/in/enzo-grigol-martins-20979b246/" // <-- LINK ADICIONADO
            />

            <TeamMemberCard 
              imageUrl="https://via.placeholder.com/150"
              name="Nome do Membro 3"
              role="Product Owner"
              linkedinUrl="https://linkedin.com/in/membro3" // <-- LINK ADICIONADO
            />

            {/* O restante dos cards (sem links, por enquanto) */}
            <TeamMemberCard 
              imageUrl="https://via.placeholder.com/150"
              name="Nome do Membro 3"
              role="Product Owner"
            />
            <TeamMemberCard 
              imageUrl="https://via.placeholder.com/150"
              name="Nome do Membro 3"
              role="Product Owner"
            />
            <TeamMemberCard 
              imageUrl="https://via.placeholder.com/150"
              name="Nome do Membro 3"
              role="Product Owner"
            />
            <TeamMemberCard 
              imageUrl="https://via.placeholder.com/150"
              name="Nome do Membro 3"
    S         role="Product Owner"
            />
            <TeamMemberCard 
              imageUrl="https://via.placeholder.com/150"
              name="Nome do Membro 3"
              role="Product Owner"
            />
            <TeamMemberCard 
AR           imageUrl="https://via.placeholder.com/150"
              name="Nome do Membro 3"
              role="Product Owner"
            />
            <TeamMemberCard 
img           imageUrl="https://via.placeholder.com/150"
              name="Nome do Membro 3"
              role="Product Owner"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}