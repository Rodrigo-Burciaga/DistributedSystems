const {ncp, series} = require("nps-utils");

module.exports = {
    scripts: {
        build: {
            default: {
                script: series(`nps build.dev`)
            },
            dev: {
                script: series(
                    'nps lint',
                    'nps clean',
                    'nps compile',
                    'nps copy'
                )
            },
            prod: {
                script: series(
                    'nps lint',
                    'nps clean',
                    'nps compile',
                    'nps copy.modules',
                    'nps copy.keys'
                )
            }
        },

        clean: {
            default: {
                script: series(`nps clean.dist`)
            },
            dist: {
                script: `./node_modules/.bin/trash './dist'`
            }
        },

        compile: {
            script: `./node_modules/.bin/tsc`
        },

        copy: {
            default: {
                script: series(
                    `nps copy.env`,
                    `nps copy.modules`,
                    `nps copy.keys`
                )
            },
            env: {
                script: copy('./.env', './dist')
            },
            modules: {
                script: ncp(`./node_modules ./dist/node_modules`)
            },
            keys: {
                script: ncp(`./src/public ./dist/src/public`)
            }
        },
        copy: {
            default: {
                script: series(
                    `nps copy.env`,
                    `nps copy.modules`,
                    `nps copy.keys`
                )
            },
            env: {
                script: copy('./.env', './dist')
            },
            modules: {
                script: ncp(`./node_modules ./dist/node_modules`)
            },
            keys: {
                script: ncp(`./src/public ./dist/src/public`)
            }
        },

        lint: {
            script: `./node_modules/.bin/tslint -c ./tslint.json -p tsconfig.json 'src/**/*.ts' --format stylish`
        },
        test: {
            default: {
                script: series(
                    `nps test.unit`,
                    `nps test.integration`
                )
            },
            unit: {
                script: 'jest --testPathPattern=unit'
            },
            integration: {
                script: 'echo "Comming soon"'
            }
        },
        db: {
            seed: {
                script: runFast('./commands/seed.ts')
            }
        },
        default: 'nodemon --watch \'src/**/*.ts\' --exec \'ts-node\' -r dotenv/config src/index.ts'
    }
};

function copy(source, target) {
    return `./node_modules/.bin/copyfiles ${source} ${target}`
}

function runFast(path) {
    return `ts-node --transpileOnly ${path}`;
}
