import Loginform from "../../components/Login";
import { getSession } from "next-auth/react";
export default function Login() {
  return (
    <>
      <Loginform />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { ...session },
  };
}
