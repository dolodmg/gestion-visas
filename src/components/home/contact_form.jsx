'use client';
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();
  return (
    <div className="bg-[#212020] w-full flex flex-col text-center py-12">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-[#BD593A] mb-2">
          ¿Listo para empezar, pero tenés dudas?
        </h1>
        {isSubmitted ? (
          <div className="bg-[#212020] w-full flex flex-col text-center py-4 justify-center">
            <div className="bg-[#2F2D2D] px-8 py-12 rounded-xl w-full max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#BD593A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-4">¡Mensaje enviado!</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Te responderemos a la brevedad. Revisá tu email en las próximas horas.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-md text-white font-normal pt-4 max-w-2xl mx-auto pb-4 leading-relaxed">
              <p>Escribinos tu consulta y te responderemos a la brevedad.</p>
              <p>
                Nuestro equipo puede ayudarte con visas, permisos y otros trámites que pronto estarán disponibles.
              </p>
            </div>
    
            <div className="bg-[#2F2D2D] px-6 py-4 rounded-xl w-full max-w-lg mx-auto leading-relaxed">
              <Input 
                className="mt-4 bg-white" 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre y apellido" 
              />
              
              <Input 
                className="mt-4 bg-white" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
              />
              
              <Textarea 
                className="mt-4 bg-white" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribinos tu consulta o comentario" 
                rows={5} 
              />
              
              <Button 
                className={`w-full font-light text-white mt-4 mb-2 flex items-center justify-center gap-2 ${
                  isFormValid && !isSubmitting
                    ? 'bg-[#BD593A] hover:bg-[#a94b2e]'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
                disabled={!isFormValid || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
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
        )};
      </div>
    </div>
  )
};

export default ContactForm;