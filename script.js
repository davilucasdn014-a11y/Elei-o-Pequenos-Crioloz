const candidatos={
  "14":{nome:"Davizoka"},
  "08":{nome:"Kauazinho Menino"},
  "12":{nome:"JhonJhon"},
  "67":{nome:"Kalebexxxxx"},
  "07":{nome:"Guilherme Siri"}
};

let numero="";
let votos=JSON.parse(localStorage.getItem("votosReiCriolo")||'{"14":0,"08":0,"12":0,"67":0,"07":0,"branco":0}');

function atualizar(){
  document.getElementById("numero").textContent=numero.padEnd(2,"_").split("").join(" ");
  const c=candidatos[numero];
  document.getElementById("nome").textContent=c?c.nome:"________________";
  document.getElementById("mensagem").textContent=
    c?"Confira os dados do candidato":
    (numero.length?"NÚMERO NÃO ENCONTRADO":"Digite o número do candidato");
}

function digitar(n){
  if(numero.length>=2)return;
  numero+=n;
  atualizar();
}

function corrigir(){
  numero="";
  atualizar();
  document.getElementById("mensagem").textContent="Digite o número do candidato";
}

function confirmar(){
  if(!candidatos[numero]){
    document.getElementById("mensagem").textContent="NÚMERO INVÁLIDO — CORRIJA";
    return;
  }
  votos[numero]++;
  salvar();
  numero="";
  atualizar();
  document.getElementById("mensagem").textContent="VOTO CONFIRMADO!";
  setTimeout(()=>document.getElementById("mensagem").textContent="Digite o número do candidato",1200);
}

function branco(){
  votos.branco++;
  salvar();
  corrigir();
  document.getElementById("mensagem").textContent="VOTO EM BRANCO CONFIRMADO!";
  setTimeout(()=>document.getElementById("mensagem").textContent="Digite o número do candidato",1200);
}

function salvar(){
  localStorage.setItem("votosReiCriolo",JSON.stringify(votos));
  atualizarPlacar();
}

function atualizarPlacar(){
  let html="";
  for(const n of ["14","08","12","67","07"]){
    html+=`<div><strong>${n} — ${candidatos[n].nome}</strong>: ${votos[n]} voto(s)</div>`;
  }
  html+=`<div><strong>BRANCO</strong>: ${votos.branco} voto(s)</div>`;
  document.getElementById("placar").innerHTML=html;
}

function resetar(){
  if(confirm("Zerar todos os votos desta urna?")){
    votos={"14":0,"08":0,"12":0,"67":0,"07":0,"branco":0};
    salvar();
  }
}

atualizar();
atualizarPlacar();

document.addEventListener("keydown",e=>{
  if(/^[0-9]$/.test(e.key))digitar(e.key);
  if(e.key==="Enter")confirmar();
  if(e.key==="Backspace")corrigir();
});
