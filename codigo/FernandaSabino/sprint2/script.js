document.addEventListener('DOMContentLoaded', () => {
    const categoryForm = document.getElementById('categoryForm');
    const categoryList = document.getElementById('categoryList');
    
    // Carregar categorias do Local Storage
    const loadCategories = () => {
      const categories = JSON.parse(localStorage.getItem('categories')) || [];
      categoryList.innerHTML = '';
      categories.forEach((category, index) => {
        categoryList.innerHTML += `
          <tr>
            <td>${category.name}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editCategory(${index})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deleteCategory(${index})">Excluir</button>
            </td>
          </tr>
        `;
      });
    };
    
    // Salvar categoria no Local Storage
    const saveCategory = (category) => {
      const categories = JSON.parse(localStorage.getItem('categories')) || [];
      categories.push(category);
      localStorage.setItem('categories', JSON.stringify(categories));
      loadCategories();
    };
    
    // Editar categoria no Local Storage
    const updateCategory = (index, updatedCategory) => {
      const categories = JSON.parse(localStorage.getItem('categories'));
      categories[index] = updatedCategory;
      localStorage.setItem('categories', JSON.stringify(categories));
      loadCategories();
    };
    
    // Deletar categoria do Local Storage
    const deleteCategory = (index) => {
      const categories = JSON.parse(localStorage.getItem('categories'));
      categories.splice(index, 1);
      localStorage.setItem('categories', JSON.stringify(categories));
      loadCategories();
    };
    
    // Manipular o envio do formulário
    categoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('categoryName').value;
      
      const editingIndex = categoryForm.getAttribute('data-editing-index');
      if (editingIndex !== null) {
        updateCategory(editingIndex, { name });
        categoryForm.removeAttribute('data-editing-index');
        categoryForm.querySelector('button[type="submit"]').textContent = 'Adicionar Categoria';
      } else {
        saveCategory({ name });
      }
      
      categoryForm.reset();
    });
  
    // Editar categoria
    window.editCategory = (index) => {
      const categories = JSON.parse(localStorage.getItem('categories'));
      const category = categories[index];
      document.getElementById('categoryName').value = category.name;
      categoryForm.setAttribute('data-editing-index', index);
      categoryForm.querySelector('button[type="submit"]').textContent = 'Atualizar Categoria';
    };
  
    // Deletar categoria
    window.deleteCategory = deleteCategory;
    
    // Carregar categorias ao iniciar
    loadCategories();
  });
  