// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
document.addEventListener('DOMContentLoaded', function () {
    DestaquesMensaisCarregarPag();
    carregarVideosBucelas();
    carregarImgsRede();
    
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar-header');
    const appBar = document.querySelector('.app-bar');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');

        // Adiciona overlay quando o menu está aberto
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fechar o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar o menu ao clicar fora (opcional)
    document.addEventListener('click', function (event) {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(event.target) &&
            event.target !== menuToggle &&
            !appBar.contains(event.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

   
});

function carregarVideosBucelas() {
    const videos = [
        "https://www.youtube.com/watch?v=yd4i42rALi4",
        "https://www.youtube.com/watch?v=JZ3UGqYjFhw&t=9s",
        "https://www.youtube.com/watch?v=PNN8pFttM6Y",
        "https://www.youtube.com/watch?v=Tqm8uYAxDoM",
        "https://www.youtube.com/watch?v=Qy7VvkIsdDM",
        "https://www.youtube.com/watch?v=kcXSDX1TGZM",
        "https://www.youtube.com/watch?v=z_QG9bnNbKE",
        "https://www.youtube.com/watch?v=VVhk7x9eN4A"
    ];

    const container = document.getElementById('videosContainer');
    if (!container) return;

    videos.forEach(url => {
        const videoIdMatch = url.match(/[?&]v=([^&]+)/);
        if (!videoIdMatch) return; // Ignorar links inválidos

        const videoId = videoIdMatch[1];
        const iframeSrc = `https://www.youtube.com/embed/${videoId}`;

        const div = document.createElement('div');
        //div.className = 'video-container';

        div.innerHTML = `
            <iframe width="560" height="315" src="${iframeSrc}" frameborder="0" allowfullscreen></iframe>
        `;

        container.appendChild(div);
    });
}

var especialistas;
async function GetRPE() {
    try {
        const resposta = await fetch("api/PalavraE");
        if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        especialistas = await resposta.json();
       
    } catch (error) {
        console.error('Erro ao carregar especialistas:', error);
    }
}
async function carregarRespostasPE() {

    await GetRPE();

    const container = document.getElementById('especialistasContainer');
    if (container.children.length > 0) return;
    especialistas.forEach(esp => {
        const div = document.createElement('div');
        div.classList.add('especialista');

        div.innerHTML = `
            <img src="Imgs/palavrae/${esp.foto ? esp.foto : "user.png"}" alt="Foto de ${ esp.nome }" />
            <div style="flex:1;">
                <p style="font-weight:bold; font-size:1.2em; margin:0 0 5px 0;">${esp.nome}</p>
                <p style="color:#555; margin-bottom:15px;">${esp.cargo}</p>
                <p style="color:#555; margin-bottom:15px;">(${esp.departamento})</p>
                <p class="pergunta">1. De que forma os objetos do quotidiano e as memórias familiares ajudam a compreender a história de uma comunidade como Bucelas?</p>
                <p class="resposta">${esp.p1}</p>

                <p class="pergunta">2. Por que motivos é importante valorizar e estudar a história das famílias no contexto da história local?</p>
                <p class="resposta">${esp.p2}</p>

                <p class="pergunta">3. Como podem os testemunhos e as memórias orais das famílias complementar ou desafiar os registos históricos tradicionais?</p>
                <p class="resposta">${esp.p3}</p>

                <p class="pergunta">4. Que critérios devemos ter em conta para preservar objetos e memórias familiares para as gerações futuras?</p>
                <p class="resposta">${esp.p4}</p>

                <p class="pergunta">5. Quais os riscos de não preservar estas memórias e objetos no que respeita à identidade e memória coletiva?</p>
                <p class="resposta">${esp.p5}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

var autarcas;
async function GetRPA() {
    try {
        const resposta = await fetch("api/PalavraA");
        if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        autarcas = await resposta.json();

    } catch (error) {
        console.error('Erro ao carregar especialistas:', error);
    }
}
async function carregarRespostasPA() {

    await GetRPA();
    const container = document.getElementById('autarcasContainer');
    if (container.children.length > 0) return;
    autarcas.forEach(esp => {
        const div = document.createElement('div');
        div.classList.add('especialista');

        div.innerHTML = `
            <img src="Imgs/palavraa/${esp.imagem ? esp.imagem : "user.png"}" alt="Foto de ${esp.nome}" />
            <div style="flex:1;">
                <p style="font-weight:bold; font-size:1.2em; margin:0 0 5px 0;">${esp.nome}</p>
                <p style="color:#555; margin-bottom:15px;">${esp.cargo}</p>
                <p class="pergunta">1. De que forma os objetos do quotidiano e as memórias familiares ajudam a compreender a história de uma comunidade como Bucelas?</p>
                <p class="resposta">${esp.p1}</p>

                <p class="pergunta">2. Por que motivos é importante valorizar e estudar a história das famílias no contexto da história local?</p>
                <p class="resposta">${esp.p2}</p>

                <p class="pergunta">3. Como podem os testemunhos e as memórias orais das famílias complementar ou desafiar os registos históricos tradicionais?</p>
                <p class="resposta">${esp.p3}</p>

                <p class="pergunta">4. Que critérios devemos ter em conta para preservar objetos e memórias familiares para as gerações futuras?</p>
                <p class="resposta">${esp.p4}</p>

                <p class="pergunta">5. Quais os riscos de não preservar estas memórias e objetos no que respeita à identidade e memória coletiva?</p>
                <p class="resposta">${esp.p5}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function carregarImgsRede() {
    // Lista de nomes de imagens
   
    const imagens = [
        { nome: "APEE.jpg", titulo: "APEE – Associação de Pais e Encarregados de Educação do Parque Escolar de Bucelas", email: "apee.parqueescolardebucelas@gmail.com" },
        { nome: "ARCDVilaRei.jpg", titulo: "Associação Recreativa Cultural e Desportiva de Vila de Rei", email: "geral.arcdviladerei@gmail.com" },
        { nome: "AssJuvenilBucelas.jpg", titulo: "Associação Juvenil de Bucelas", email: "ajbucelas@gmail.com" },
        { nome: "BANDARECREATIVA.jpg", titulo: "Banda Recreativa de Bucelas", email: "brbucelas@gmail.com" },
        { nome: "BombeirosBucelas.jpg", titulo: "Associação Humanitária de Bombeiros Voluntários de Bucelas", email: "direccaobvbucelas@gmail.com" },
        { nome: "CasaPovoBucelas.jpg", titulo: "Casa do Povo de Bucelas", email: "casapovobucelas@gmail.com" },
        { nome: "CCVilaNova.jpg", titulo: "Centro de Cultura e Desporto de Vila Nova", email: "ccdvilanova@hotmail.com" },
        { nome: "CFOsBucelenses.jpg", titulo: "Clube de Futebol “Os Bucelenses”", email: "cfosbucelenses@afl.pt" },
        { nome: "CONFRARIAARINTO.jpg", titulo: "Confraria do Arinto de Bucelas", email: "confrariaarintobucelas@gmail.com" },
        { nome: "FFREIXIAL.jpg", titulo: "Sociedade Cultural Desportiva e Recreativa “Os Amigos do Freixial”", email: "scdr.amigosfreixial@sapo.pt" },
        { nome: "GRUPOCOLUMBOFILOBUCELAS.jpg", titulo: "Grupo Columbófilo de Bucelas", email: "gcolumbofilobucelas@sapo.pt" },
        { nome: "GRUPOMUSICALERECREATIVODABEMPOSTA.png", titulo: "Grupo Musical e Recreativo da Bemposta", email: "gmrbemposta1951@gmail.com" },
        { nome: "INSTITUIÇÃOAPOIOSOCIAL.jpg", titulo: "Instituição de Apoio Social da Freguesia de Bucelas", email: "geraliasfbucelas@gmail.com" },
        { nome: "JUNTAFREGUESIABUCELAS.png", titulo: "Junta de Freguesia de Bucelas", email: "secretaria@jf-bucelas.pt" },
        { nome: "MotoClubeCascata.jpg", titulo: "Moto Clube Cascata", email: "moto.clube.cascata@gmail.com" },
        { nome: "nucleosportinguista.jpg", titulo: "Núcleo Sportinguista de Bucelas", email: "nsbucelas@hotmail.com" },
        { nome: "ParoquiaBucelas.jpg", titulo: "Paróquia de Bucelas", email: "paroquia-bucelas@ictusup4.pt" },
        { nome: "UCRC.jpeg", titulo: "União Cultural e Recreativa da Chamboeira", email: "ucrchamboeira@gmail.com" },
        { nome: "ACFB.jpeg", titulo: "Associação de Caçadores da Freguesia de Bucelas", email: "acfbucelas@gmail.com" },
        { nome: "CAMARAMUNICIPALLOURES.jpg", titulo: "Câmara Municipal de Loures", email: "geral@cm-loures.pt" },
        { nome: "JUNTAFREGUESIABUCELAS.png", titulo: "Junta de Freguesia de Bucelas", email: "secretaria@jf-bucelas.pt" },
        { nome: "AE4O.jpg", titulo: "Agrupamento de Escolas 4 de Outubro", email: "ebi.secretaria@sapo.pt" }
    ];

    const container = document.getElementById("RedeContainerImgs");

    imagens.forEach(({ nome, titulo, email }) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("img-card");

        const img = document.createElement("img");
        img.src = `/Imgs/redeBucelas/${nome}`;
        img.alt = titulo;

        const title = document.createElement("h6");
        title.textContent = titulo;

        const mail = document.createElement("p");
        mail.textContent = email;

        wrapper.appendChild(img);
        wrapper.appendChild(title);
        wrapper.appendChild(mail);

        container.appendChild(wrapper);
    });
}

async function GetItens() {
    const resposta = await fetch("api/Itens");
    itens = await resposta.json();
}

async function DestaquesMensaisCarregarPag() {
    const img = document.getElementById("imgDM");
    const titulo = document.getElementById("tituloDM");
    const texto = document.getElementById("descricaoDM");
    const origem = document.getElementById("origemDM");
    const referencia = document.getElementById("referenciasDM");

    const resposta = await fetch("api/DestaqueMensal")
    await resposta.json().then(data => {
        img.src = "Imgs/items/" + data.imagem;
        titulo.textContent = data.nome;
        texto.innerHTML = "<strong>Descrição:</strong> " + data.descricao;
        origem.innerHTML = "<strong>Origem:</strong> " + data.origem;
        if (data.referencia) {
            if (data.referencia.startsWith("http")) {
                referencia.href = data.referencia;
                referencia.innerHTML = `<strong style="color: black">Referencia:</strong> ${data.referencia}`;
                referencia.target = "_blank"; // abre numa nova aba
            } else {
                referencia.removeAttribute("href");
                referencia.removeAttribute("target");
                referencia.textContent = data.referencia;
            }
        } else {
            referencia.removeAttribute("href");
            referencia.removeAttribute("target");
            referencia.textContent = "";
        }
    });
}

async function Mapa() {

    var map = L.map('map', {
        minZoom: 10, // impede zoom-out exagerado
        maxZoom: 16
    }).setView([38.910560490291225, -9.123144692640492], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        minZoom: 10,
        maxZoom: 16
    }).addTo(map);

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var violetIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var greyIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
   
    var goldIcon = new L.Icon({
        iconUrl: ' https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const resposta = await fetch("api/PatrimonioC");
    const patrimonioC = await resposta.json();

    patrimonioC.forEach(patrimonio => {

        const imgs = patrimonio.imgs.split('_');

        var popupContent = `
      <div style="width:250px;">
        <h4>${patrimonio.nome}</h4>
            <div id="carousel" style="position:relative; overflow:hidden; height:150px;">
            
        `;

        imgs.forEach((img, i) => {
            popupContent += `<img src="Imgs/patrimonioC/${patrimonio.tipo}/${img}" style="width:100%; display:${i === 0 ? 'block' : 'none'};">`;
        });


        if (imgs.length > 1) {
            popupContent += `
            <button id="prev" style="position:absolute; left:0; top:50%; transform:translateY(-50%); background:none; border:none; font-size:24px; cursor:pointer;">‹</button>
            <button id="next" style="position:absolute; right:0; top:50%; transform:translateY(-50%); background:none; border:none; font-size:24px; cursor:pointer;">›</button>`;
        }

        popupContent += `
        </div>
        <p><strong>Morada:</strong> ${patrimonio.morada}</p>
    </div>`;

        // Define o ícone correto com base no tipo
        let icon;
        switch (patrimonio.tipo) {
            case "ic": icon = violetIcon; break;
            case "maci": icon = greyIcon; break;
            case "fh": icon = greenIcon; break;
            case "cc": icon = blueIcon; break;
            case "qph": icon = goldIcon; break;
            case "qv": icon = redIcon; break;
            default: icon = defaultIcon; break;
        }

        const marker = L.marker([patrimonio.latitude, patrimonio.longitude], { icon }).addTo(map).bindPopup(popupContent);

        if (imgs.length > 1) {
            marker.on('popupopen', () => {
                let currentIndex = 0;
                const images = document.querySelectorAll('#carousel img');
                const prevBtn = document.getElementById('prev');
                const nextBtn = document.getElementById('next');

                const showImage = index => {
                    images.forEach((img, i) => img.style.display = (i === index ? 'block' : 'none'));
                };

                prevBtn.onclick = () => {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    showImage(currentIndex);
                };
                nextBtn.onclick = () => {
                    currentIndex = (currentIndex + 1) % images.length;
                    showImage(currentIndex);
                };
            });
        }
    });


    var legenda = L.control({ position: 'bottomright' });

    legenda.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend custom-legend');

        div.innerHTML += '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png"> Igrejas / Capelas<br>';
        div.innerHTML += '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png"> Museus / Arquivos / Centros de Interpretação<br>';
        div.innerHTML += '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"> Fortificações Históricas<br>';
        div.innerHTML += '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"> Coretos / Chafarizes<br>';
        div.innerHTML += '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png"> Quintas / Palácios Históricos<br>';
        div.innerHTML += '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"> Quintas Vitivinícolas<br>';

        return div;
    };

    legenda.addTo(map);
    
}

function FecharMain() {
    document.getElementById("Introducao").style.display = "none";
    document.getElementById("Justificacao").style.display = "none";
    document.getElementById("Destaque").style.display = "none";
    document.getElementById("PatrimonioC").style.display = "none";
    document.getElementById("PatrimonioF").style.display = "none";
    document.getElementById("PatrimonioI").style.display = "none";
    document.getElementById("Videos").style.display = "none";
    document.getElementById("PalavraE").style.display = "none";
    document.getElementById("PalavraP").style.display = "none";
    document.getElementById("Partilhe").style.display = "none";
    document.getElementById("Rede").style.display = "none";
    document.getElementById("Conclusao").style.display = "none";
    document.getElementById("Fontes").style.display = "none";
    document.getElementById("Autores").style.display = "none";
    document.getElementById("PalavraA").style.display = "none";
}

var itens;
var itensOrdenados;

async function CarregarPatrimonioF() {
    ordenada = false;
    const paginas = document.getElementById("pagina-atual").textContent.split(" - ");
    const paginaAtual = parseInt(paginas[0]);

    const container = document.getElementById("containerPF");
    const fragment = document.createDocumentFragment();

    const inicio = (paginaAtual - 1) * 3;
    const fim = Math.min(paginaAtual * 3, itens.length);

    for (let i = inicio; i < fim; i++) {
        const item = itens[i];
        const div = document.createElement("div");
        let linkHTML = "";

        if (item.referencia) {
            linkHTML = `<a href="${item.referencia}" target="_blank"><strong>Referência: </strong>${item.referencia}</a>`;
        } else {
            linkHTML = `<a href="#"><strong>Referência: </strong>N/A</a>`;
        }
        div.classList.add("shadow-box");
        div.innerHTML = `
            <h2>${item.nome}</h2>
            <br/>
            <img src="Imgs/items/${item.imagem}" alt="${item.nome}" class="float-start" />
            <p><strong>Descrição: </strong>${item.descricao}</p>
            <br/>
            <p><strong>Origem: </strong>${item.origem}</p>
            <br/>
            ${linkHTML}
        `;
        fragment.appendChild(div);
    }

    container.innerHTML = "";
    container.appendChild(fragment);

    atualizarPaginador();
}

let ordenada; let letraord = "";

async function CarregarPatrimonioFOrdenado(_letra) {
    
    const paginas = document.getElementById("pagina-atual").textContent.split(" - ");
    const paginaAtual = parseInt(paginas[0]);

    const container = document.getElementById("containerPF");
    const fragment = document.createDocumentFragment();

    const inicio = (paginaAtual - 1) * 3;
    const fim = Math.min(paginaAtual * 3, itensOrdenados.length);

    for (let i = inicio; i < fim; i++) {
        const item = itensOrdenados[i];
        const div = document.createElement("div");
        let linkHTML = "";

        if (item.referencia) {
            linkHTML = `<a href="${item.referencia}" target="_blank"><strong>Referência: </strong>${item.referencia}</a>`;
        } else {
            linkHTML = `<a href="#"><strong>Referência: </strong>N/A</a>`;
        }
        div.classList.add("shadow-box");
        div.innerHTML = `
            <h2>${item.nome}</h2>
            <br/>
            <img src="Imgs/items/${item.imagem}" alt="${item.nome}" class="float-start" />
            <p><strong>Descrição: </strong>${item.descricao}</p>
            <br/>
            <p><strong>Origem: </strong>${item.origem}</p>
            <br/>
            ${linkHTML}
        `;
        fragment.appendChild(div);
    }

    container.innerHTML = "";
    container.appendChild(fragment);

    atualizarPaginador();
}
function CarregarPatrimonioFOrdenadoMenu(letra) {
    ordenada = true;
    letraord = letra;
    itensOrdenados = itens.filter(item => item.nome[0].toLowerCase() === letra.toLowerCase());
    let totalPaginas = Math.ceil(itensOrdenados.length / 3);

    if (totalPaginas === 0) {
        document.getElementById("containerPF").innerHTML = `
    <div style="
        padding: 20px;
        background-color: #f8f9fa;
        border: 1px solid #ccc;
        border-radius: 8px;
        text-align: center;
        color: #555;
        font-size: 18px;
        font-style: italic;
    ">
        <p>Por agora, este fragmento da memória permanece em silêncio...</p>
    </div>
`;
        document.getElementById("pagina-atual").textContent = "0 - 0";
        return;
    } else if (totalPaginas === 1) {
        document.getElementById("pagina-atual").textContent = `1 - 1`;
        CarregarPatrimonioFOrdenado(letra);
    } else {
        document.getElementById("pagina-atual").textContent = `1 - ${totalPaginas}`;
        CarregarPatrimonioFOrdenado(letra);
    }
}

function Pesquisar() {

    playGif(document.getElementById("btnP"));

    const input = document.getElementById("barrapesquisa").value.toLowerCase();


    // Filtrar os itens pelo nome ou descrição
    const itensFiltrados = itens.filter(item =>
        item.nome.toLowerCase().includes(input)
    );

    // Guardar para usar na paginação
    itensOrdenados = itensFiltrados;
    ordenada = true;
    letraord = ""; // sem filtro por letra, apenas pesquisa

    const totalPaginas = Math.ceil(itensOrdenados.length / 3);

    if (totalPaginas === 0) {
        document.getElementById("containerPF").innerHTML = `
            <div style="
                padding: 20px;
                background-color: #f8f9fa;
                border: 1px solid #ccc;
                border-radius: 8px;
                text-align: center;
                color: #555;
                font-size: 18px;
                font-style: italic;
            ">
                <p>Por agora, este fragmento da memória permanece em silêncio...</p>
            </div>
        `;
        document.getElementById("pagina-atual").textContent = "0 - 0";
        return;
    }

    // Atualizar paginador
    document.getElementById("pagina-atual").textContent = `1 - ${totalPaginas}`;

    // Carregar a primeira página
    CarregarPatrimonioFOrdenado();
}
function keypress(event) {

    if (event.key === "Enter") {
        Pesquisar();
    }
}
function mudarPagina(direcao) {

    const paginas = document.getElementById("pagina-atual").textContent.split(" - ");
    let paginaAtual = parseInt(paginas[0], 10);
    const totalPaginas = parseInt(paginas[1], 10);
    if ((direcao === -1 && paginaAtual > 1) || (direcao === 1 && paginaAtual < totalPaginas)) {

        document.getElementById("pagina-atual").textContent = `${paginaAtual += direcao} - ${totalPaginas}`;

        if (ordenada) { CarregarPatrimonioFOrdenado(letraord); }
        else { CarregarPatrimonioF();}
    }
}
function atualizarPaginador() {
    const paginas = document.getElementById("pagina-atual").textContent.split(" - ");
    let paginaAtual = parseInt(paginas[0], 10);

    const totalPaginas = parseInt(paginas[1], 10);

    document.getElementById("anterior").disabled = (paginaAtual === 1);
    document.getElementById("seguinte").disabled = (paginaAtual === totalPaginas);
}

function abrirIntroducao() {
    FecharMain();
    document.getElementById("Introducao").style.display = "block";
}
function abrirJustificacao() {
    FecharMain();
    document.getElementById("Justificacao").style.display = "block";
}
function abrirDestaque() {
    FecharMain();
    document.getElementById("Destaque").style.display = "block";
}
async function abrirPatrimonioF() {
    FecharMain();
    document.getElementById("PatrimonioF").style.display = "block";

    await GetItens();
    letra = "";
    ordenada = false;
    document.getElementById("pagina-atual").textContent = `1 - ${Math.ceil(itens.length / 3)}`;

    CarregarPatrimonioF();
}

function abrirPatrimonioI() {
    FecharMain();
    document.getElementById("PatrimonioI").style.display = "block";
}
function abrirPatrimonioC() {
    FecharMain();
    document.getElementById("PatrimonioC").style.display = "block";
    Mapa();
}
function abrirVideos() {
    FecharMain();
    document.getElementById("Videos").style.display = "block";
}
function abrirPartilhe() {
    FecharMain();
    document.getElementById("Partilhe").style.display = "block";
}
function abrirPalavraE() {
    FecharMain();
    document.getElementById("PalavraE").style.display = "block";
    carregarRespostasPE();
}
function abrirPalavraP() {
    FecharMain();
    document.getElementById("PalavraP").style.display = "block";
}
function abrirPalavraA() {
    FecharMain();
    document.getElementById("PalavraA").style.display = "block";
    carregarRespostasPA();
}
function abrirRede() {
    FecharMain();
    document.getElementById("Rede").style.display = "block";
}
function abrirConclusao() {
    FecharMain();
    document.getElementById("Conclusao").style.display = "block";
}
function abrirFontes() {
    FecharMain();
    document.getElementById("Fontes").style.display = "block";
}
function abrirAutores() {
    FecharMain();
    document.getElementById("Autores").style.display = "block";
}

function playGif(button) {
    const img = button.querySelector("img");
    img.src = "/Imgs/lupa.gif";    // troca para o gif
    setTimeout(() => {
        img.src = "/Imgs/lupa.png"; // volta para a imagem estática após 1.5s
    }, 1060); // ajusta este tempo à duração do teu gif
}

