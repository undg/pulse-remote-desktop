const fs = require('fs')
const path = require('path')

exports.default = async function afterPack(context) {
  removeLocale(context)
  copyAppImage(context)
}

function copyAppImage(context) {
  const outDir = context.outDir
  const name = context.packager.appInfo.name
  const version = context.packager.appInfo.version
  const ext = 'AppImage'

  const srcFilePath = path.join(outDir, `${name}-${version}.${ext}`)
  const destFilePath = path.join(outDir, name)

  fs.copyFileSync(srcFilePath, destFilePath)
}

function removeLocale(context) {
  const localesPath = path.join(context.appOutDir, 'locales')

  if (!fs.existsSync(localesPath)) {
    return
  }

  // Keep only en-US locale, remove all others to reduce size
  const locales = fs.readdirSync(localesPath)
  const keepLocales = ['en-US.pak']

  locales.forEach((locale) => {
    if (!keepLocales.includes(locale)) {
      const localePath = path.join(localesPath, locale)
      try {
        fs.unlinkSync(localePath)
        console.log(`Removed locale: ${locale}`)
      } catch (err) {
        console.warn(`Failed to remove ${locale}:`, err.message)
      }
    }
  })

  console.log('Locale optimization complete. Kept:', keepLocales.join(', '))
}
