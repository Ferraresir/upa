import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials, _) {
        const { user, password } = credentials;
        if (!user || !password) {
          throw new Error("Complete los campos");
        }
        const usuario = await prisma.user.findUnique({
          where: {
            user,
          },
          include: {
            sector: true,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!usuario || !(await compare(password, usuario.password))) {
          throw new Error("Usuario o Contraseña incorrectos");
        }
        return usuario;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.nombre = user.nombre;
        token.apellido = user.apellido;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.nombre = token.nombre;
        session.apellido = token.apellido;
        session.email = token.email;
        session.role = token.role;
        session.image = token.image;
        session.user = undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  //  jwt: { secret: process.env.NEXTAUTH_SECRET, encryption:true },
  pages: {
    signIn: "/auth/login",
  },
});
