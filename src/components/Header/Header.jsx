import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import UserMenu from '../UserMenu/UserMenu';
import Button from '../Button/Button';
import { useSearchBar } from '../../hooks/useSearchBar';
import { headerStyles } from './Header.styles';

const Header = ({
  showSearchBar,
  onSearch,
  isAuthenticated,
  user,
  showLoginButton,
  onLogin,
  onLogoClick,
  className,
  children,
}) => {
  // Hook para integração com o contexto de busca
  const searchBarProps = useSearchBar({
    navigateOnSearch: true,
    searchRoute: '/search',
    syncWithUrl: true,
    onSearch: onSearch, // Callback customizado se fornecido
  });
  return (
    <header className={twMerge(clsx(headerStyles(), className))}>
      <div className="flex items-center justify-between w-full px-4 py-2">
        {/* Left: fixed width area for logo to match actions width */}
        <div className="w-48 flex items-center justify-start">
          <Logo 
            className="cursor-pointer select-none" 
            role="button"
            title="Voltar para a página inicial"
            onClick={onLogoClick} />
        </div>

        {/* Center: flexible search area that keeps size regardless of auth state */}
        <div className="flex-1 flex justify-center px-4">
          {showSearchBar && (
            <SearchBar
              className="w-full max-w-[800px]"
              appearance="outlined"
              placeholder="Buscar doações..."
              iconPosition="right"
              {...searchBarProps}
            />
          )}
        </div>

        {/* Right: fixed width area for actions (user menu or login) */}
        <div className="w-48 flex items-center justify-end">
          <div className="flex items-center gap-4">
            {children}
            {isAuthenticated ? (
              <UserMenu user={user} appearance="secondary" />
            ) : (
              showLoginButton && (
                <Button appearance="secondary" onClick={onLogin}>
                  Entrar
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  showSearchBar: PropTypes.bool,
  onSearch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  showLoginButton: PropTypes.bool,
  onLogin: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

Header.defaultProps = {
  showSearchBar: false,
  onSearch: () => {},
  isAuthenticated: false,
  user: null,
  showLoginButton: true,
  onLogin: () => {},
  className: '',
  children: null,
};

export default Header;
export const HEADER_REM_HEIGHT = 3.5; // 14 unidades tailwind em rem (14 * 0.25 = 3.5)
