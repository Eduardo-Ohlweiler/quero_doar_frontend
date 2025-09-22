import PropTypes from 'prop-types';
import {extractFirstAndLastName, getInitials} from '../../services/util/stringUtil';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
    userAvatarStyles, 
    userAvatarImageStyles, 
    userAvatarInitialsStyles, 
    userAvatarLevelStyles,
    userAvatarNameStyles,
    userAvatarContainerStyles
} from './UserAvatar.styles';

export default function UserAvatar({ 
    user,
    size = 'medium',
    appearance = 'primary',
    frame = false,
    display = 'photo-only',
    showLevel = false,
    className,
    ...rest 
}) {
    const {firstName, lastName} = extractFirstAndLastName(user?.name || '');
    const displayName = firstName && lastName ? `${firstName} ${lastName}` : (user?.name || 'Usuário');
    const avatarInitials = getInitials(user?.name || '');

    // Renderizar apenas o nome (sem foto)
    if (display === 'name-only') {
        return (
            <div className={twMerge(clsx(userAvatarContainerStyles({ display }), className))} {...rest}>
                <span className={userAvatarNameStyles({ size, appearance })}>
                    {displayName}
                </span>
            </div>
        );
    }

    // Renderizar avatar com ou sem nome
    return (
        <div className={twMerge(clsx(userAvatarContainerStyles({ display }), className))} {...rest}>
            {/* Indicador de nível - sempre por cima da foto/frame */}
            {showLevel && user?.level !== undefined && (
                <div className={userAvatarLevelStyles({ size, appearance })}>
                    {user.level}
                </div>
            )}
            {/* Container do Avatar */}
            <div className={userAvatarStyles({ size, appearance, frame })}>
                {user?.photo ? (
                    <img 
                        src={user.photo} 
                        alt={`Avatar de ${displayName}`}
                        className={userAvatarImageStyles({ frame, hasLevel: showLevel && user?.level !== undefined })}
                    />
                ) : (
                    <span className={userAvatarInitialsStyles({ size, appearance })}>
                        {avatarInitials}
                    </span>
                )}
            </div>

            {/* Nome do usuário (se display for 'photo-with-name') */}
            {display === 'photo-with-name' && (
                <span className={userAvatarNameStyles({ size, appearance })}>
                    {displayName}
                </span>
            )}
        </div>
    );
}

UserAvatar.propTypes = {
    user: PropTypes.shape({
        userId: PropTypes.number,
        name: PropTypes.string,
        photo: PropTypes.string,
        level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    appearance: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    frame: PropTypes.bool,
    display: PropTypes.oneOf(['photo-only', 'photo-with-name', 'name-only']),
    showLevel: PropTypes.bool,
    className: PropTypes.string,
};