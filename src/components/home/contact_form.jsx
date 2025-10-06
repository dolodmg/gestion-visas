'use client';
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSendMail } from "@/hooks/useMail";

const ContactForm = () => {
  const { sendMail, loading, error } = useSendMail();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await sendMail(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error enviando mail:", err);
    }
  };

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <div className="bg-[#212020] w-full flex flex-col text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#BD593A] md:mb-4">
          ¿Listo para empezar, pero tenés dudas?
        </h1>

        {isSubmitted ? (
          <div className="w-full flex flex-col text-center py-6">
            <div className="bg-[#2F2D2D] px-6 py-10 rounded-xl w-full max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#BD593A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-4">
                ¡Mensaje enviado!
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Te responderemos a la brevedad. Revisá tu email en las próximas
                horas.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-sm sm:text-base text-white font-normal pt-4 max-w-2xl mx-auto pb-6 leading-relaxed px-2">
              <p>Escribinos tu consulta y te responderemos a la brevedad.</p>
              <p className="mt-2">
                Nuestro equipo está listo para responder tus consultas y orientarte en los detalles del proceso de tu visa, para que avances con seguridad y confianza.
              </p>
            </div>

            <div className="bg-[#2F2D2D] px-6 py-6 rounded-xl w-full max-w-lg mx-auto">
              <Input
                className="mt-4 bg-white w-full"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre y apellido"
              />

              <Input
                className="mt-4 bg-white w-full"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <Textarea
                className="mt-4 bg-white w-full"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribinos tu consulta o comentario"
                rows={5}
              />

              <Button
                className={`w-full font-light text-white mt-6 flex items-center justify-center gap-2 ${
                  isFormValid && !loading
                    ? "bg-[#BD593A] hover:bg-[#a94b2e]"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!isFormValid || loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
