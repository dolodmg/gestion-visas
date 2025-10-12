import { CanadaHeader } from "@/components/canada/canada_header";
import Instructions from "@/components/common/instructions";
import ServiceSchema from "@/components/schemas/service-schema";
import CanadaPricingSection from "@/components/canada/canada_pricing_section";
import CanadaVisaChecker from "@/components/canada/canada_test";
import FAQ from "@/components/common/FAQ";

const CanadaPage = () => {

    const h2 = "Un proceso claro y profesional diseñado para hacer tu solicitud de visa lo más simple posible.";

    const steps = [
        {
            number: 1,
            title: "Contratá el servicio online",
            description: [
            "Elegí el tipo de trámite que necesitás (Visa o eTA) y completá tu compra desde nuestra web."
            ]
        },
        {
            number: 2,
            title: "Recibí la guía para empezar",
            description: [
            "Vas a recibir un correo con toda la información necesaria y los pasos a seguir, junto con el formulario que deberás completar.",
            "Si contrataste un servicio con videollamada, vas a poder agendarla en ese momento."
            ]
        },
        {
            number: 3,
            title: "Revisión y carga de tus datos",
            description: [
            "Una vez que completes el formulario, nuestro equipo cargará tus datos en la página oficial del Gobierno de Canadá.",
            "Nostros te avisamos cuando el proceso esté completo:",
            "• En caso de Visa, te enviaremos un CVU para abonar el costo del trámite (185 CAD).",
            "• En caso de la autorización eTA, no hace falta abonar nada más: el precio ya está incluido en el valor del servicio."
            ]
        },
        {
            number: 4,
            title: "Confirmación del trámite",
            description: [
            "Una vez finalizado el proceso, te vamos a avisar el resultado de tu solicitud!"
            ]
        }
    ];

     const questions = [
        {   
            id: 1,
            question: "¿Cuál es la diferencia entre eTA y VISA para Canadá?",
            answer: "La eTA es una autorización electrónica simplificada que se tramita 100% online y es válida solo para viajes en avión. Está disponible únicamente para ciudadanos argentinos que tengan visa estadounidense vigente o hayan tenido una visa canadiense en los últimos 10 años. La VISA canadiense, en cambio, es un proceso más completo que requiere entrevista en la embajada y es necesaria para todos los que no califican para eTA o viajan por tierra/mar."
        },
        {
            id: 2,
            question: "¿Cuánto tiempo tarda en aprobarse la eTA?",
            answer: "La mayoría de las solicitudes de eTA se aprueban en cuestión de minutos, aunque en algunos casos puede demorar hasta 72 horas."
        },
        {
            id: 3,
            question: "¿Necesito imprimir la eTA una vez aprobada?",
            answer: "No es necesario imprimir la eTA. La autorización está vinculada electrónicamente a tu pasaporte, por lo que las aerolíneas y los oficiales de inmigración pueden verificarla automáticamente con tu número de pasaporte."
        },
        {
            id: 4,
            question: "¿Qué documentos necesito para solicitar la VISA?",
            answer: "Los documentos básicos incluyen: pasaporte vigente, comprobantes de solvencia económica (extractos bancarios de los últimos 3-6 meses), comprobantes de arraigo en Argentina (recibo de sueldo, certificado de trabajo, título de propiedad), reservas de vuelo y alojamiento, y carta explicando el motivo del viaje. Dependiendo de tu situación personal, pueden solicitarse documentos adicionales."
        },
        {
            id: 5,
            question: "¿Cuánto cuesta la tasa consular de la VISA canadiense?",
            answer: "La tasa consular para visa de visitante es de CAD $100 por persona. Esta tasa se paga directamente al gobierno canadiense y es adicional a nuestro servicio de gestión. También hay un costo adicional por la toma de datos biométricos en el VAC de CAD $85."
        },
        {
            id: 6,
            question: "¿Qué incluye el servicio de gestión?",
            answer: "Nuestro servicio incluye: carga del formulario oficial en el sistema de inmigración canadiense, agenda de citas en el VAC y guía paso a paso de todo el proceso. En el plan Premium, además incluimos una videollamada personalizada para despejar tus dudas."
        },
        {
            id: 7,
            question: "¿Ustedes garantizan la aprobación de mi visa/eTA?",
            answer: "No podemos garantizar la aprobación ya que la decisión final la toma el oficial consular canadiense. Sin embargo, nuestro servicio maximiza tus chances de éxito al asegurarnos de que tu solicitud esté completa, correctamente presentada y sin errores."
        },
        {
            id: 8,
            question: "¿Cuándo tengo que pagar la tasa consular de la VISA?",
            answer: "Una vez que contratás el servicio, te enviamos un formulario detallado para completar con tus datos. Cuando nos devolvés ese formulario completo, te enviamos un CVU/alias para que deposites el monto correspondiente a la tasa consular en pesos argentinos (calculado al valor del dólar canadiense del día). Una vez que recibimos tu pago, nosotros nos encargamos de abonar la tasa consular directamente al gobierno canadiense y procedemos a agendar tus citas en el VAC y la embajada."
        }, 
        {
            id: 9,
            question: "¿Cuánto tiempo puedo quedarme en Canadá con una eTA?",
            answer: "Con la eTA podés permanecer en Canadá hasta 6 meses por visita. La eTA en sí tiene una validez de 5 años o hasta que venza tu pasaporte (lo que ocurra primero), permitiéndote realizar múltiples viajes durante ese período."
        }
    ]

    const name = "tu visa o eTA";

    return (
        <div>
            <ServiceSchema 
                name="Visa de Turismo y Autorización eTA Canadá "
                description="Gestión completa de la solicitud y agenda de citas para visa de turismo y autorización eTA para Canadá"
                price="100"
            />
            <CanadaHeader />
            <CanadaVisaChecker />
            <Instructions steps={steps} h2={h2} />
            <div id="pricing-section">
                <CanadaPricingSection />
            </div>
            <FAQ questions={questions} name={name} />
        </div>
    )
}

export default CanadaPage;