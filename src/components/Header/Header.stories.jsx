import React from 'react';
import Header from './Header';
import { AuthProvider } from '../../context/AuthContext.jsx';

const ZOO_BG = 'https://upload.wikimedia.org/wikipedia/commons/8/8d/San_Diego_Zoo_April_2013_07.JPG';

export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [(Story) => <AuthProvider><Story/></AuthProvider>],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' },
      ],
    },
    docs: {
      description: {
        component: 'Cabeçalho (Header) do projeto Quero Doar. Suporta variante com/sem barra de pesquisa, integração com menu de usuário quando autenticado e botão "Entrar" quando não autenticado. Responsivo e acessível.\n\nNota: imagens como background não aparecem como swatches no addon de backgrounds; por isso existe a story "WithZooBackground" que aplica a imagem via wrapper.'
      }
    }
  },
  argTypes: {
    showSearchBar: { control: 'boolean' },
    isAuthenticated: { control: 'boolean' },
    showLoginButton: { control: 'boolean' },
    onSearch: { action: 'search submitted' },
    onLogin: { action: 'login clicked' },
  },
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  showSearchBar: false,
  isAuthenticated: false,
  showLoginButton: true,
};

export const WithSearchBar = Template.bind({});
WithSearchBar.args = {
  showSearchBar: true,
  isAuthenticated: false,
  showLoginButton: true,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  showSearchBar: true,
  isAuthenticated: true,
  user: { name: 'Maria Silva', avatar: 'http://localhost:8080/media/user/default.webp' },
  showLoginButton: false,
};

// Story que aplica a imagem diretamente via wrapper — mais confiável que tentar usar backgrounds addon para imagens
export const WithZooBackground = (args) => (
  <div style={{
    backgroundImage: `url(${ZOO_BG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: 0,
    margin: 0,
  }}>
    <Header {...args} />
  </div>
);
WithZooBackground.args = {
  showSearchBar: true,
  isAuthenticated: false,
  showLoginButton: true,
};
WithZooBackground.parameters = {
  backgrounds: { default: 'light' },
};

// Story que exibe a imagem de fundo e conteúdo rolável para testar comportamento do Header
export const WithZooScrollable = (args) => (
  <div style={{
    backgroundImage: `url(${ZOO_BG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '200vh',
    padding: 0,
    margin: 0,
  }}>
    {/* Mantém o header visível durante a rolagem */}
    <div style={{ position: 'sticky', top: 0, zIndex: 60 }}>
      <Header {...args} />
    </div>

    <main style={{ paddingTop: '16px', paddingBottom: '200px' }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <section key={i} style={{ maxWidth: 960, margin: '24px auto', padding: 16, background: 'rgba(255,255,255,0.85)', borderRadius: 8 }}>
          <h3>Seção de teste {i + 1}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </section>
      ))}
    </main>
  </div>
);
WithZooScrollable.args = {
  showSearchBar: true,
  isAuthenticated: false,
  showLoginButton: true,
};
WithZooScrollable.parameters = {
  backgrounds: { default: 'light' },
};

// Story que aplica a imagem de fundo com header autenticado
export const WithZooAuthenticated = (args) => (
  <div style={{
    backgroundImage: `url(${ZOO_BG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: 0,
    margin: 0,
  }}>
    <Header {...args} />
  </div>
);
WithZooAuthenticated.args = {
  showSearchBar: true,
  isAuthenticated: true,
  user: { name: 'Maria Silva', avatar: 'http://localhost:8080/media/user/default.webp' },
  showLoginButton: false,
};
WithZooAuthenticated.parameters = {
  backgrounds: { default: 'light' },
};

// Story que exibe uma página rolável com o gradiente definido em --gradient-primary
export const WithGradientScrollable = (args) => (
  <div style={{
    background: 'var(--gradient-primary)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '200vh',
    padding: 0,
    margin: 0,
  }}>
    <div style={{ position: 'sticky', top: 0, zIndex: 60 }}>
      <Header {...args} />
    </div>

    <main style={{ paddingTop: '16px', paddingBottom: '200px' }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <section key={i} style={{ maxWidth: 960, margin: '24px auto', padding: 16, background: 'rgba(255,255,255,0.85)', borderRadius: 8 }}>
          <h3>Bloco de conteúdo {i + 1}</h3>
          <p>
            Conteúdo de exemplo para testar rolagem sobre o gradiente da aplicação. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </section>
      ))}
    </main>
  </div>
);
WithGradientScrollable.args = {
  showSearchBar: true,
  isAuthenticated: false,
  showLoginButton: true,
};
WithGradientScrollable.parameters = {
  backgrounds: { default: 'light' },
};
