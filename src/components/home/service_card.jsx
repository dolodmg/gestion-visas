import { Inter } from 'next/font/google';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const ServiceCard = ({ title, subtitle, description, image, fallback }) => {
    return (
        <div className=" flex flex-col items-center text-center mx-auto w-96 bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]">
            <Avatar className="h-16 w-16">
                <AvatarImage src={image} alt={title} />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <h2 className={`${inter.className} text-lg font-semibold text-white my-2`}>
                {title}
            </h2>
            <h3 className="text-zinc-300 mb-4 font-medium">
                {subtitle}
            </h3>
            <p className="text-md text-zinc-300 mb-4 leading-relaxed">{description}</p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#212020]/40 hover:bg-[#212020]/70 text-slate-200 font-medium rounded-lg border border-slate-600/50 hover:border-slate-500/70 transition-all duration-200">
                Ver más →
            </button>
        </div>
    )
}

export default ServiceCard;