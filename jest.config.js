module.exports = {
  transform: {
    '\\.jsx?$': 'babel-jest'
  },
  testMatch: ['**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/'],
  cacheDirectory: '.cache/jest'
};
