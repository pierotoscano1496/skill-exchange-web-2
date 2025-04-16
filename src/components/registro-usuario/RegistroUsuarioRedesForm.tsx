import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import { useRouter } from "next/navigation";

const RegistroUsuarioRedesForm = () => {
  const {
    usuarioDatos,
    setCorreo,
    setClave,
    setIntroduccion,
    setPerfilLinkedin,
    setPerfilFacebook,
    setPerfilInstagram,
    setPerfilTiktok,
    validateRegistroDatosContacto,
  } = useRegistroUsuarioContext();

  const router = useRouter();

  const nextStepRegistration = () => {
    if (validateRegistroDatosContacto()) {
      router.push("/registro/usuario/redes");
    }
  };

  return (
    <div>
      <div>
        <label>
          Correo:
          <input
            type="email"
            placeholder="ejemplo@mail.com"
            value={usuarioDatos.correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Contraseña:
          <input
            type="password"
            placeholder="ejemplo@mail.com"
            value={usuarioDatos.clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Introducción:
          <textarea
            placeholder="Escríbenos sobre ti"
            value={usuarioDatos.introduccion}
            onChange={(e) => setIntroduccion(e.target.value)}
          />
        </label>
      </div>

      <div>
        <h3>Tus redes</h3>
        <div>
          <label>
            Linkedin:
            <input
              value={usuarioDatos.perfilLinkedin}
              onChange={(e) => setPerfilLinkedin(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Facebook:
            <input
              value={usuarioDatos.perfilFacebook}
              onChange={(e) => setPerfilFacebook(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Instagram:
            <input
              value={usuarioDatos.perfilInstagram}
              onChange={(e) => setPerfilInstagram(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Tiktok:
            <input
              value={usuarioDatos.perfilTiktok}
              onChange={(e) => setPerfilTiktok(e.target.value)}
            />
          </label>
        </div>
      </div>
      <button onClick={nextStepRegistration}>Siguiente</button>
      <button onClick={() => console.log(usuarioDatos)}>Corroborar</button>
    </div>
  );
};

RegistroUsuarioRedesForm.displayName = "RegistroUsuarioRedesForm";

export default RegistroUsuarioRedesForm;
