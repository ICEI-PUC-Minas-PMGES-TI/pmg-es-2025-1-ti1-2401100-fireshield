function initMap() {
    const centro = { lat: -19.922731, lng: -43.945094 }; // Centro de BH

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: centro
    });

    const denuncias = [
        {
            lat: -19.922731,
            lng: -43.945094,
            titulo: "Denúncia 1 - Praça Sete de Setembro"
        },
        {
            lat: -19.935934,
            lng: -43.937824,
            titulo: "Denúncia 2 - Região Hospitalar"
        },
        {
            lat: -19.934784,
            lng: -43.936588,
            titulo: "Denúncia 3 - Avenida do Contorno"
        },
        {
            lat: -19.926153,
            lng: -43.992649,
            titulo: "Denúncia 4 - Praça da Liberdade"
        },
        {
            lat: -19.938191,
            lng: -43.999812,
            titulo: "Denúncia 5 - Mercado Central"
        },
        {
            lat: -19.918355,
            lng: -43.983406,
            titulo: "Denúncia 6 - Savassi"
        },
        {
            lat: -19.895115,
            lng: -43.981947,
            titulo: "Denúncia 7 - Pampulha (próximo à UFMG)"
        }
    ];

    denuncias.forEach(denuncia => {
        const marker = new google.maps.Marker({
            position: { lat: denuncia.lat, lng: denuncia.lng },
            map: map,
            title: denuncia.titulo
        });

        const info = new google.maps.InfoWindow({
            content: `<strong>${denuncia.titulo}</strong>`
        });

        marker.addListener("click", () => {
            info.open(map, marker);
        });
    });
}
