module.exports = {
    testEnvironment: 'node',
    verbose: true,
    coverageReporters: ['html', 'text', 'cobertura'],
    testMatch: ['**/__tests__/**/*.?(m)js?(x)', '**/?(*.)(spec|test).?(m)js?(x)'],
    moduleFileExtensions: ['js', 'mjs'],
    extensionsToTreatAsEsm: [],
    transform: {
        '^.+\\.mjs$': ['babel-jest', { 
            presets: [['@babel/preset-env', { targets: { node: 'current' }, modules: false }]],
            envName: 'test'
        }],
        '^.+\\.js$': ['babel-jest', { presets: [['@babel/preset-env', { targets: { node: 'current' } }]], envName: 'test' }]
    },
    transformIgnorePatterns: ['node_modules/(?!(chalk)/)'],
    fakeTimers: { enableGlobally: false }
};
