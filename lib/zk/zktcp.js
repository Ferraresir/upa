import net from "net";
import { COMMANDS } from "./zkconst";

const socket = new net.Socket();
const FICHERO = "192.168.1.60";
const PORT = 4370;

const connect = async () => {
  try {
    socket.connect(PORT, FICHERO);
    socket.once("connect", () => {
      console.log("connectado");
    });
    socket.once('close', (err) => {
       console.log(err);
      })

    socket.once("error", (err) => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
