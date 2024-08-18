import Image from "next/image";
import SocialMediaForm from "../components/SocialMediaForm";
import { redirect } from "next/navigation";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SELinkButton from "@/components/skill-exchange/SELinkButton";

export default async () => {
  let usuario = null;
  try {
    usuario = await obtenerUsuarioLogged();
  } catch {
    usuario = null;
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-12">
      <section className="text-center space-y-8" id="inicio">
        <h1 className="text-6xl font-extrabold text-gray-800">
          Skill Exchange
        </h1>
        <h2 className="text-2xl font-medium text-gray-700">
          Comparte tus habilidades y conocimientos con otros
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <section className="bg-blue-200 shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Conecta, aprende y prospera
            </h3>
            <p className="mt-4 text-gray-700">
              ¿Eres un experto en alguna habilidad o posees conocimientos
              valiosos? Únete a nuestra comunidad y transforma tus habilidades
              en una fuente de ingresos.
            </p>
          </section>
          <section className="bg-blue-200 shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-gray-900">
              ¿Por qué unirte a SkillExchange?
            </h3>
            <p className="mt-4 text-gray-700">
              Monetiza tus habilidades: Ofrece tutorías, cursos, talleres y
              asesorías en línea a personas de todo el mundo interesadas en
              aprender de ti.
            </p>
          </section>
          <section className="bg-cyan-200 shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-gray-900">Cómo empezar</h3>
            <p className="mt-4 text-gray-700">
              Regístrate: Crea una cuenta gratuita y completa tu perfil con tus
              habilidades, experiencia y formación.
            </p>
          </section>
          <section className="bg-cyan-200 shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Publica tus servicios
            </h3>
            <p className="mt-4 text-gray-700">
              Describe los servicios que ofreces, establece tus tarifas y añade
              imágenes y videos para mostrar tus habilidades.
            </p>
          </section>
          <section className="bg-indigo-200 shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Establece tu disponibilidad
            </h3>
            <p className="mt-4 text-gray-700">
              Configura tu calendario y horarios para que los interesados puedan
              reservar sesiones contigo.
            </p>
          </section>
          <section className="bg-indigo-200 shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Interactúa y enseña
            </h3>
            <p className="mt-4 text-gray-700">
              Comparte tus conocimientos con tus alumnos a través de
              videollamadas, chats y materiales de apoyo.
            </p>
          </section>
          <section className="bg-indigo-200 shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Recibe tus ganancias
            </h3>
            <p className="mt-4 text-gray-700">
              Obtén tus pagos de forma segura y rápida a través de nuestro
              sistema de pagos integrado.
            </p>
          </section>
        </div>
        <div className="flex justify-center space-x-4 mt-12">
          {!usuario ? (
            <>
              <SELinkButton
                label="Regístrate ahora"
                link="/registro/usuario"
                size="large"
                className="bg-green-500 hover:bg-green-600 text-white"
              />
              <SELinkButton
                label="Inicia sesión"
                link="/login"
                size="large"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              />
            </>
          ) : (
            <>
              <SELinkButton
                label="Ir a mi perfil"
                link="/profile"
                size="large"
                className="bg-green-500 hover:bg-green-600 text-white"
              />
              <SELinkButton
                label="Busca servicios"
                link="/servicio"
                size="large"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
};
