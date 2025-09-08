import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import UserMenu from '../UserMenu/UserMenu';
import Button from '../Button/Button';
import { headerStyles } from './Header.styles';

const Header = ({
  showSearchBar,
  onSearch,
  isAuthenticated,
  user,
  showLoginButton,
  onLogin,
  className,
}) => {
  return (
    <header className={twMerge(clsx(headerStyles(), className))}>
      <div className="flex items-center justify-between w-full px-4 py-2">
        <Logo />
        {showSearchBar && <SearchBar className="w-[50vw] max-w-[800px]" appearance="outlined" onSearch={onSearch} placeholder="Buscar..." />}
        <div className="flex items-center gap-4">
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
};

Header.defaultProps = {
  showSearchBar: false,
  onSearch: () => {},
  isAuthenticated: false,
  user: null,
  showLoginButton: true,
  onLogin: () => {},
  className: '',
};

export default Header;
