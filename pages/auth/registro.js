import Regform from "../../components/Registro";

export default function Login({ sectores }) {
  return (
    <>
      <Regform sectores={sectores} />
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/auth/reguser");
  const sectores = await res.json();

  return {
    props: {
      sectores,
    },
  };
};
