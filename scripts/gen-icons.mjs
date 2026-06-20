// Gera o conjunto de favicons a partir do logo "L" (quadrado preto, L branco).
// Saídas: public/favicon-32.png, public/apple-touch-icon.png, public/favicon.ico
// Uso: node scripts/gen-icons.mjs
import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'

const crcTable = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
const crc32 = (buf) => {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

const chunk = (type, data) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crc])
}

// Desenha o "L" e devolve um PNG RGBA (Buffer).
function renderPng(size) {
  const x0 = Math.round(size * 0.34)
  const y0 = Math.round(size * 0.26)
  const y1 = Math.round(size * 0.74)
  const t = Math.max(2, Math.round(size * 0.12))
  const wbar = Math.round(size * 0.32)

  const raw = Buffer.alloc(size * (size * 4 + 1))
  let p = 0
  for (let y = 0; y < size; y++) {
    raw[p++] = 0 // filter byte
    for (let x = 0; x < size; x++) {
      const vertical = x >= x0 && x < x0 + t && y >= y0 && y < y1
      const horizontal = x >= x0 && x < x0 + wbar && y >= y1 - t && y < y1
      const white = vertical || horizontal
      raw[p++] = white ? 255 : 0
      raw[p++] = white ? 255 : 0
      raw[p++] = white ? 255 : 0
      raw[p++] = 255
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// Empacota um PNG em um contêiner .ico.
function pngToIco(png, size) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2) // type = icon
  header.writeUInt16LE(1, 4) // count
  const entry = Buffer.alloc(16)
  entry[0] = size >= 256 ? 0 : size
  entry[1] = size >= 256 ? 0 : size
  entry[2] = 0
  entry[3] = 0
  entry.writeUInt16LE(1, 4) // planes
  entry.writeUInt16LE(32, 6) // bpp
  entry.writeUInt32LE(png.length, 8)
  entry.writeUInt32LE(22, 12) // offset = 6 + 16
  return Buffer.concat([header, entry, png])
}

const png32 = renderPng(32)
writeFileSync('public/favicon-32.png', png32)
writeFileSync('public/apple-touch-icon.png', renderPng(180))
writeFileSync('public/favicon.ico', pngToIco(png32, 32))
console.log('Ícones gerados: favicon-32.png, apple-touch-icon.png, favicon.ico')
