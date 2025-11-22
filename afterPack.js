/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

exports.default = async function afterPack(context) {
  removeLocale(context)
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
