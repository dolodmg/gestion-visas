"use client";
import { Shield, FileText, Lock, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Inter } from "next/font/google";

const inter = Inter(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function TermsAndPrivacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1213] to-[#101c1f] text-gray-200 font-inter py-12 px-4 sm:px-8 lg:px-24">
      <div className={`${inter.className} max-w-5xl mx-auto space-y-10`}>
        {/* Header */}
        <section className="text-center space-y-2">
          <Shield className="mx-auto text-zinc-300 w-12 h-12 mb-3" />
          <h1 className="text-2xl md:text-4xl font-bold text-zinc-300">
            Términos y Condiciones - Política de Privacidad
          </h1>
          <p className="text-zinc-500 text-sm">Última actualización: 30 de octubre de 2025</p>
        </section>

        {/* Section 1 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700 shadow-md backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-300 text-md sm:text-sm">
              <FileText className="w-5 h-5" /> 1. Sobre nuestros servicios
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>
              Argenvisa es una plataforma online que brinda asesoramiento, orientación y asistencia
              en la gestión de trámites de visa. No somos una embajada, consulado ni autoridad
              gubernamental, y no garantizamos la aprobación de ningún trámite migratorio.
            </p>
            <p>
              Nuestro objetivo es facilitar la carga, organización y seguimiento de la documentación
              necesaria para las solicitudes de visa, de acuerdo con las normas oficiales de cada país.
            </p>
          </CardContent>
        </Card>

        {/* Section 2 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-zinc-300 text-md sm:text-sm">
              2. Uso del sitio
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>El uso de este sitio implica que el usuario:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Proporciona información real, completa y actualizada.</li>
              <li>Utiliza la plataforma solo con fines personales y legítimos.</li>
              <li>No realiza acciones que puedan afectar el funcionamiento del sitio ni vulnerar datos de otros usuarios.</li>
            </ul>
            <p>
              Nos reservamos el derecho de suspender o restringir el acceso a la plataforma ante usos indebidos o sospechosos.
            </p>
          </CardContent>
        </Card>

        {/* Section 3 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-300 text-md sm:text-sm">
              <Lock className="w-5 h-5" /> 3. Recolección de datos personales
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>Durante el uso de Argenvisa, podemos solicitar datos personales tales como:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Nombre y apellido</li>
              <li>DNI o pasaporte</li>
              <li>Fecha de nacimiento</li>
              <li>Nacionalidad</li>
              <li>Domicilio y datos de contacto</li>
              <li>Información laboral o académica</li>
              <li>Copias digitales de documentos requeridos para trámites de visa</li>
            </ul>
            <p>
              Estos datos se solicitan exclusivamente con fines administrativos y operativos, para poder
              brindarte nuestros servicios de asesoramiento y gestión de trámites.
            </p>
          </CardContent>
        </Card>

        {/* Section 4 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-zinc-300 text-md sm:text-sm">
              4. Uso de la información
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>La información proporcionada se utiliza para:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Procesar y gestionar los trámites solicitados</li>
              <li>Enviar recordatorios, actualizaciones y notificaciones</li>
              <li>Cumplir con obligaciones legales o administrativas</li>
              <li>Mejorar la experiencia de uso del sitio</li>
            </ul>
            <p>
              No compartimos ni vendemos información personal a terceros, salvo que sea necesario para
              cumplir con los trámites solicitados o requerimientos legales.
            </p>
          </CardContent>
        </Card>

        {/* Section 5 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-zinc-300 text-md sm:text-sm">
              5. Almacenamiento y seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>
              La información que nos proporcionás se almacena en servidores seguros con medidas de
              protección adecuadas. Sin embargo, ningún sistema en Internet es 100% seguro, por lo que
              Argenvisa no puede garantizar la seguridad absoluta de la información transmitida.
            </p>
          </CardContent>
        </Card>

        {/* Section 6 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-zinc-300 text-md sm:text-sm">
              6. Derechos del usuario
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>
              De acuerdo con la Ley N.º 25.326 de Protección de Datos Personales (Argentina), el usuario tiene derecho a:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Acceder a sus datos personales</li>
              <li>Solicitar su eliminación</li>
              <li>Revocar el consentimiento para su uso en cualquier momento</li>
            </ul>
            <p>
              Para ejercer estos derechos, el usuario puede escribirnos a{" "}
              <a href="mailto:visaparaargentinos@gmail.com" className="text-slate-400 hover:underline">
                visaparaargentinos@gmail.com
              </a>
              .
            </p>
          </CardContent>
        </Card>

        {/* Section 7 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-zinc-300 text-md sm:text-sm">
              7. Cookies y tecnologías similares
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>
              Nuestro sitio puede utilizar cookies y herramientas de análisis para mejorar la
              experiencia del usuario. El uso de cookies puede desactivarse desde el navegador,
              aunque algunas funciones del sitio podrían verse afectadas.
            </p>
          </CardContent>
        </Card>

        {/* Section 8 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-zinc-300 text-md sm:text-sm">
              8. Propiedad intelectual
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>
              Todos los contenidos del sitio (textos, logos, imágenes, diseños, marcas y software)
              son propiedad de Argenvisa o se utilizan con autorización. Está prohibida su reproducción
              o uso no autorizado.
            </p>
          </CardContent>
        </Card>

        {/* Section 9 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-zinc-300 text-md sm:text-sm">
              9. Modificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>
              Argenvisa podrá modificar en cualquier momento estos Términos y Condiciones y la Política
              de Privacidad. Las versiones actualizadas se publicarán en el sitio, indicando la fecha
              de última actualización.
            </p>
          </CardContent>
        </Card>

        {/* Section 10 */}
        <Card className="bg-[#0f1e22]/70 border border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-300 text-md sm:text-sm">
              <Mail className="w-5 h-5" /> 10. Contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 sm:text-xs text-sm">
            <p>Si tenés dudas o consultas sobre estos términos o el tratamiento de tus datos, podés escribirnos a:</p>
            <a
              href="mailto:visaparaargentinos@gmail.com"
              className="text-slate-400 hover:underline break-all"
            >
              visaparaargentinos@gmail.com
            </a>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
