document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const emailInput = document.getElementById("email");
  const descriptionInput = document.getElementById("description");
  const categoryButton = document.querySelector(".paste-button .button");
  const dropdownContent = document.querySelector(".dropdown-content");
  const submitButton = document.querySelector('.form button[type="submit"]');

  let selectedCategory = "";

  // Dropdown functionality
  document
    .querySelector(".paste-button .button")
    .addEventListener("click", (e) => {
      e.preventDefault();
      dropdownContent.style.display = "block";
    });

  dropdownContent.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      selectedCategory = e.target.textContent;
      categoryButton.textContent = selectedCategory;
      dropdownContent.style.display = "none";
    }
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".paste-button")) {
      dropdownContent.style.display = "none";
    }
  });

  // CRUD functionality
  const newsList = JSON.parse(localStorage.getItem("newsList")) || [];

  const renderNewsList = () => {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = "";
    newsList.forEach((news, index) => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");
      newsItem.innerHTML = `
        <div>
          <strong>Email:</strong> ${news.email} <br>
          <strong>Categoria:</strong> ${news.category} <br>
          <strong>Descrição:</strong> ${news.description}
        </div>
        <button class="edit-button" data-index="${index}">Editar</button>
        <button class="delete-button" data-index="${index}">Deletar</button>
      `;
      newsContainer.appendChild(newsItem);
    });
  };

  const clearForm = () => {
    emailInput.value = "";
    descriptionInput.value = "";
    categoryButton.textContent = "Categoria";
    selectedCategory = "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const description = descriptionInput.value;

    if (email && description && selectedCategory) {
      newsList.push({ email, category: selectedCategory, description });
      localStorage.setItem("newsList", JSON.stringify(newsList));
      renderNewsList();
      clearForm();
    } else {
      alert("Por favor, preencha todos os campos e selecione uma categoria.");
    }
  });

  document.getElementById("newsContainer").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      const index = e.target.dataset.index;
      newsList.splice(index, 1);
      localStorage.setItem("newsList", JSON.stringify(newsList));
      renderNewsList();
    }

    if (e.target.classList.contains("edit-button")) {
      const index = e.target.dataset.index;
      const news = newsList[index];
      emailInput.value = news.email;
      descriptionInput.value = news.description;
      categoryButton.textContent = news.category;
      selectedCategory = news.category;
      newsList.splice(index, 1);
      localStorage.setItem("newsList", JSON.stringify(newsList));
      renderNewsList();
    }
  });

  renderNewsList();
});
