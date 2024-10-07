import SELinkButton from "@/components/skill-exchange/SELinkButton";

export default () => {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold text-gray-800">Sesión cerrada</h1>
      <p className="text-xl text-gray-700">
        Tu sesión ha expirado o ha sido cerrada. Para continuar, inicia sesión
        de nuevo.
      </p>
      <SELinkButton
        label="Inicia sesión"
        link="/login"
        size="large"
        variant="accent"
      />
    </section>
  );
};
