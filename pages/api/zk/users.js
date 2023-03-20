import ZKLib from "../../../lib/zklib/zklib";

export default async function handler(req, res) {
  let Zk = new ZKLib(process.env.FICHERO_IP, 4370, 10000, 4000);

  if (req.method === "GET") {
    await Zk.createSocket();
    await Zk.disableDevice();
    const users = await Zk.getUsers();
    await Zk.enableDevice();
    res.send(users);


  } else if (req.method === "POST") {
    res.send("post");


  } else if (req.method === "PUT") {
    //require objeto completo, modifica objeto completo
    res.send("put");


  } else if (req.method === "PATCH") {
    // requiere parte del objeto a modificar,modifica parcialmente un objeto
    res.send("patch");


  } else if (req.method === "DELETE") {
    res.send("delete");

    
  }
}
