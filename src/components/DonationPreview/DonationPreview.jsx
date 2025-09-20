import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaLock, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { 
    donationPreviewStyles, 
    donationPreviewImageStyles,
    donationPreviewContentStyles,
    donationPreviewHeaderStyles,
    donationPreviewTitleStyles,
    donationPreviewDescriptionStyles,
    donationPreviewUserSectionStyles,
    donationPreviewBadgeStyles
} from './DonationPreview.styles';
import UserAvatar from '../UserAvatar/UserAvatar';
import Button from '../Button/Button';
import { formatTimeAgo } from '../../services/util/dateUtil';

export default function DonationPreview({
    donation,
    layout = 'vertical', // 'vertical' | 'horizontal'
    isPublic = true,
    isDonation = true, // true para doação, false para solicitação
    onClick,
    onActionClick,
    className,
    ...rest
}) {
    const {
        id,
        title = 'Título da doação',
        description = 'Descrição da doação',
        image,
        city = 'Cidade',
        createdAt,
        user = {
            firstName: 'Usuário',
            lastName: '',
            level: 1
        }
    } = donation || {};

    // Configuração do botão principal baseado no tipo e modo
    const getActionButtonConfig = () => {
        if (!isPublic) {
            return {
                text: 'Contatar',
                appearance: 'primary',
                icon: null
            };
        }
        
        if (isDonation) {
            return {
                text: 'Quero',
                appearance: 'primary',
                icon: null
            };
        } else {
            return {
                text: 'Doar',
                appearance: 'primary',
                icon: null
            };
        }
    };

    const actionConfig = getActionButtonConfig();
    
    // Configuração do badge de tipo
    const getBadgeConfig = () => {
        return {
            text: isDonation ? 'Doação' : 'Solicitação',
            variant: isDonation ? 'donation' : 'request'
        };
    };

    const badgeConfig = getBadgeConfig();

    const handleCardClick = (e) => {
        // Previne propagação se o clique foi no botão de ação
        if (e.target.closest('[data-action-button]')) {
            return;
        }
        onClick?.(donation);
    };

    const handleActionClick = (e) => {
        e.stopPropagation();
        onActionClick?.(donation, actionConfig.text.toLowerCase());
    };

    return (
        <div
            className={twMerge(clsx(
                donationPreviewStyles({ layout }),
                className
            ))}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(e);
                }
            }}
            aria-label={`${badgeConfig.text}: ${title} por ${user.firstName} ${user.lastName}`.trim()}
            {...rest}
        >
            {/* Badge de tipo (Doação/Solicitação) */}
            <div className={donationPreviewBadgeStyles({ variant: badgeConfig.variant })}>
                {badgeConfig.text}
            </div>

            {/* Ícone de privado */}
            {!isPublic && (
                <div className="absolute top-3 right-3 z-20">
                    <FaLock className="text-white text-sm bg-black/50 rounded-full p-1 w-6 h-6" />
                </div>
            )}

            {/* Imagem */}
            <div className={donationPreviewImageStyles({ layout })}>
                <img
                    //TODO: Quando em produção deve incluir fallback
                    // src={image || '/placeholder-donation.jpg'}
                    src={image}
                    alt={`Imagem de ${title}`}
                    className="w-full h-full object-cover"
                    // onError={(e) => {
                    //     e.target.src = '/placeholder-donation.jpg';
                    // }}
                />
            </div>

            {/* Conteúdo */}
            <div className={donationPreviewContentStyles({ layout })}>
                {/* Header com título */}
                <div className={donationPreviewHeaderStyles({ layout })}>
                    <h3 className={donationPreviewTitleStyles({ layout })}>
                        {title}
                    </h3>
                </div>

                {/* Descrição */}
                <p className={donationPreviewDescriptionStyles({ layout })}>
                    {description}
                </p>


                {layout === 'vertical' ? (
                    <>
                        <div className="flex flex-row justify-between">
                            <div className="flex items-center gap-1 text-gray-600 text-xs">
                                <FaMapMarkerAlt className="w-3 h-3" />
                                <span>{city}</span>
                            </div>
                            {createdAt && (
                                <div className="flex items-center gap-1 text-gray-500 text-xs">
                                    <FaClock className="w-3 h-3" />
                                    <span>{formatTimeAgo(createdAt)}</span>
                                </div>
                            )}
                        </div>
                        <div className={donationPreviewUserSectionStyles({ layout })}>
                            <UserAvatar
                                user={user}
                                appearance="secondary"
                                size="small"
                                display="photo-with-name"
                                showLevel={false}
                                frame={true}
                                className="flex-1"
                            />
                            <Button
                                    appearance={actionConfig.appearance}
                                    size="small"
                                    onClick={handleActionClick}
                                    className="shrink-0"
                                >
                                    {actionConfig.text}
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className={donationPreviewUserSectionStyles({ layout })}>
                        <UserAvatar
                            user={user}
                            appearance="secondary"
                            size="small"
                            display="photo-with-name"
                            showLevel={false}
                            frame={true}
                        />
                        <div className="flex items-center gap-1 text-gray-600 text-xs">
                            <FaMapMarkerAlt className="w-3 h-3" />
                            <span>{city}</span>
                        </div>
                        {createdAt && (
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                                <FaClock className="w-3 h-3" />
                                <span>{formatTimeAgo(createdAt)}</span>
                            </div>
                        )}
                        <Button
                                appearance={actionConfig.appearance}
                                size="small"
                                onClick={handleActionClick}
                                className="shrink-0"
                            >
                                {actionConfig.text}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

DonationPreview.propTypes = {
    donation: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        city: PropTypes.string,
        createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        user: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            avatar: PropTypes.string,
            level: PropTypes.number
        })
    }),
    layout: PropTypes.oneOf(['vertical', 'horizontal']),
    isPublic: PropTypes.bool,
    isDonation: PropTypes.bool,
    onClick: PropTypes.func,
    onActionClick: PropTypes.func,
    className: PropTypes.string
};
