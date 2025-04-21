let todosOsPaises = [];

async function buscarPaises() {
  try {
    const resposta = await fetch('https://restcountries.com/v3.1/all');
    const dados = await resposta.json();
    todosOsPaises = dados;
    mostrarPaises(dados);
  } catch (erro) {
    console.log('Erro ao buscar países:', erro);
  }
}

function mostrarPaises(lista) {
  const container = document.getElementById('paises');
  container.innerHTML = '';

  const modelo = document.getElementById('modelo-pais').firstElementChild;

  for (let i = 0; i < lista.length; i++) {
    const pais = lista[i];

    let nome;
    if (pais.name && pais.name.common) {
      nome = pais.name.common;
    } else {
      nome = 'Desconhecido';
    }

    let capital;
    if (pais.capital && pais.capital.length > 0) {
      capital = pais.capital[0];
    } else {
      capital = 'Sem capital';
    }

    let regiao;
    if (pais.region) {
      regiao = pais.region;
    } else {
      regiao = 'Sem região';
    }

    let idiomas;
    if (pais.languages) {
      idiomas = Object.values(pais.languages).join(', ');
    } else {
      idiomas = 'Sem idiomas';
    }

    let bandeira;
    if (pais.flags && pais.flags.png) {
      bandeira = pais.flags.png;
    } else {
      bandeira = '';
    }

    const clone = modelo.cloneNode(true);
    clone.querySelector('.nome').textContent = nome;
    clone.querySelector('.capital').textContent = `Capital: ${capital}`;
    clone.querySelector('.regiao').textContent = `Região: ${regiao}`;
    clone.querySelector('.idiomas').textContent = `Idiomas: ${idiomas}`;
    clone.querySelector('.bandeira').src = bandeira;
    clone.querySelector('.bandeira').alt = `Bandeira de ${nome}`;

    container.appendChild(clone);
  }
}

document.getElementById('btnBusca').addEventListener('click', () => {
  const textoBusca = document.getElementById('txtBusca').value.trim().toLowerCase();

  if (textoBusca === '') {
    mostrarPaises(todosOsPaises);
    return;
  }

  const filtrados = todosOsPaises.filter(pais => {
    let nome = '';
    if (pais.name && pais.name.common) {
      nome = pais.name.common.toLowerCase();
    }

    let capital = '';
    if (pais.capital && pais.capital.length > 0) {
      capital = pais.capital[0].toLowerCase();
    }

    let regiao = '';
    if (pais.region) {
      regiao = pais.region.toLowerCase();
    }

    let idiomas = '';
    if (pais.languages) {
      idiomas = Object.values(pais.languages).join(', ').toLowerCase();
    }

    return (
      nome.includes(textoBusca) || capital.includes(textoBusca) || regiao.includes(textoBusca) || idiomas.includes(textoBusca)
    );
  });

  mostrarPaises(filtrados);
});

document.getElementById('txtBusca').addEventListener('keydown', function(evento) {
  if (evento.key === 'Enter') {
    document.getElementById('btnBusca').click();
  }
});

buscarPaises();