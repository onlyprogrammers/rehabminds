import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { fileName, contentType } = await request.json()
    const bucket = process.env.MATERIALS_S3_BUCKET

    if (!bucket) {
      return NextResponse.json({ error: 'MATERIALS_S3_BUCKET is not configured' }, { status: 503 })
    }

    if (!fileName || !contentType) {
      return NextResponse.json({ error: 'fileName and contentType are required' }, { status: 400 })
    }

    const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
    const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
    const region = process.env.AWS_REGION || 'ap-south-1'
    const s3 = new S3Client({ region })
    const key = `materials/${Date.now()}-${String(fileName).replace(/[^a-z0-9_.-]/gi, '-')}`

    const uploadUrl = await getSignedUrl(s3, new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    }), { expiresIn: 60 * 5 })

    return NextResponse.json({
      uploadUrl,
      fileUrl: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
    })
  } catch (error) {
    console.error('Presign failed:', error)
    return NextResponse.json({ error: 'Upload URL could not be created' }, { status: 500 })
  }
}
