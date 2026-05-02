import { DbMaterial, QueryValue, queryOptional } from '@/lib/db'

export type MaterialInput = {
  title: string
  description?: string
  materialType: string
  programme?: string
  courseCode?: string
  semester?: string
  pricePaise?: number
  currency?: string
  fileUrl: string
  previewUrl?: string
  sellerName?: string
  sellerEmail?: string
  userId?: string
}

export async function getMaterialListings(
  materialType?: string,
  status = 'approved',
  programme?: string,
  userId?: string,
) {
  const params: QueryValue[] = [status]
  let where = 'where status = $1'

  if (materialType) {
    params.push(materialType)
    where += ` and material_type = $${params.length}`
  }

  if (programme) {
    params.push(programme.toUpperCase())
    where += ` and upper(programme) = $${params.length}`
  }

  if (userId) {
    params.push(userId)
    where += ` and user_id = $${params.length}`
  }

  const result = await queryOptional<DbMaterial>(
    `select id, title, description, material_type, programme, course_code, price_paise,
            currency, file_url, preview_url, seller_name, status, created_at
     from marketplace_materials
     ${where}
     order by created_at desc
     limit 60`,
    params
  )

  return result?.rows ?? []
}

export async function getMaterialCountsByProgramme(programme: string, materialType?: string) {
  const params: QueryValue[] = ['approved', programme.toUpperCase()]
  let typeFilter = ''

  if (materialType) {
    params.push(materialType)
    typeFilter = ` and material_type = $${params.length}`
  }

  const result = await queryOptional<{ course_code: string; count: string }>(
    `select course_code, count(*)::text as count
     from marketplace_materials
     where status = $1 and upper(programme) = $2${typeFilter}
       and course_code is not null
     group by course_code
     order by count desc`,
    params
  )

  return result?.rows ?? []
}

export async function getDistinctProgrammes(materialType?: string) {
  const params: QueryValue[] = ['approved']
  let typeFilter = ''
  if (materialType) {
    params.push(materialType)
    typeFilter = ` and material_type = $${params.length}`
  }
  const result = await queryOptional<{ programme: string; count: string }>(
    `select programme, count(*)::text as count
     from marketplace_materials
     where status = $1${typeFilter} and programme is not null and programme <> ''
     group by programme
     order by count::int desc
     limit 20`,
    params
  )
  return result?.rows ?? []
}

export async function createMaterialListing(input: MaterialInput) {
  const result = await queryOptional<{ id: string }>(
    `insert into marketplace_materials
      (user_id, title, description, material_type, programme, course_code, semester, price_paise,
       currency, file_url, preview_url, seller_name, seller_email, status)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending')
     returning id`,
    [
      input.userId || null,
      input.title,
      input.description || null,
      input.materialType,
      input.programme || null,
      input.courseCode || null,
      input.semester || null,
      input.pricePaise || 0,
      input.currency || 'INR',
      input.fileUrl,
      input.previewUrl || null,
      input.sellerName || null,
      input.sellerEmail || null,
    ]
  )

  return result?.rows[0] ?? null
}
