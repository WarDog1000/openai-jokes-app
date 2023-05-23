import {NextResponse} from 'next/server'
import {Configuration, OpenAIApi} from 'openai'

const yourKey = '????'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
  // apiKey: yourKey
})

// Si la configuracion NO tiene el apiKey
if(!configuration.apiKey) {
  throw new Error('OPENAI_API_KEY is not defined')
}

// Se instancia el objeto OpenAIApi
const openai = new OpenAIApi(configuration)

// Funcion que recibe el chiste del API
export async function POST(request) {
  // Envia una peticion al server y recibe una respuesta

  // Valor que viene del input
  const promptText = await request.json()
  // Valida que prompt no venga vacio o nulo
  console.log(promptText)
  if(!promptText.prompt || promptText.prompt.length == 0) {
    return NextResponse.error(new Error('Prompt is required'), {status: 400})
  }
  
  try {
    const response = await openai.createCompletion({
        prompt:`Dame un chiste enfocado en el tema ${promptText.prompt}`,
        model: 'text-davinci-003',
        temperature: 0.7,
        max_tokens: 60
      })
      console.log(response.data.choices)
      return NextResponse.json(response.data.choices[0].text)
    } catch(error) {
      console.log(error)
      return NextResponse.error(error, {status: 500})
  }
}