document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const toggleBtn = document.getElementById('toggle-btn');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('sidebar-closed');
        content.classList.toggle('content-expanded');
    });
    fetchUserData();
});

function fetchUserData() {
    const tableBody = document.getElementById('userdata');
    

    fetch('https://dummyjson.com/users') 
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data); 

            const users = data.users; 
            users.slice(0, 30).forEach(user => { 
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>${user.role}</td>
                    <td>${user.phone}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editRow(this)">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteRow(this)">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching user data', error);
          
        });
}

function editRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td:not(:last-child)'); 

    if (button.textContent === 'Edit') {
        cells.forEach(cell => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = cell.textContent;
            cell.innerHTML = '';
            cell.appendChild(input);
        });
        button.textContent = 'Save';
    } else {
        cells.forEach(cell => {
            const input = cell.querySelector('input');
            cell.textContent = input.value;
        });
        button.textContent = 'Edit';
    }
}
function deleteRow(button) {
    const row = button.closest('tr');
    row.parentNode.removeChild(row);
}