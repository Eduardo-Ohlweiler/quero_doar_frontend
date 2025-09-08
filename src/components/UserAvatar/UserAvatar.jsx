import PropTypes from 'prop-types';
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
    // Definir nome para exibição
    const displayName = user?.firstName && user?.lastName 
        ? `${user.firstName} ${user.lastName}`
        : user?.name || 'Usuário';

    // Definir iniciais do avatar
    const avatarInitials = user?.firstName && user?.lastName 
        ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
        : displayName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);

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
                {user?.avatar ? (
                    <img 
                        src={user.avatar} 
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
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
        level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    appearance: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    frame: PropTypes.bool,
    display: PropTypes.oneOf(['photo-only', 'photo-with-name', 'name-only']),
    showLevel: PropTypes.bool,
    className: PropTypes.string,
};