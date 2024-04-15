let currentPageUrl = 'https://rickandmortyapi.com/api/character';

window.onload = async () => {
  await loadCharacters(currentPageUrl);

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);

  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);

};

async function loadCharacters(url) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Limpa os resultados anteriores


  const response = await fetch(url);
  const responseJson = await response.json();

  responseJson.results.forEach((character) => {
    const card = document.createElement("div");
    card.style.backgroundImage = `url("https://rickandmortyapi.com/api/character/avatar/${character.url.replace(/\D/g, "")}.jpeg")`
    card.className = "cards"
    const characterNameBG = document.createElement("div")
    characterNameBG.className = "character-name-bg"
    const characterName = document.createElement("span")
    characterName.className = "character-name"
    characterName.innerText = `${character.name}`
    characterNameBG.appendChild(characterName)
    card.appendChild(characterNameBG)
    card.onclick = () => {
      const modal = document.getElementById("modal")
      modal.style.visibility = "visible"
      const modalContent = document.getElementById("modal-content")
      modalContent.innerHTML = ''

      const characterImage = document.createElement("div")
      characterImage.style.backgroundImage = `url("https://rickandmortyapi.com/api/character/avatar/${character.url.replace(/\D/g, "")}.jpeg")`
      characterImage.className = "character-image"

      const name = document.createElement("span")
      name.className = "character-details"
      name.innerText = `Nome: ${character.name}`

      const species = document.createElement("span")
      species.className = "character-details"
      species.innerText = `Espécie: ${convertSpecies(character.species)}`

      const gender = document.createElement("span")
      gender.className = "character-details"
      gender.innerText = `Gênero: ${convertGender(character.gender)}`

      modalContent.appendChild(characterImage)
      modalContent.appendChild(name)
      modalContent.appendChild(species)
      modalContent.appendChild(gender)
    }
    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(card);

    url = currentPageUrl


  });

  // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');
  const firtButton = document.getElementById('firt-page');

  nextButton.info = !responseJson.next;
  backButton.info = !responseJson.previous;


  if (couter >= 2) {
    backButton.style.visibility = "visible"
    firtButton.style.visibility = "visible"
    firtButton.addEventListener('click', () => {
      location.reload()
    })
  }
  if (couter == 1) {
    backButton.style.visibility = "hidden"
    firtButton.style.visibility = "hidden"
  }

  if (couter == 42) {
    nextButton.style.visibility = "hidden"
  }
  if (couter <= 41) {
    nextButton.style.visibility = "visible"
  }


}

function hideModal() {
  const modal = document.getElementById("modal")
  modal.style.visibility = "hidden"
}


let couter = 1
async function loadNextPage() {
  if (!currentPageUrl) return;
  const response = await fetch(currentPageUrl);
  const responseJson = await response.json();

  couter++
  await loadCharacters(`https://rickandmortyapi.com/api/character/?page=${couter}`);

}



async function loadPreviousPage() {

  const response = await fetch(currentPageUrl);
  const responseJson = await response.json();
  console.log('tchal')

  couterFunctiun = couter--
  await loadCharacters(`https://rickandmortyapi.com/api/character/?page=${couter}`);

}

function convertGender(gender) {
  const genero = {
    male: "Homem",
    female: "Mulher",
    genderless: "Sem genero",
    unknown: "Desconhecido"
  };

  return genero[gender.toLowerCase() || gender];
}


function convertSpecies(species) {
  const especie = {
    human: "Humano",
    alien: "Alien",
    humanoid: "humanoide",
    MythologicalCreature: "Criatura mitologica",
    unknown: "Desconhecido"
  };

  return especie[species.toLowerCase() || species];
}
