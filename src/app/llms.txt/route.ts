import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'llms.txt')
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      },
    })
  } catch (error) {
    return new NextResponse('# Hyrinx Rental\nhttps://hyrinx.in', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}
