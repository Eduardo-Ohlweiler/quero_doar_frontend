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
import { buildLink, resolveSegmentsPathById } from '../../services/util/stringUtil';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const PHOTO_PATH = import.meta.env.VITE_GET_MEDIA_DONATION_ROUTE || '/media/donation';
const DEFAULT_PHOTO = import.meta.env.VITE_GET_MEDIA_DONATION_DEFAULT_PHOTO || 'default.webp';

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

    const resolveImagePath = () => {
        const donationPhoto = donation?.photo;
        if (donationPhoto === null || donationPhoto === undefined || donationPhoto === '') {
            return buildLink([BASE_API_URL, PHOTO_PATH, DEFAULT_PHOTO]);
        } else if (donationPhoto?.includes('http://') || donationPhoto?.includes('https://')) {
            return donationPhoto;
        } else {
            return buildLink([BASE_API_URL, PHOTO_PATH, resolveSegmentsPathById(donation?.donationId), donationPhoto]);
        }
    }

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
            aria-label={`${badgeConfig.text}: ${donation?.title ?? 'Título da doação'} por ${donation?.userMinimal?.name ?? 'Usuário'}`.trim()}
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
                    src={resolveImagePath()}
                    alt={`Imagem de ${donation?.title ?? 'Título da doação'}`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Conteúdo */}
            <div className={donationPreviewContentStyles({ layout })}>
                {/* Header com título */}
                <div className={donationPreviewHeaderStyles({ layout })}>
                    <h3 className={donationPreviewTitleStyles({ layout })}>
                        {donation?.title ?? 'Título da doação'}
                    </h3>
                </div>

                {/* Descrição */}
                <p className={donationPreviewDescriptionStyles({ layout })}>
                    {donation?.description ?? 'Descrição da doação'}
                </p>


                {layout === 'vertical' ? (
                    <>
                        <div className="flex flex-row justify-between">
                            <div className="flex items-center gap-1 text-gray-600 text-xs">
                                <FaMapMarkerAlt className="w-3 h-3" />
                                <span>{donation?.location ?? 'Cidade'}</span>
                            </div>
                            {donation?.date && (
                                <div className="flex items-center gap-1 text-gray-500 text-xs">
                                    <FaClock className="w-3 h-3" />
                                    <span>{formatTimeAgo(donation?.date)}</span>
                                </div>
                            )}
                        </div>
                        <div className={donationPreviewUserSectionStyles({ layout })}>
                            <UserAvatar
                                user={donation?.userMinimal ?? { userId: null, name: 'Usuário', photo: null }}
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
                            user={donation?.userMinimal ?? { userId: null, name: 'Usuário', photo: null }}
                            appearance="secondary"
                            size="small"
                            display="photo-with-name"
                            showLevel={false}
                            frame={true}
                        />
                        <div className="flex items-center gap-1 text-gray-600 text-xs">
                            <FaMapMarkerAlt className="w-3 h-3" />
                                <span>{donation?.location ?? 'Cidade'}</span>
                        </div>
                            {donation?.date && (
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                                <FaClock className="w-3 h-3" />
                                    <span>{formatTimeAgo(donation?.date)}</span>
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
        donationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        description: PropTypes.string,
        photo: PropTypes.string,
        location: PropTypes.string,
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        userMinimal: PropTypes.shape({
            userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string,
            photo: PropTypes.string,
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
