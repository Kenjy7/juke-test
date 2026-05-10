// scripts/fix-lang.mjs
import { replaceInFileSync } from 'replace-in-file'

const results = replaceInFileSync({
    files: 'dist/**/*.html',
    from: /<html\s+lang="en"/g,
    to: '<html lang="nl"',
})

console.log(`✅ Updated lang attribute in ${results.length} file(s)`)
