"use client"
import {useState} from "react"

function HomePage() {

  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  // Funcion asincrona para el envio del formulario
  const onSubmit = async (e) => {
    e.preventDefault()
    // Imprime por consola lo que el usuario escriba
    // console.log(prompt)

    // loading start
    setLoading(true)

    try {
    // Envia informacion al server // PETICION
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt})
    })

    // Se guarda la respuesta que recibe del server // RESPUESTA
    const data = await response.json()
    setResult(data)

    } catch(err) {
      return(err.message)
    }

    // Loadin end
    setLoading(false)
  }

  return (
    <div className="bg-zinc-950 h-screen flex justify-center items-center">
      <form action="" onSubmit={onSubmit}>
        <h1 className="text-white font-bold text-xl">Generate a joke</h1>
        <input className="p-2 block bg-neutral-700 text-white w-full rounded-md" type="text" onChange={e => setPrompt(e.target.value)} placeholder="Enter a theme" />
        <button disabled={!prompt || loading} className="disabled:opacity-50 bg-green-500 p-2 rounded-md block mt-2 text-white" type="submit">{loading ? 'Thinking...' : 'Generate'}</button>
        {result && (
          <p className="text-xl font-blod text-white max-w-xs my-10">
            {result}
          </p>
        )}
      </form>
    </div>
  )
}

export default HomePage