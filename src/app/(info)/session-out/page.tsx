import SELinkButton from "@/components/skill-exchange/SELinkButton";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import SETitle from "@/components/skill-exchange/text/SETitle";

const SessionOutPage = () => {
  return (
    <section className="text-center">
      <SETitle label="Sesión cerrada" size="large" />
      <SEParragraph>
        Tu sesión ha expirado o ha sido cerrada. Para continuar, inicia sesión
        de nuevo.
      </SEParragraph>
      <SELinkButton
        label="Inicia sesión"
        link="/login"
        size="large"
        variant="accent"
      />
    </section>
  );
};

SessionOutPage.displayName = "SessionOutPage";

export default SessionOutPage;
