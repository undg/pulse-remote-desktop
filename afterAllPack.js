/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

exports.default = async function afterAllArtifactBuild(buildResult) {
  copyAppImage(buildResult)
}

function copyAppImage(buildResult) {
  const { artifactPaths, configuration } = buildResult
  
  // Find the AppImage artifact
  const appImagePath = artifactPaths.find(p => p.endsWith('.AppImage'))
  
  if (!appImagePath) {
    console.log('No AppImage found, skipping copy')
    return
  }
  
  const outDir = path.dirname(appImagePath)
  const name = configuration.productName
  const destFilePath = path.join(outDir, name)
  
  console.log(`Copying ${appImagePath} to ${destFilePath}`)
  fs.copyFileSync(appImagePath, destFilePath)
  console.log(`Successfully copied AppImage to ${name}`)
}
