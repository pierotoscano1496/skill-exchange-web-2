import Image from "next/image";
import SocialMediaForm from "../components/SocialMediaForm";
import { redirect } from "next/navigation";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";

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
        <div className="hero-content">
          <h1>Skill exchange</h1>
          <h2>Comparte tus habilidades y conocimientos con otros</h2>
          <section className="section-content">
            <h3>Conecta, aprende y prospera en nuestra plataforma de intercambio de habilidades y conocimientos</h3>
            <p>¿Eres un experto en alguna habilidad o posees conocimientos valiosos? ¿Te gustaría compartir tus talentos con el mundo y además generar ingresos? ¡SkillExchange es el lugar perfecto para ti! Únete a nuestra comunidad en constante crecimiento y transforma tus habilidades en una fuente de ingresos.</p>
          </section>
          <section className="section-content">
            <h3>¿Por qué unirte a SkillExchange?</h3>
            <p>Monetiza tus habilidades: Convierte tus conocimientos y experiencia en una oportunidad para generar ingresos. Ofrece tutorías, cursos, talleres y asesorías en línea a personas de todo el mundo interesadas en aprender de ti.</p>
          </section>
          <section className="section-content">
            <h3>Cómo empezar:</h3>
            <p>Regístrate: Crea una cuenta gratuita en SkillExchange y completa tu perfil con tus habilidades, experiencia y formación.</p>
          </section>
          <section className="section-content">
            <h3>Publica tus servicios</h3>
            <p>Describe los servicios que ofreces, establece tus tarifas y añade imágenes y videos para mostrar tus habilidades.</p>
          </section>
          <section className="section-content">
            <h3>Establece tu disponibilidad</h3>
            <p>Configura tu calendario y horarios de atención para que los interesados puedan reservar sesiones contigo.</p>
          </section>
          <section className="section-content">
            <h3>Interactúa y enseña</h3>
            <p>Comparte tus habilidades y conocimientos con tus alumnos a través de videollamadas, chats y materiales de apoyo.</p>
          </section>
          <section className="section-content">
            <h3>Recibe tus ganancias</h3>
            <p>Obtén tus pagos de forma segura y rápida a través de nuestro sistema de pagos integrado.</p>
          </section>
          {!usuario ?
            <div className="button-group container content-space-between">
              <a href="/registro/usuario" className="link-button btn-primary">Regístrate ahora</a>
              <a href="/login" className="link-button btn-primary">Inicia sesión</a>
            </div>
            :
            <div className="button-group container content-space-between">
              <a href="/servicio" className="link-button btn-primary">Ir a mis servicios</a>
            </div>
          }
        </div>
      </section>
    </main>
  );
}
