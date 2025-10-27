let listData = [];

let sortColumnFlag = 'fio';

let sortDirection = 1;
 
const $app = document.getElementById('app'),
        $addForm = document.getElementById('add-form'),
        $nameInp = document.getElementById('add-form__name-inp'),
        $surenameInp = document.getElementById('add-form__surename-inp'),
        $lastnameInp = document.getElementById('add-form__lastname-inp'),
        $ageInp = document.getElementById('add-form__age-inp'),
        $hobbyInp = document.getElementById('add-form__hobby-inp'), 
        $sortFIOBtn = document.getElementById('sort__fio'), 
        $sortAgeBtn = document.getElementById('sort__age'),


        
        $filterForm = document.getElementById('filter-form'),
        $fioFilterInp = document.getElementById('filter-form__fio-inp'),
        $hobbyFilterInp = document.getElementById('filter-form__hobby-inp'),



        $table = document.createElement('table'),
        $tableHead = document.createElement('thead'),
        $tableBody = document.createElement('tbody'),
    


        $tableHeadTr = document.createElement('tr'),
        $tableBodyThFIO = document.createElement('th'),
        $tableBodyThAge = document.createElement('th'),
        $tableBodyThBIrthYear = document.createElement('th'),
        $tableBodyThHobby = document.createElement('th');



        $tableBodyThFIO.textContent = 'ФИО';
        $tableBodyThAge.textContent = 'ВОЗРАСТ';
        $tableBodyThBIrthYear.textContent = 'ГОД РОЖДЕНИЯ';
        $tableBodyThHobby.textContent = 'Хобби';



        $tableHeadTr.append($tableBodyThFIO)
        $tableHeadTr.append($tableBodyThAge)
        $tableHeadTr.append($tableBodyThBIrthYear)
        $tableHeadTr.append($tableBodyThHobby)


        $table.append($tableHead)
        $table.append($tableBody)
        $app.append($table)

        $table.classList.add('table', 'table-dark')


function createUserTr(oneUser) {
    const $userTr = document.createElement('tr'),
        $userFIO = document.createElement('th'),
        $userAge = document.createElement('th'),
        $userBirthYear = document.createElement('th'),
        $userHobby = document.createElement('th');


        $userFIO.textContent = oneUser.fio,
        $userAge.textContent = oneUser.age,
        $userBirthYear.textContent = oneUser.birthYear,
        $userHobby.textContent = oneUser.hobby;


        $userTr.append($userFIO)
        $userTr.append($userAge)
        $userTr.append($userBirthYear)
        $userTr.append($userHobby)
        $tableBody.append($userTr)

        return $userTr
}




function render(arrData) {
    $tableBody.innerHTML = '';

    let copyListData = [...arrData];

    for (const oneUser of copyListData) {
        oneUser.fio = oneUser.lastname + ' ' + oneUser.name + ' ' + oneUser.surename;
        oneUser.birthYear = 2024 - oneUser.age;
    }

    copyListData = copyListData.sort(function (a, b) {
        let comparison = 0;

        if (sortColumnFlag === 'age') {
            comparison = a.age - b.age;
        } else {
            const fioA = a[sortColumnFlag].toLowerCase();
            const fioB = b[sortColumnFlag].toLowerCase();

            if (fioA < fioB) comparison = -1;
            if (fioA > fioB) comparison = 1;
        }

        return comparison * sortDirection; 
    });

    if ($fioFilterInp.value.trim() !== "") {
        const filterValue = $fioFilterInp.value.trim().toLowerCase(); 
        copyListData = copyListData.filter(function(oneUser) {
            return oneUser.fio.toLowerCase().includes(filterValue); 
        });
    }

    if ($hobbyFilterInp.value.trim() !== "") {
        const filterValue = $hobbyFilterInp.value.trim().toLowerCase();
        copyListData = copyListData.filter(function(oneUser) {
            return oneUser.hobby.toLowerCase().includes(filterValue); 
        });
    }

    for (const oneUser of copyListData) {
        const $newTr = createUserTr(oneUser);
        $tableBody.append($newTr);
    }
}


render(listData)



$addForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if ($nameInp.value.trim() == "") {
        alert('Имя не введено!')
        return
    }

    if ($surenameInp.value.trim() == "") {
        alert('Отчество не введено')
        return;
    }

    if ($lastnameInp.value.trim() == "") {
        alert('Фамилия не введена')
        return;
    }

    if ($ageInp.value.trim() == "") {
        alert('Возраст не указан')
        return;
    }

   
    listData.push({
        name: $nameInp.value,
        surename: $surenameInp.value.trim(),
        lastname: $lastnameInp.value.trim(),
        age: parseInt($ageInp.value.trim()),
        hobby: $hobbyInp.value.trim()

    })
    render(listData)
    $addForm.reset();
})


$sortFIOBtn.addEventListener('click', function () {
    if (sortColumnFlag === 'fio') {
        sortDirection *= -1; // Reverse sorting direction
    } else {
        sortColumnFlag = 'fio';
        sortDirection = 1; // Set to ascending for new column
    }
    render(listData);
});

$sortAgeBtn.addEventListener('click', function () {
    if (sortColumnFlag === 'age') {
        sortDirection *= -1; 
    } else {
        sortColumnFlag = 'age';
        sortDirection = 1; 
    }
    render(listData);
});


$filterForm.addEventListener('submit', function(event) {
    event.preventDefault();
})


$fioFilterInp.addEventListener('input', function() {
    render(listData)
})

$hobbyFilterInp.addEventListener('input', function() {
    render(listData)
})

