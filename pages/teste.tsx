import api from "../services/api";

import datas from "../data.json";
import { toast } from "react-toastify";

export default function Teste() {

  return (
    <div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          datas.map(async (data) => {
            await api.post("/registeruser", data).then((response) => {
              console.log(response.data);
              toast.success("Usuários cadastrados com sucesso!");
            }).catch((error) => {
              toast.error("Erro ao cadastrar usuários!");
            });
          });
        }} 
      >
        CADASTRAR
      </button>
    </div>
  )
}