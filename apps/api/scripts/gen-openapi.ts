import { writeFileSync } from 'fs'
import { resolve } from 'path'

async function generateOpenAPI() {
  const openapiJsonPath = resolve(__dirname, '../openapi.json')

  try {
    const { openapi } = await import('../src/presentation/http/docs/index')

    writeFileSync(openapiJsonPath, JSON.stringify(openapi, null, 2))
    console.log(`✅ OpenAPI document generated at ${openapiJsonPath}`)
  } catch (error) {
    console.error('❌ Error generating OpenAPI document:', error)
    process.exit(1)
  }
}

generateOpenAPI()
