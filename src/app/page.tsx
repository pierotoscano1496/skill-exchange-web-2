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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="hero" id="inicio">
        <div className="grid grid-cols-8">
          <h1 className="text-4xl py-4 text-center col-span-8 font-bold">
            Skill exchange
          </h1>
          <h2 className="text-1xl text-center font-medium col-span-8">
            Comparte tus habilidades y conocimientos con otros
          </h2>
          <section className="border-solid border-2 rounded-s-2xl border-blue-600 bg-blue-300 px-9 py-4 my-10 col-end-9 col-span-5">
            <h3 className="text-2xl font-black text-right">
              Conecta, aprende y prospera en nuestra plataforma de intercambio
              de habilidades y conocimientos
            </h3>
            <p className="text-right">
              ¿Eres un experto en alguna habilidad o posees conocimientos
              valiosos? ¿Te gustaría compartir tus talentos con el mundo y
              además generar ingresos? ¡SkillExchange es el lugar perfecto para
              ti! Únete a nuestra comunidad en constante crecimiento y
              transforma tus habilidades en una fuente de ingresos.
            </p>
          </section>
          <section className="border-solid border-2 rounded-e-2xl border-blue-600 bg-blue-300 px-9 py-4 my-10 col-start-1 col-span-5">
            <h3 className="text-left font-black text-2xl">
              ¿Por qué unirte a SkillExchange?
            </h3>
            <p className="text-left">
              Monetiza tus habilidades: Convierte tus conocimientos y
              experiencia en una oportunidad para generar ingresos. Ofrece
              tutorías, cursos, talleres y asesorías en línea a personas de todo
              el mundo interesadas en aprender de ti.
            </p>
          </section>
          <section className="border-solid border-2 rounded-s-2xl border-cyan-600 bg-cyan-300 px-9 py-4 my-10 col-end-9 col-span-5">
            <h3 className="text-right font-black text-2xl">Cómo empezar:</h3>
            <p className="text-right">
              Regístrate: Crea una cuenta gratuita en SkillExchange y completa
              tu perfil con tus habilidades, experiencia y formación.
            </p>
          </section>
          <section className="border-solid border-2 rounded-e-2xl border-cyan-600 bg-cyan-300 px-9 py-4 my-10 col-start-1 col-span-5">
            <h3 className="text-left font-black text-2xl">
              Publica tus servicios
            </h3>
            <p className="text-left">
              Describe los servicios que ofreces, establece tus tarifas y añade
              imágenes y videos para mostrar tus habilidades.
            </p>
          </section>
          <section className="border-solid border-2 rounded-s-2xl border-indigo-600 bg-indigo-300 px-9 py-4 my-10 col-end-9 col-span-5">
            <h3 className="text-right font-black text-2xl">
              Establece tu disponibilidad
            </h3>
            <p className="text-right">
              Configura tu calendario y horarios de atención para que los
              interesados puedan reservar sesiones contigo.
            </p>
          </section>
          <section className="border-solid border-2 rounded-e-2xl border-indigo-600 bg-indigo-300 px-9 py-4 my-10 col-start-1 col-span-5">
            <h3 className="text-left font-black text-2xl">
              Interactúa y enseña
            </h3>
            <p className="text-left">
              Comparte tus habilidades y conocimientos con tus alumnos a través
              de videollamadas, chats y materiales de apoyo.
            </p>
          </section>
          <section className="border-solid border-2 rounded-s-2xl border-indigo-600 bg-indigo-300 px-9 py-4 my-10 col-end-9 col-span-5">
            <h3 className="text-right font-black text-2xl">
              Recibe tus ganancias
            </h3>
            <p className="text-right">
              Obtén tus pagos de forma segura y rápida a través de nuestro
              sistema de pagos integrado.
            </p>
          </section>
          <div className="px-8 py-4 my-10 col-span-8 justify-self-center grid grid-cols-2 gap-x-10">
            {!usuario ? (
              <>
                <SELinkButton
                  label="Regístrate ahora"
                  link="/registro/usuario"
                  size="medium"
                />
                <SELinkButton
                  label="Inicia sesión"
                  link="/login"
                  size="medium"
                />
              </>
            ) : (
              <SELinkButton
                label="Ir a mi perfil"
                link="/profile"
                size="medium"
              />
            )}
            <SELinkButton
              label="Busca servicios"
              link="/servicio"
              size="medium"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
