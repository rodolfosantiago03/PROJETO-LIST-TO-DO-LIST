// 1. Seleção dos elementos
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Carregar tarefas ao abrir o site
document.addEventListener('DOMContentLoaded', carregarTarefas);

// 2. Função para criar o elemento na tela (Refatorada para ser reutilizada)
function criarElementoTarefa(taskText) {
    const li = document.createElement('li');

    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Excluir</button>
    `;

    // Evento para marcar como concluída
    li.querySelector('span').addEventListener('click', function() {
        this.parentElement.classList.toggle('completed');
    });

    // Evento para excluir a tarefa
    li.querySelector('.delete-btn').addEventListener('click', function() {
        removerDoLocal(taskText);
        li.remove();
    });

    taskList.appendChild(li);
}

// 3. Função para adicionar tarefas (Botão e Enter)
function addTask() {
    const taskText = taskInput.value.trim(); // Correção: .value.trim()

    if (taskText !== "") {
        criarElementoTarefa(taskText); // Cria na tela
        salvarNoLocal(taskText);       // Salva no storage

        taskInput.value = "";
        taskInput.focus();
    } else {
        alert("Digite sua tarefa!");
    }
}

// Eventos de clique e teclado
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// --- LocalStorage ---

function salvarNoLocal(tarefa) {
    let tarefas = localStorage.getItem('tarefas') === null 
        ? [] 
        : JSON.parse(localStorage.getItem('tarefas'));

    tarefas.push(tarefa);
    // Correção: Usar setItem para salvar
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    let tarefas = localStorage.getItem('tarefas') === null 
        ? [] 
        : JSON.parse(localStorage.getItem('tarefas'));

    tarefas.forEach(tarefa => {
        criarElementoTarefa(tarefa);
    });
}

function removerDoLocal(textoDaTarefa) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas'));
    const tarefasFiltradas = tarefas.filter(t => t !== textoDaTarefa);
    // Correção: Usar setItem para atualizar a lista
    localStorage.setItem('tarefas', JSON.stringify(tarefasFiltradas));
}