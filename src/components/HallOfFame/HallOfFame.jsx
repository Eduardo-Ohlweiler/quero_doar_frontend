import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaTrophy } from 'react-icons/fa';
import TopExperienceUser from '../TopExperienceUser/TopExperienceUser';
import Skeleton from '../Skeleton/Skeleton';
import {
  hallOfFameStyles,
  hallOfFameHeaderStyles,
  hallOfFameTitleStyles,
  hallOfFameSubtitleStyles,
  hallOfFamePodiumStyles,
  hallOfFameFirstPlaceStyles,
  hallOfFameSecondPlaceStyles,
  hallOfFameThirdPlaceStyles
} from './HallOfFame.styles';

export default function HallOfFame({
  topUsers = [],
  isLoading = false,
  onUserClick,
  className,
  ...rest
}) {
  // Garante que temos exatamente 3 usuários, preenchendo com null se necessário
  const [firstPlace, secondPlace, thirdPlace] = [
    topUsers[0] || null,
    topUsers[1] || null,
    topUsers[2] || null
  ];

  const handleUserClick = (user) => {
    if (onUserClick && user) {
      onUserClick(user);
    }
  };

  // Componente Skeleton para o TopExperienceUser
  const TopExperienceUserSkeleton = ({ rank }) => {
    const variant = rank === 1 ? 'first' : rank === 2 ? 'second' : 'third';
    
    return (
      <div className="relative cursor-default">
        {/* Rank Badge Skeleton */}
        <div className="absolute top-0 left-1/6 transform -translate-x-1/2 -translate-y-1/2 z-5">
          <Skeleton variant="circular" width="12" height="12" />
        </div>

        {/* Card Content Skeleton */}
        <div className={`bg-white rounded-2xl border shadow-sm p-6 pt-8 ${
          variant === 'first' ? 'border-yellow-300 shadow-yellow-100' :
          variant === 'second' ? 'border-gray-300 shadow-gray-100' :
          'border-amber-600 shadow-amber-100'
        }`}>
          {/* Avatar Skeleton */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Skeleton variant="circular" width="24" height="24" />
              {/* Level badge skeleton */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <Skeleton width="12" height="6" rounded="full" />
              </div>
            </div>
          </div>

          {/* User Info Skeleton */}
          <div className="text-center space-y-2 mb-4">
            <Skeleton variant="text" width="32" height="5" className="mx-auto" />
            <Skeleton variant="text" width="24" height="3" className="mx-auto" />
          </div>

          {/* Stats Skeleton */}
          <div className="flex justify-center space-x-6">
            <div className="text-center space-y-1">
              <Skeleton variant="text" width="8" height="6" className="mx-auto" />
              <Skeleton variant="text" width="16" height="3" className="mx-auto" />
            </div>
            <div className="text-center space-y-1">
              <Skeleton variant="text" width="8" height="6" className="mx-auto" />
              <Skeleton variant="text" width="16" height="3" className="mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className={twMerge(clsx(
        hallOfFameStyles(),
        className
      ))}
      {...rest}
    >
      {/* Header */}
      <div className={hallOfFameHeaderStyles()}>
        <span className={hallOfFameTitleStyles()}>
            🏆 Hall da Fama - Doadores do Mês
        </span>
        {/* <div className={hallOfFameTitleStyles()}>
          
        </div> */}
        <p className={hallOfFameSubtitleStyles()}>
          Conheça os heróis que mais ajudaram nossa comunidade este mês
        </p>
      </div>

      {/* Podium */}
      <div className={hallOfFamePodiumStyles()}>
        {/* Segundo Lugar */}
        <div className={hallOfFameSecondPlaceStyles()}>
          {isLoading ? (
            <TopExperienceUserSkeleton rank={2} />
          ) : (
            secondPlace && (
              <TopExperienceUser
                user={secondPlace}
                rank={2}
                onClick={handleUserClick}
              />
            )
          )}
        </div>

        {/* Primeiro Lugar */}
        <div className={hallOfFameFirstPlaceStyles()}>
          {isLoading ? (
            <TopExperienceUserSkeleton rank={1} />
          ) : (
            firstPlace && (
              <TopExperienceUser
                user={firstPlace}
                rank={1}
                onClick={handleUserClick}
              />
            )
          )}
        </div>

        {/* Terceiro Lugar */}
        <div className={hallOfFameThirdPlaceStyles()}>
          {isLoading ? (
            <TopExperienceUserSkeleton rank={3} />
          ) : (
            thirdPlace && (
              <TopExperienceUser
                user={thirdPlace}
                rank={3}
                onClick={handleUserClick}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}

HallOfFame.propTypes = {
  topUsers: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string,
      level: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
      donationMonth: PropTypes.number.isRequired,
      expMonth: PropTypes.number.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  onUserClick: PropTypes.func,
  className: PropTypes.string,
};
