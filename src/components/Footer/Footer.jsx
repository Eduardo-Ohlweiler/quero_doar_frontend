import { footerStyles, footerContainerStyles, footerSectionStyles } from './Footer.styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

const Footer = ({ 
    variant = 'full', 
    appearance = 'gradient',
    className,
    ...rest 
}) => {
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const socialLinks = [
        { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
        { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
        { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
        { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    ];

    const institutionalLinks = [
        { name: 'Quem Somos', path: '/sobre' },
        { name: 'Termos de Uso', path: '/termos' },
        { name: 'Política de Privacidade', path: '/privacidade' },
        { name: 'Contato', path: '/contato' },
    ];

    const donorLinks = [
        { name: 'Como Doar', path: '/como-doar' },
        { name: 'Dicas de Doação', path: '/dicas' },
        { name: 'Sistema de Pontos', path: '/pontos' },
        { name: 'Hall da Fama', path: '/hall-da-fama' },
    ];

    const renderMinimalFooter = () => (
        <div className={twMerge(clsx(footerContainerStyles({ variant, appearance })))}>
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <Logo 
                        variant="full" 
                        size="md" 
                        color={appearance === 'white' ? 'primary' : 'white'} 
                    />
                    <p className="text-sm text-center">
                        © 2025 Quero Doar. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    );

    const renderFullFooter = () => (
        <div className={twMerge(clsx(footerContainerStyles({ variant, appearance })))}>
            <div className="container mx-auto px-4 py-4">
                {/* Main content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Logo and description */}
                    <div className={twMerge(clsx(footerSectionStyles()))}>
                        <Logo 
                            variant="full" 
                            size="lg" 
                            color={appearance === 'white' ? 'primary' : 'white'} 
                            className="mb-4"
                        />
                        <p className="text-sm leading-relaxed">
                            Conectando pessoas através da solidariedade. Transforme vidas com um simples gesto de doação.
                        </p>
                    </div>

                    {/* Sobre section */}
                    <div className={twMerge(clsx(footerSectionStyles()))}>
                        <h3 className="font-semibold text-lg mb-4">Sobre</h3>
                        <ul className="space-y-2">
                            {institutionalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:underline transition-all duration-200 hover:opacity-80"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Doadores section */}
                    <div className={twMerge(clsx(footerSectionStyles()))}>
                        <h3 className="font-semibold text-lg mb-4">Doadores</h3>
                        <ul className="space-y-2">
                            {donorLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:underline transition-all duration-200 hover:opacity-80"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Conecte-se section */}
                    <div className={twMerge(clsx(footerSectionStyles()))}>
                        <h3 className="font-semibold text-lg mb-4">Conecte-se</h3>
                        <div className="flex justify-between mb-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all duration-200 text-xl"
                                    aria-label={`Visite nosso ${social.name}`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        
                        {/* Back to top button */}
                        <Button
                            appearance="ghost"
                            size="small"
                            onClick={scrollToTop}
                            className="mt-4"
                            aria-label="Voltar ao topo da página"
                        >
                            ↑ Voltar ao topo
                        </Button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 pt-6">
                    <p className="text-sm text-center">
                        © 2025 Quero Doar. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <footer
            className={twMerge(clsx(footerStyles({ variant, appearance }), className))}
            role="contentinfo"
            {...rest}
        >
            {variant === 'minimal' ? renderMinimalFooter() : renderFullFooter()}
        </footer>
    );
};

Footer.propTypes = {
    variant: PropTypes.oneOf(['full', 'minimal']),
    appearance: PropTypes.oneOf(['gradient', 'white', 'ghost']),
    className: PropTypes.string,
};

export default Footer;