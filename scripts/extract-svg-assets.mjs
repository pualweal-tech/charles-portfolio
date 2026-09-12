import { createReadStream, mkdirSync, writeFileSync } from 'fs'
import { createInterface } from 'readline'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svgPath = join(root, '界面', '平面设计.svg')
const outDir = join(root, 'public', 'works')

mkdirSync(outDir, { recursive: true })

const stream = createReadStream(svgPath, { encoding: 'utf8' })
const rl = createInterface({ input: stream, crlfDelay: Infinity })

let lineNum = 0
let imageCount = 0
const imageMeta = []
const texts = []

function collectText(line) {
  const re = />([^<]{1,120})</g
  let match
  while ((match = re.exec(line))) {
    const t = match[1].trim()
    if (t && !t.startsWith('data:') && texts.length < 200) {
      texts.push(t)
    }
  }
}

for await (const line of rl) {
  lineNum++
  collectText(line)

  if (!line.includes('<image') && !line.includes('data:image')) continue

  const hrefMatch = line.match(/(?:xlink:href|href)="(data:image\/[^"]+)"/)
  const w = (line.match(/\swidth="([^"]+)"/) || [])[1]
  const h = (line.match(/\sheight="([^"]+)"/) || [])[1]
  const x = (line.match(/\sx="([^"]+)"/) || [])[1]
  const y = (line.match(/\sy="([^"]+)"/) || [])[1]
  const mime = hrefMatch?.[1]?.match(/^data:(image\/[^;]+)/)?.[1] ?? ''

  imageCount++
  const size = hrefMatch?.[1]?.length ?? line.length
  imageMeta.push({ i: imageCount, line: lineNum, x, y, w, h, mime, size })

  if (hrefMatch) {
    const dataUrl = hrefMatch[1]
    const comma = dataUrl.indexOf(',')
    const header = dataUrl.slice(0, comma)
    const payload = dataUrl.slice(comma + 1)
    const ext = header.includes('png') ? 'png' : header.includes('jpeg') || header.includes('jpg') ? 'jpg' : header.includes('webp') ? 'webp' : 'bin'
    const buf = Buffer.from(payload, header.includes('base64') ? 'base64' : 'utf8')
    const name = `asset-${String(imageCount).padStart(3, '0')}.${ext}`
    writeFileSync(join(outDir, name), buf)
    imageMeta[imageMeta.length - 1].file = name
    imageMeta[imageMeta.length - 1].bytes = buf.length
  }
}

writeFileSync(join(outDir, 'manifest.json'), JSON.stringify({ lineNum, imageCount, imageMeta, texts }, null, 2))
console.log(JSON.stringify({ lineNum, imageCount, files: imageMeta.map((m) => m.file).filter(Boolean), texts: texts.slice(0, 80) }, null, 2))
