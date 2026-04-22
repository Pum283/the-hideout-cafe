import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const inputPath = path.resolve('src/assets/reference-menu.png')
const outputDir = path.resolve('src/assets/salad')

const crops = [
  { id: 'veggie-delight', x: 36, y: 108, w: 260, h: 180 },
  { id: 'salmon', x: 360, y: 108, w: 260, h: 180 },
  { id: 'chicken', x: 36, y: 360, w: 260, h: 180 },
  { id: 'shrimp', x: 360, y: 360, w: 260, h: 180 },
  { id: 'bacon', x: 36, y: 608, w: 260, h: 180 },
  { id: 'tuna', x: 360, y: 608, w: 260, h: 180 },
]

if (!fs.existsSync(inputPath)) {
  throw new Error(`Missing input: ${inputPath}`)
}

fs.mkdirSync(outputDir, { recursive: true })

const image = sharp(inputPath)
const meta = await image.metadata()

if (!meta.width || !meta.height) {
  throw new Error('Cannot read image metadata')
}

for (const c of crops) {
  const outPath = path.join(outputDir, `${c.id}.png`)

  await sharp(inputPath)
    .extract({ left: c.x, top: c.y, width: c.w, height: c.h })
    .resize({ width: 720 })
    .png({ compressionLevel: 9 })
    .toFile(outPath)

  // eslint-disable-next-line no-console
  console.log(`✅ ${path.relative(process.cwd(), outPath)}`)
}

