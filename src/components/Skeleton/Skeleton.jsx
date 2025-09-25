import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { skeletonStyles } from './Skeleton.styles';

export default function Skeleton({
    variant = 'rectangular',
    width = 'full',
    height = '4',
    rounded = 'md',
    className,
    children,
    ...rest
}) {
    return (
        <div
            className={twMerge(clsx(
                skeletonStyles({ variant, width, height, rounded }),
                className
            ))}
            aria-hidden="true"
            role="presentation"
            {...rest}
        >
            {children}
        </div>
    );
}

Skeleton.propTypes = {
    variant: PropTypes.oneOf(['rectangular', 'circular', 'text']),
    width: PropTypes.oneOf(['full', 'auto', '16', '24', '32', '48', '64', '80', '96']),
    height: PropTypes.oneOf(['2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32']),
    rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'full']),
    className: PropTypes.string,
    children: PropTypes.node,
};