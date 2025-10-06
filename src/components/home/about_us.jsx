import { Inter, Merriweather } from 'next/font/google';
import FeaturesGrid from '@/components/home/features_grid';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400','500','700','900'] });


const AboutUs = () => {
    return (
        <div className={`${inter.className} bg-[#2F2D2D] flex flex-col w-full py-14`}>
            <div className={`${merriweather.className} flex flex-col justify-center text-center gap-4`}>  
                <h1 className='text-3xl md:text-5xl font-bold text-white px-2'>Expertos que te entienden</h1>
                <h2 className='text-lg font-extralight text-gray-300 px-2'>Tu visa, nuestra experiencia: simplificamos el camino para vos</h2>
            </div>
            <div className='w-5/6 mx-auto mt-4 md:mt-8 text-center'>
                <p className='text-lg font-light text-zinc-300'>
                    Conseguir tu visa para Estados Unidos o Canadá puede ser confuso y estresante: formularios largos, citas difíciles de conseguir, temor al rechazo…
                    <span className='font-medium'>Por eso estamos nosotros.</span>
                </p>
            </div>  
            <div className='w-5/6 mx-auto text-center mt-4 hidden md:block'>
                <p className='text-md font-light text-zinc-400'>
                No somos una agencia más: somos argentinos que entendemos exactamente por lo que estás pasando, porque nosotros también estuvimos ahí. Creamos esta plataforma para que obtener tu visa sea fácil, rápido y sin estrés.
                </p>
            </div>
            <FeaturesGrid />
        </div>
    )
}

export default AboutUs;