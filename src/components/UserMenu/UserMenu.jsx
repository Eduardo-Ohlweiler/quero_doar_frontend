import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
    userMenuStyles, 
    userMenuChevronStyles, 
    userMenuDropdownStyles, 
    userMenuItemStyles, 
    userMenuIconStyles 
} from './UserMenu.styles';
import UserAvatar from '../UserAvatar/UserAvatar';
import { buildLink } from '../../services/util/stringUtil';
import { useAuth } from '../../context/AuthContext';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const AVATAR_PATH = import.meta.env.VITE_GET_MEDIA_USER_ROUTE || '/media/user';
const DEFAULT_AVATAR = import.meta.env.VITE_GET_MEDIA_USER_DEFAULT_PHOTO || 'default.webp';

export class user {
    constructor(firstName, lastName, avatar, isAdmin = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.isAdmin = isAdmin;
    }

    static fromVUser(vUser) {
        if (!vUser) return null;
        const names = vUser.name ? vUser.name.split(' ') : [];
        const firstName = names.length > 0 ? names[0] : '';
        const lastName = names.length > 1 ? names[names.length - 1] : '';
        const avatar = vUser.photo ? buildLink([BASE_API_URL, AVATAR_PATH, vUser.photo]) : buildLink([BASE_API_URL, AVATAR_PATH, DEFAULT_AVATAR]);
        return new user(firstName, lastName, avatar, vUser.role === 'ADMIN');
    }
}

export default function UserMenu({ 
    user,
    size = 'medium',
    appearance = 'secondary',
    showUserName = true,
    onProfile,
    onDonations, 
    onLogout,
    onAdmin,
    className,
    ...rest 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const triggerRef = useRef(null);
    const { logout } = useAuth();

    // Função para logout que chama o callback
    const handleLogout = () => {
        if (onLogout) onLogout();
        logout();
    }

    // Função para fechar o menu
    const closeMenu = () => setIsOpen(false);

    // Função para toggle do menu
    const toggleMenu = () => setIsOpen(prev => !prev);

    // Fechar menu ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                triggerRef.current && !triggerRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen]);

    // Função para lidar com clique em item do menu
    const handleMenuItemClick = (callback) => {
        closeMenu();
        if (callback) callback();
    };

    // Função para lidar com navegação por teclado
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    };

    // Função para lidar com navegação por teclado nos itens do menu
    const handleMenuItemKeyDown = (event, callback) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleMenuItemClick(callback);
        }
    };

    const displayName = user?.firstName && user?.lastName 
        ? `${user.firstName} ${user.lastName}`
        : user?.name || 'Usuário';

    // Determinar configuração do UserAvatar baseado no showUserName
    const avatarDisplay = showUserName ? 'photo-with-name' : 'photo-only';
    
    // Mapear size do UserMenu para size do UserAvatar
    const avatarSizeMap = {
        small: 'small',
        medium: 'small', // UserAvatar small para medium do menu para manter proporção
        large: 'medium',
    };

    return (
        <div className={twMerge(clsx('relative', className))} {...rest}>
            {/* Trigger - UserAvatar + Chevron */}
            <button
                ref={triggerRef}
                onClick={toggleMenu}
                onKeyDown={handleKeyDown}
                className={userMenuStyles({ size, appearance })}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-label={`Menu de opções para ${displayName}`}
                data-testid="user-menu-trigger"
            >
                <UserAvatar 
                    user={user}
                    size={avatarSizeMap[size]}
                    appearance={appearance}
                    display={avatarDisplay}
                    frame={true} // Sempre passa frame como true
                />
                
                <svg 
                    className={userMenuChevronStyles({ size, isOpen, appearance })}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                    />
                </svg>
            </button>

            {/* Menu Dropdown com animação */}
            <div 
                ref={menuRef}
                className={userMenuDropdownStyles({ size, appearance, isOpen })}
                role="menu"
                aria-label="Menu de opções do usuário"
                data-testid="user-menu-dropdown"
            >
                <div 
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleMenuItemClick(onProfile)}
                    onKeyDown={(e) => handleMenuItemKeyDown(e, onProfile)}
                    className={userMenuItemStyles({ size, appearance })}
                    data-testid="menu-item-profile"
                >
                    <svg className={userMenuIconStyles({ size, appearance })} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Acessar perfil
                </div>

                <div 
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleMenuItemClick(onDonations)}
                    onKeyDown={(e) => handleMenuItemKeyDown(e, onDonations)}
                    className={userMenuItemStyles({ size, appearance })}
                    data-testid="menu-item-donations"
                >
                    <svg className={userMenuIconStyles({ size, appearance })} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Minhas doações
                </div>

                <div 
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleMenuItemClick(handleLogout)}
                    onKeyDown={(e) => handleMenuItemKeyDown(e, handleLogout)}
                    className={userMenuItemStyles({ size, appearance })}
                    data-testid="menu-item-logout"
                >
                    <svg className={userMenuIconStyles({ size, appearance })} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sair
                </div>

                {user?.isAdmin && (
                    <div 
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => handleMenuItemClick(onAdmin)}
                        onKeyDown={(e) => handleMenuItemKeyDown(e, onAdmin)}
                        className={userMenuItemStyles({ size, appearance })}
                        data-testid="menu-item-admin"
                    >
                        <svg className={userMenuIconStyles({ size, appearance })} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Menu administrativo
                    </div>
                )}
            </div>
        </div>
    );
}

UserMenu.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
        isAdmin: PropTypes.bool,
    }).isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    appearance: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    showUserName: PropTypes.bool,
    onProfile: PropTypes.func,
    onDonations: PropTypes.func,
    onLogout: PropTypes.func,
    onAdmin: PropTypes.func,
    className: PropTypes.string,
};
