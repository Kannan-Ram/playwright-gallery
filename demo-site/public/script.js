// Form handling
document.getElementById('testForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const agree = document.getElementById('agree').checked;

    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Hide all messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    if (!name || !email || !agree) {
        errorMessage.style.display = 'block';
        return;
    }

    successMessage.style.display = 'block';

    // Reset form after 2 seconds
    setTimeout(() => {
        this.reset();
        successMessage.style.display = 'none';
    }, 2000);
});

// Button interactions
document.getElementById('clickButton').addEventListener('click', function() {
    document.getElementById('buttonMessage').textContent = 'Button clicked!';
});

document.getElementById('doubleClickButton').addEventListener('dblclick', function() {
    document.getElementById('buttonMessage').textContent = 'Button double-clicked!';
});

document.getElementById('rightClickButton').addEventListener('contextmenu', function(e) {
    e.preventDefault();
    document.getElementById('buttonMessage').textContent = 'Button right-clicked!';
});

// Modal
document.getElementById('openModalButton').addEventListener('click', function() {
    document.getElementById('modal').classList.add('active');
});

document.getElementById('closeModalButton').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('active');
});

// Click outside modal to close
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

// Dynamic content
document.getElementById('showContentButton').addEventListener('click', function() {
    const content = document.getElementById('hiddenContent');
    content.classList.toggle('hidden');
    this.textContent = content.classList.contains('hidden') ? 'Show Hidden Content' : 'Hide Content';
});

// Load more items
let itemCount = 3;
document.getElementById('loadMoreButton').addEventListener('click', function() {
    const itemList = document.getElementById('itemList');
    const loadingArea = document.getElementById('loadingArea');

    // Show loading
    loadingArea.classList.remove('hidden');
    this.disabled = true;

    // Simulate loading delay
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            itemCount++;
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = `Item ${itemCount}`;
            itemList.appendChild(card);
        }

        loadingArea.classList.add('hidden');
        this.disabled = false;
    }, 1000);
});

// Load data button
document.getElementById('loadDataButton').addEventListener('click', function() {
    alert('Data loaded successfully!');
});

// Delete button
document.getElementById('deleteButton').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete this item?')) {
        alert('Item deleted!');
    }
});

// Drag and drop
const draggable = document.getElementById('draggableItem');
const dropZone = document.getElementById('dropZone');

draggable.addEventListener('dragstart', function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    this.style.opacity = '0.4';
});

draggable.addEventListener('dragend', function() {
    this.style.opacity = '1';
});

dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.style.background = '#e8eaf6';
    return false;
});

dropZone.addEventListener('dragleave', function() {
    this.style.background = '';
});

dropZone.addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();

    const data = e.dataTransfer.getData('text/html');
    this.innerHTML = '<p style="color: #667eea; font-weight: 500;">✓ Item dropped successfully!</p>';
    this.style.background = '#d4edda';

    return false;
});

// Hover card message
const hoverCard = document.getElementById('hoverCard');
let originalText = hoverCard.textContent;

hoverCard.addEventListener('mouseenter', function() {
    this.textContent = 'You are hovering over me!';
    this.style.transform = 'scale(1.05)';
});

hoverCard.addEventListener('mouseleave', function() {
    this.textContent = originalText;
    this.style.transform = 'scale(1)';
});

// Table row clicks
const tableRows = document.querySelectorAll('table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('click', function() {
        tableRows.forEach(r => r.style.background = '');
        this.style.background = '#e8eaf6';
    });
});

// Console log for debugging
console.log('Playwright Demo Site loaded successfully!');
