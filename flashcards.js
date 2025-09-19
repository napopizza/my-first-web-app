// サーバーからデータを取得する関数を作成してください
async function fetchFlashcards() {
  try {
    const response = await fetch("/api/flashcards");
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function createFlashcardData(wordData) {
  try {
    const url = "/api/flashcards";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wordData),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function setupFlashcards() {
  // 暗記カード機能に必要な処理を作成してください
  const flashcardsList = document.getElementById("flashcards-list");
  const addWordBtn = document.querySelector(".add-word");
  const wordModal = document.getElementById("word-modal");
  const wordForm = document.getElementById("word-form");
  const cancelBtn = document.querySelector(".cancel-word");

  async function readFlashcards() {
    const wordList = await fetchFlashcards();
    renderFlashcards(wordList);
  }

  async function renderFlashcards(wordList) {
    flashcardsList.innerHTML = "";
    wordList.forEach((word) => {
      const flashcard = `
      <div class="flashcard">
        <div class="flashcard-content">
          <p class="flashcard-title">${word.word}</p>
          <div class="flashcard-icons">
            <button data-toggle="${word.id}" class="flashcard-meaning">
              <span class="ri-eye-line"></span>
            </button>
          </div>
        </div>
        <div data-meaning="${word.id}" class="hidden">
          <p class="flashcard-toggle">${word.meaning}</p>
        </div>
      </div>
      `;
      flashcardsList.innerHTML += flashcard;
    });
  }

  function toggleMeaning(id) {
    const meaningElement = document.querySelector(`[data-meaning="${id}"]`);

    if (meaningElement.classList.contains("hidden")) {
      meaningElement.classList.remove("hidden");
    } else {
      meaningElement.classList.add("hidden");
    }
  }
  function showModal() {
    wordModal.classList.remove("hidden");
    document.getElementById("word-input").focus();
  }
  function hideModal() {
    wordModal.classList.add("hidden");
    wordForm.reset();
  }

  async function save(event) {
    event.preventDefault();

    const wordInput = document.getElementById("word-input").value;
    const meaningInput = document.getElementById("meaning-input").value;

    const word = {
      id: Date.now(),
      word: wordInput.trim(),
      meaning: meaningInput.trim(),
    };
    await createFlashcardData(word);
    await readFlashcards();
    hideModal();
  }

  addWordBtn.addEventListener("click", showModal);
  cancelBtn.addEventListener("click", hideModal);
  wordForm.addEventListener("submit", save);
  wordModal.addEventListener("click", (event) => {
    if (event.target === wordModal) {
      hideModal();
    }
  });

  flashcardsList.addEventListener("click", (event) => {
    const btn = event.target.closest(".flashcard-meaning");
    if (btn) {
      const id = btn.getAttribute("data-toggle");
      toggleMeaning(id);
    } else {
      return;
    }
  });

  await readFlashcards();
}
