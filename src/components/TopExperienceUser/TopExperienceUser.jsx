import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaMapMarkerAlt, FaCrown, FaMedal, FaAward } from 'react-icons/fa';
import UserAvatar from '../UserAvatar/UserAvatar';
import {
    topExperienceUserStyles,
    topExperienceUserCardStyles,
    topExperienceUserRankBadgeStyles,
    topExperienceUserContentStyles,
    topExperienceUserNameStyles,
    topExperienceUserLocationStyles,
    topExperienceUserStatsStyles,
    topExperienceUserStatValueStyles,
    topExperienceUserStatLabelStyles
} from './TopExperienceUser.styles';

// Função auxiliar para determinar a variante baseada no rank
const getVariantFromRank = (rank) => {
    if (!rank) return 'default';
    
    switch (rank) {
        case 1: return 'first';
        case 2: return 'second';
        case 3: return 'third';
        default: return 'default';
    }
};

// Função auxiliar para retornar o ícone baseado no rank
const getRankIcon = (rank) => {
    switch (rank) {
        case 1: return <FaCrown className="w-6 h-6" />;
        case 2: return <FaMedal className="w-6 h-6" />;
        case 3: return <FaAward className="w-6 h-6" />;
        default: return null;
    }
};

export default function TopExperienceUser({
    user,
    rank,
    onClick,
    className,
    ...rest
}) {
    // Determina a variante baseada no rank
    const variant = getVariantFromRank(rank);
    const hasRank = rank !== null && rank !== undefined;

    const handleClick = () => {
        if (onClick) {
            onClick(user);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace('.0', '') + 'k';
        }
        return num.toString();
    };

    return (
        <div
            className={twMerge(clsx(
                topExperienceUserStyles({ variant }),
                className
            ))}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
            aria-label={hasRank ? `${rank}º lugar - ${user?.name} de ${user?.location}` : `${user?.name} de ${user?.location}`}
            {...rest}
        >
            {/* Rank Badge - Only show if rank is provided */}
            {hasRank && (
                <div className={topExperienceUserRankBadgeStyles({ variant })}>
                    {getRankIcon(rank)}
                    <span className='text-sm'>
                        {rank}º
                    </span>
                </div>
            )}

            {/* Card Content */}
            <div className={twMerge(clsx(
                topExperienceUserCardStyles({ variant }),
                !hasRank && 'pt-6' // Less padding when no badge
            ))}>
                {/* User Avatar with Level */}
                <div className="flex justify-center">
                    <div className="relative">
                        <UserAvatar
                            user={{
                                userId: user?.userId,
                                name: user?.name,
                                photo: user?.photo,
                                level: 'nível ' + user?.level
                            }}
                            // size={variant === 'default' ? 'medium' : 'large'}
                            size="xlarge"
                            display="photo-only"
                            showLevel={true}
                            frame={true}
                            appearance="primary"
                        />
                    </div>
                </div>
                {/* <div className="relative flex justify-center mb-4"> */}
                

                {/* User Info */}
                <div className={topExperienceUserContentStyles({ variant })}>
                    <h3 className={topExperienceUserNameStyles({ variant })}>
                        {user?.name}
                    </h3>
                    
                    <div className={topExperienceUserLocationStyles({ variant })}>
                        <FaMapMarkerAlt className="w-3 h-3" />
                        <span>{user?.location}</span>
                    </div>

                    {/* Stats */}
                    <div className={topExperienceUserStatsStyles({ variant })}>
                        <div className="text-center">
                            <div className={topExperienceUserStatValueStyles({ variant })}>
                                {user?.donationMonth || 0}
                            </div>
                            <div className={topExperienceUserStatLabelStyles({ variant })}>
                                DOAÇÕES
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className={topExperienceUserStatValueStyles({ variant })}>
                                {formatNumber(user?.expMonth || 0)}
                            </div>
                            <div className={topExperienceUserStatLabelStyles({ variant })}>
                                PONTOS
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

TopExperienceUser.propTypes = {
    user: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        photo: PropTypes.string,
        level: PropTypes.number.isRequired,
        location: PropTypes.string.isRequired,
        donationMonth: PropTypes.number.isRequired,
        expMonth: PropTypes.number.isRequired,
    }).isRequired,
    rank: PropTypes.number, // Optional now
    onClick: PropTypes.func,
    className: PropTypes.string,
};
