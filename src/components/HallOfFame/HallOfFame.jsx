import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaTrophy } from 'react-icons/fa';
import TopExperienceUser from '../TopExperienceUser/TopExperienceUser';
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
        {secondPlace && (
          <div className={hallOfFameSecondPlaceStyles()}>
            <TopExperienceUser
              user={secondPlace}
              rank={2}
              onClick={handleUserClick}
            />
          </div>
        )}

        {/* Primeiro Lugar */}
        {firstPlace && (
          <div className={hallOfFameFirstPlaceStyles()}>
            <TopExperienceUser
              user={firstPlace}
              rank={1}
              onClick={handleUserClick}
            />
          </div>
        )}

        {/* Terceiro Lugar */}
        {thirdPlace && (
          <div className={hallOfFameThirdPlaceStyles()}>
            <TopExperienceUser
              user={thirdPlace}
              rank={3}
              onClick={handleUserClick}
            />
          </div>
        )}
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
  onUserClick: PropTypes.func,
  className: PropTypes.string,
};
