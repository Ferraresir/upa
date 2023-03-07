import ADODB from "node-adodb";
import { intervalToDuration, format, add } from "date-fns";
// import dayjs from 'dayjs'
// import duration from 'dayjs/plugin/duration'
// dayjs.extend(duration)

const connection = ADODB.open(
  "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\zkbase\\Access.mdb;"
);

export default async function fichada(req, res) {
  let reg = [];
  try {
    let date = format(new Date("11-20-2022"), "MM/dd/yyyy"); //req.body.date
    //let nextdate = format(add(new Date(date), { days: 1 }), "MM/dd/yyyy");
    let users = await connection.query(
      "SELECT userid,Badgenumber,name,lastname FROM USERINFO"
    );
    let atd = await connection.query(
      `SELECT * FROM CHECKINOUT WHERE CHECKTIME BETWEEN #${date} 00:00:01# AND #${date} 23:59:59#`
    );

    users.forEach((element) => {
      let asis = atd.filter((x) => x.USERID === element.userid);
      asis.sort((a, b) => {
        if (a.LOGID < b.LOGID) return -1;
        if (a.LOGID > b.LOGID) return 1;
        return 0;
      });
      if (asis.length >= 1 && asis.find((x) => x.CHECKTYPE === "I")) {
        let Entrada = asis.find((x) => x.CHECKTYPE === "I")?.CHECKTIME;
        let Salida = asis.find((x) => x.CHECKTYPE === "O")?.CHECKTIME;

        let diff =
          Salida && Entrada < Salida
            ? intervalToDuration({
                start: new Date(Entrada),
                end: new Date(Salida),
              })
            : "-";

        let inf = {
          id: element.userid,
          Nombre: element.name.toUpperCase(),
          Apellido: element.lastname.toUpperCase(),
          Entrada: Entrada ? format(new Date(Entrada), "kk:mm") : "-", //(Entrada.getHours()<10?"0":"") + Entrada.getHours() + ":" + (Entrada.getMinutes()<10?"0":"") + Entrada.getMinutes(),  //(new Date(Entrada).getHours()<10?"0":"") +new Date(Entrada).getHours() + ":" + (new Date(Entrada).getMinutes() <10? "0": "") + new Date(Entrada).getMinutes(),
          Salida:
            Salida && Salida > Entrada
              ? format(new Date(Salida), "kk:mm")
              : "-", //(Salida.getHours()<10? "0":"" ) + Salida.getHours()+ ":"+ (Salida.getMinutes()<10?"0":"") + Salida.getMinutes(),    //Salida && (new Date(Salida).getHours()<10?"0":"") +new Date(Salida).getHours() + ":" + (new Date(Salida).getMinutes() <10? "0": "") + new Date(Salida).getMinutes(),
          Horas:
            diff === "-"
              ? "-"
              : (diff.hours < 10 ? "0" : "") +
                diff.hours +
                ":" +
                (diff.minutes < 10 ? "0" : "") +
                diff.minutes,
        };
        reg.push(inf);
      }
    });
    reg.sort((a, b) => {
      if (a.Apellido < b.Apellido) return -1;
      if (a.Apellido > b.Apellido) return 1;
      return 0;
    });
    res.json(reg);
  } catch (err) {
    console.log(err);
  }
}
