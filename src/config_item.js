const typeSelect = document.getElementById('type');
const nameInput = document.getElementById('name');
const timeInput = document.getElementById('time');
const localInput = document.getElementById('local');
const notesInput = document.getElementById('notes');
const createButton = document.querySelector('button');

function validateForm() {
  if (typeSelect.value === 'default') {
    alert('Por favor, selecione o tipo do item.');
    return false;
  }
  if (!nameInput.value.trim()) {
    alert('Por favor, preencha o nome do item.');
    return false;
  }
  if (!timeInput.value) {
    alert('Por favor, preencha o horário do item.');
    return false;
  }
  return true;
}

function sendFormData(event) {
  event.preventDefault(); 

  if (!validateForm()) return;

  const formData = {
    type: typeSelect.value,
    name: nameInput.value,
    time: timeInput.value,
    local: localInput.value,
    notes: notesInput.value,
  };

  console.log('Dados do formulário:', formData);
}

createButton.addEventListener('click', sendFormData);
