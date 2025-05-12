window.onload = function () {
    alert("Aviso: Os dados exibidos nesta página são fictícios.");

    const data = new Date();
    const formatData = data.toLocaleDateString();
    const hora = data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const atualizacaoEl = document.getElementById("ultima-atualizacao");
    if (atualizacaoEl) {
        atualizacaoEl.innerText = `${formatData} às ${hora}`;
    }
};


function copiarNumero() {
    const numero = document.getElementById("numero-denuncia").innerText;
    navigator.clipboard.writeText(numero)
        .then(() => alert("Número da denúncia copiado!"))
        .catch(() => alert("Erro ao copiar o número."));
}