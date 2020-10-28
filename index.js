const path = require('path')
const fs = require('fs')

const f1 = path.resolve(__dirname, '../eslint/lib/shared/relative-module-resolver.js')
const f2 = path.resolve(__dirname, '../@eslint/eslintrc/lib/shared/relative-module-resolver.js')

function doPatch(file) {
    if (fs.existsSync(file)) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) return console.log(err)

            if (data.includes('eslint-global-patch-applied')) return

            const result = data.replace(/resolve\(moduleName, relativeToPath\) {[\s\S]*?catch/g, `resolve(moduleName, relativeToPath) {
// eslint-global-patch-applied
try {
    return createRequire(relativeToPath).resolve(moduleName);
} catch (error) {} // eslint-disable-line

try {
    return createRequire(__dirname).resolve(moduleName);
} catch`)
            fs.writeFile(file, result, 'utf8', function (err) {
                if (err) return console.log(err)
            })
        })
    }
}

doPatch(f1)
doPatch(f2)
