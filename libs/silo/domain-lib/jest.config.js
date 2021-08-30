module.exports = {
  displayName: 'silo-domain-lib',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['../../../test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/silo/domain-lib',
};
