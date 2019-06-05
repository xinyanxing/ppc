const { resolve } = require('path');

module.exports = {
    verbose: true,
    bail: true,
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pdf|txt)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|sass)$': 'identity-obj-proxy',
        '^src(.*)$': `${resolve('./src')}$1`,
        '^model(.*)$': `${resolve('./src/model')}$1`,
        '^view(.*)$': `${resolve('./src/view')}$1`,
        '^component(.*)$': `${resolve('./src/component')}$1`,
        '^router(.*)$': `${resolve('./src/router')}$1`,
        '^assets(.*)$': `${resolve('./public/assets')}$1`,
        '^utils(.*)$': `${resolve('./src/utils')}$1`
    },
    transform: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileTransform.js',
        '^.+\\.jsx?$': 'babel-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleFileExtensions: ['js', 'jsx'],
    setupTestFrameworkScriptFile: 'jest-enzyme',
    testEnvironment: 'enzyme',
    testEnvironmentOptions: {
        enzymeAdapter: 'react16'
    }
};
