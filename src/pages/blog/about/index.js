import Format from "@/layout/format"

export default function About() { 
    return(
        <>
        <Format>
        <div className="h-screen">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 pt-12">
            <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between pt-8 sm:pt-20">
            <div className="w-full sm:w-1/2 my-24">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-shadow">Let's improve your creativity and writing skills by making short stories in 
                <span className="text-amber-500"> CerpenBlog.</span>
                </h1>
                <p className="text-lg md:text-xl leading-relaxed mb-6">Selamat datang di CerpenBlog! Kami hadir untuk membantu mengembangkan kreativitasmu dan kemampuan menulis melalui pembuatan cerita pendek. Kami menyediakan platform yang mudah digunakan untuk membagikan ceritamu dan membaca cerita orang lain. Bergabunglah dengan kami dan temukan dunia menulis yang menyenangkan!</p>
            </div>
            <div className="max-w-lg sm:w-[650px] flex justify-center items-center">
                <img className="w-full md:w-4/5 lg:w-full" src="https://mediaedukasi.id/wp-content/uploads/2022/03/tips-menulis.png" alt=""/>
            </div>
            </div>
        </div>
        </div>

        </Format>
        </>
    )
 }