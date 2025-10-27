
export const getTeamMemberCardStyles = () => ({
  card: "bg-white rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105",
  image: "w-32 h-32 rounded-full mx-auto object-cover",
  name: "mt-5 text-xl font-semibold text-gray-900",
  role: "text-blue-600 font-medium",
  iconWrapper: "mt-4 flex justify-center items-center gap-x-4", // 'gap-x-4' dá espaço entre os ícones
  githubIcon: "inline-block text-gray-500 hover:text-gray-900 transition-colors duration-200",
  linkedinIcon: "inline-block text-gray-500 hover:text-blue-700 transition-colors duration-200" // Cor do hover do LinkedIn
});