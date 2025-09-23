import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaMapMarkerAlt } from 'react-icons/fa';
import DonationPreview from '../DonationPreview/DonationPreview';
import Button from '../Button/Button';
import { 
    lastDonationPreviewContainerStyles,
    lastDonationPreviewHeaderStyles,
    lastDonationPreviewTitleStyles,
    lastDonationPreviewLocationStyles,
    lastDonationPreviewGridStyles,
    lastDonationPreviewButtonContainerStyles
} from './LastDonationPreview.styles';

export default function LastDonationPreview({
    data,
    itemsPerPage = 6,
    onDonationClick,
    onDonationActionClick,
    onLoadMore,
    className,
    ...rest
}) {
    const [currentPage, setCurrentPage] = useState(1);

    // Extract cityName and donations from data
    const { cityName = '', listDonationPreviewDto = [] } = data || {};

    // Check if location is available
    const hasLocation = Boolean(cityName && cityName.trim());

    // Calculate items to show based on current page
    const itemsToShow = useMemo(() => {
        return currentPage * itemsPerPage;
    }, [currentPage, itemsPerPage]);

    // Get visible donations
    const visibleDonations = useMemo(() => {
        return listDonationPreviewDto.slice(0, itemsToShow);
    }, [listDonationPreviewDto, itemsToShow]);

    // Check if there are more items to load
    const hasMoreItems = listDonationPreviewDto.length > itemsToShow;

    const handleLoadMore = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        
        // Call the onLoadMore callback with pagination info
        onLoadMore?.({
            page: newPage,
            itemsPerPage,
            totalItems: listDonationPreviewDto.length,
            newItemsToShow: newPage * itemsPerPage
        });
    };

    const handleDonationClick = (donation) => {
        // Find original donation data
        const originalDonation = listDonationPreviewDto.find(d => d.donationId === donation.id);
        onDonationClick?.(originalDonation);
    };

    const handleDonationActionClick = (donation, action) => {
        // Find original donation data
        const originalDonation = listDonationPreviewDto.find(d => d.donationId === donation.id);
        onDonationActionClick?.(originalDonation, action);
    };

    if (!data || !listDonationPreviewDto.length) {
        return null;
    }

    return (
        <div
            className={twMerge(clsx(
                lastDonationPreviewContainerStyles(),
                className
            ))}
            {...rest}
        >
            {/* Header */}
            <div className={lastDonationPreviewHeaderStyles()}>
                <h2 className={lastDonationPreviewTitleStyles()}>
                    {hasLocation ? '🔗 Doações Recentes na Sua Região' : '🔗 Doações Recentes'}
                </h2>
                {hasLocation && (
                    <div className={lastDonationPreviewLocationStyles()}>
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-600" />
                        <span>Baseado na sua localização: {cityName}</span>
                    </div>
                )}
            </div>

            {/* Donations Grid */}
            <div className={lastDonationPreviewGridStyles()}>
                {visibleDonations.map((donation) => (
                    <DonationPreview
                        key={donation.donationId}
                        donation={donation}
                        layout="vertical"
                        isPublic={donation.isPublic}
                        isDonation={donation.isDonation}
                        onClick={handleDonationClick}
                        onActionClick={handleDonationActionClick}
                    />
                ))}
            </div>

            {/* Load More Button */}
            {hasMoreItems && (
                <div className={lastDonationPreviewButtonContainerStyles()}>
                    <Button
                        appearance="secondary"
                        size="medium"
                        onClick={handleLoadMore}
                        className="px-8"
                    >
                        + Ver mais doações
                    </Button>
                </div>
            )}
        </div>
    );
}

LastDonationPreview.propTypes = {
    data: PropTypes.shape({
        cityName: PropTypes.string,
        listDonationPreviewDto: PropTypes.arrayOf(
            PropTypes.shape({
                donationId: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                photo: PropTypes.string,
                isDonation: PropTypes.bool.isRequired,
                isPublic: PropTypes.bool.isRequired,
                location: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                userMinimal: PropTypes.shape({
                    userId: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    photo: PropTypes.string
                }).isRequired,
                status: PropTypes.string.isRequired,
                distanceKm: PropTypes.number.isRequired
            })
        )
    }),
    itemsPerPage: PropTypes.number,
    onDonationClick: PropTypes.func,
    onDonationActionClick: PropTypes.func,
    onLoadMore: PropTypes.func,
    className: PropTypes.string
};
