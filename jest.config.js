module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|@tanstack/react-query|react-native-reanimated|react-native-linear-gradient)/)',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
