const path = require('path')
const fs = require('fs')

const file = path.resolve('../eslint/lib/shared/relative-module-resolver.js')

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

            console.log('eslint successfully patched for global support')
        })
    })
}