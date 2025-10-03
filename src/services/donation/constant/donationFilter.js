/**
 * Opções de filtro para o tipo de doações.
 * Value representa os tipos de donation.type
 */
export const DONATION_TYPE_OPTIONS = [
    { id: 1, value: 'D', name: 'Quem doa' },
    { id: 2, value: 'P', name: 'Quem precisa' }
  ];

/**
 * Opções de filtro para o tipo de acesso das doações.
 * Value representa o campo donation.is_public
 */
export  const ACCESS_TYPE_OPTIONS = [
    { id: 1, value: true, name: 'Públicas' },
    { id: 2, value: false, name: 'Privadas' }
  ];

  /**
   * Opções de filtro para a distância das doações.
   * Value representa a distância máxima em km.
   * -1 representa qualquer distância.
   */
export  const DISTANCE_OPTIONS = [
    { id: 1, value: -1, name: 'Qualquer distância' },
    { id: 2, value: 2, name: 'Até 2km' },
    { id: 3, value: 5, name: 'Até 5km' },
    { id: 4, value: 10, name: 'Até 10km' },
    { id: 5, value: 50, name: 'Até 50km' }
];
