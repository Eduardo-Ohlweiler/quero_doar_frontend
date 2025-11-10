// src/components/TeamMemberCard/TeamMemberCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { getTeamMemberCardStyles } from './TeamMemberCard.styles';
// 1. IMPORTE O NOVO ÍCONE DO LINKEDIN
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'; 

// 2. ADICIONE A NOVA PROP 'linkedinUrl'
export default function TeamMemberCard({ imageUrl, name, role, altText, githubUrl, linkedinUrl }) {
  const styles = getTeamMemberCardStyles();

  return (
    <div className={styles.card}>
      <img 
        className={styles.image}
        src={imageUrl}
        alt={altText || `Foto de ${name}`}
      />
      <h3 className={styles.name}>
        {name}
      </h3>
      <p className={styles.role}>{role}</p>

      {/* 3. RENDERIZAÇÃO CONDICIONAL DOS ÍCONES */}
      {/* O Wrapper só aparece se pelo menos UM link existir */}
      {(githubUrl || linkedinUrl) && (
        <div className={styles.iconWrapper}>
          
          {/* Link do GitHub (só aparece se existir) */}
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.githubIcon}
              aria-label={`${name}'s GitHub Profile`}
            >
              <FaGithub className="w-6 h-6" />
            </a>
          )}

          {/* Link do LinkedIn (só aparece se existir) */}
          {linkedinUrl && (
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.linkedinIcon}
              aria-label={`${name}'s LinkedIn Profile`}
            >
              <FaLinkedinIn className="w-6 h-6" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// 4. ADICIONE A NOVA PROP NOS PROPTYPES
TeamMemberCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  altText: PropTypes.string,
  githubUrl: PropTypes.string, 
  linkedinUrl: PropTypes.string, // <-- Adicionado
};