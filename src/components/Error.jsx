
export default function Error() {
  return (
    <div className='bg-sky-100 h-screen flex justify-center items-center'>
        <div className="flex flex-col gap-1">
            <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-red-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            </div>
            <h1 className="text-gray-800 text-3xl text-center">¡Lo siento! Ha ocurrido un error</h1>
            <h3 className="text-gray-800 text-md text-center">Por favor vuelva a intentarlo más tarde. Gracias</h3>

        </div>
    </div>
  )
}
