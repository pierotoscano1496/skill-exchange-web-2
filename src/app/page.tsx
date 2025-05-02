import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SELinkButton from "@/components/skill-exchange/SELinkButton";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSearch,
  faHandshake,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const MainPage = async () => {
  let usuario = null;
  try {
    usuario = await obtenerUsuarioLogged();
  } catch {
    usuario = null;
  }

  return (
    <main
      className={classNames(
        "flex flex-col items-center justify-between min-h-screen bg-fondo-principal"
      )}
    >
      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-primary to-primary-200 text-white">
        <h1 className="text-5xl font-extrabold">
          Chambita: Encuentra y ofrece trabajos prácticos
        </h1>
        <p className="text-lg font-medium mt-4">
          Conecta con personas que necesitan tus habilidades para tareas
          cotidianas o proyectos específicos.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {!usuario ? (
            <>
              <SELinkButton
                link="/registro/usuario"
                size="large"
                className="bg-secondary text-white"
              >
                Regístrate ahora
              </SELinkButton>
              <SELinkButton
                link="/login"
                size="large"
                className="bg-accent text-white"
              >
                Inicia sesión
              </SELinkButton>
            </>
          ) : (
            <>
              <SELinkButton
                link="/profile"
                size="large"
                className="bg-secondary text-white"
              >
                Ir a mi perfil
              </SELinkButton>
              <SELinkButton
                link="/servicio"
                size="large"
                className="bg-accent text-white"
              >
                Busca servicios
              </SELinkButton>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          ¿Cómo funciona Chambita?
        </h2>
        <p className="text-lg text-center text-gray-600 mt-4">
          Descubre cómo nuestra plataforma puede ayudarte a conectar con otros.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {[
            {
              title: "Publica tus habilidades",
              description:
                "¿Sabes hacer algo bien? Publica tus servicios y encuentra personas interesadas en contratarte.",
              icon: faHandshake,
              bg: "bg-orange-100",
            },
            {
              title: "Encuentra ayuda fácilmente",
              description:
                "Busca personas cerca de ti que puedan ayudarte con tareas del día a día o proyectos específicos.",
              icon: faSearch,
              bg: "bg-yellow-100",
            },
            {
              title: "Regístrate gratis",
              description:
                "Crea tu cuenta en minutos y empieza a conectar con otros usuarios.",
              icon: faUserPlus,
              bg: "bg-green-100",
            },
            {
              title: "Fácil y seguro",
              description:
                "Nuestra plataforma te permite comunicarte y coordinar de manera sencilla y confiable.",
              icon: faShieldAlt,
              bg: "bg-blue-100",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`shadow-soft hover:shadow-deep ${card.bg} rounded-xl p-8 flex flex-col items-center text-center`}
            >
              <FontAwesomeIcon
                icon={card.icon}
                className="text-4xl text-primary mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
              <p className="mt-4 text-gray-700">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

MainPage.displayName = "MainPage";

export default MainPage;
