let primes = [],
    currentPage, numPages;

// Sieve of Eratosthenes
function sieve(minNumber, maxNumber) {
    primes = [];
    let numbers = [];

    //Get all numbers from 2 to max input
    for (var i = 2; i < maxNumber / 2; i++) {
        if (numbers[i]) {
            continue;
        }

        //Mark multiplications as true
        for (var j = 2 * i; j <= maxNumber; j += i) {
            numbers[j] = true;
        }
    }

    //Push all numbers that were not marked to primes array
    for (var k = 2; k <= maxNumber; k++) {
        if (!numbers[k] && k > minNumber) primes.push(k);
    }
    return primes;
}

function getPrimes() {

    //Collect input data
    let minNumber = Number(document.getElementById('minNumber').value);
    let maxNumber = Number(document.getElementById('maxNumber').value);
    let recordsPerPage = document.getElementById('recordsPerPage').value;

    const container = document.getElementById('primes');
    const pagination = document.getElementById('pagination');
    console.log(maxNumber);

    //currentPage is not defined on 1st search - get default value = 1
    if (!currentPage) {
        currentPage = 1;
    }

    //Special value for displaying all results on page
    if (recordsPerPage == "all") {
        currentPage = 1
        recordsPerPage = primes.length;
    }

    //Input validation
    if (maxNumber > 100000) {
        container.innerHTML = "<div class='validation-text'>Górny zakres nie może być większy od 100000</div>"
    } else if (maxNumber < 3) {
        container.innerHTML = "<div class='validation-text'>Górny zakres nie może mieć wartości mniejszej od 3</div>"
    } else if (maxNumber < minNumber) {
        container.innerHTML = "<div class='validation-text'>Górny zakres nie może być mniejszy od dolnego</div>"
    } else if (minNumber < 2) {
        container.innerHTML = "<div class='validation-text'>Dolny zakres nie może mieć wartości mniejszej od 2</div>"
    } else if (Number(currentPage) > numPages) {
        container.innerHTML = "<div class='validation-text'>Żądana strona jest za wysoka</div>"
    } else {
        sieve(minNumber, maxNumber);
        displayResults(container, recordsPerPage, primes);
        createPagination(currentPage, numPages, primes);
    }
}

function displayResults(container, recordsPerPage, primes) {

    //Count pages for data pagination
    numPages = countPages();

    function countPages() {
        return Math.ceil(primes.length / recordsPerPage);
    }

    //Variable to be displayed in HTML
    let primesResult = "<table class='table-fill'><tr><th>Index</th><th>Liczba pierwsza</th></tr>";

    //Loop through all records that should be shown on requested page
    for (var i = (currentPage * recordsPerPage) - recordsPerPage; i < currentPage * recordsPerPage; i++) {
        if (primes[i]) {
            primesResult += "<tr>";
            primesResult += "<td>" + (i + 1) + "</td>";
            primesResult += "<td>" + primes[i] + "</td>";
            primesResult += "</tr>";
        }
    }
    primesResult += "</table>";
    container.innerHTML = primesResult;
}

//Creating buttons for pagination to be displayed
function createPagination() {
    var paginationResult = '';

    (function previous() {
        paginationResult += "<div class='button' id='previousPageButton' onclick='prevPage()'>&lt;</div >";
    })();
    (function first() {
        if (!currentPage == 1 || currentPage > 3) {
            paginationResult += "<div class='button' onclick='changePage(this)' data-value='1'>1</div>";
        }
    })();
    (function hiddenPagesStart() {
        if (currentPage > 3) {
            paginationResult += "<div class='button'>...</div>";
        }
    })();
    (function pager1() {
        if (currentPage > 2) {
            paginationResult += "<div class='button' onclick='changePage(this)' data-value='" + (currentPage - 2) + "'>" + (currentPage - 2) + "</div>";
        }
    })();
    (function pager2() {
        if (currentPage > 1) {
            paginationResult += "<div class='button' onclick='changePage(this)' data-value='" + (currentPage - 1) + "'>" + (currentPage - 1) + "</div>";
        }
    })();
    (function current() {
        paginationResult += "<div class='button focused'>" + currentPage + "</div >";
    })();
    (function pager3() {
        if ((numPages - currentPage) > 2) {
            paginationResult += "<div class='button' onclick='changePage(this)' data-value='" + (currentPage + 1) + "'>" + (currentPage + 1) + "</div>";
        }
    })();
    (function pager4() {
        if ((numPages - currentPage) > 1) {
            paginationResult += "<div class='button' onclick='changePage(this)' data-value='" + (currentPage + 2) + "'>" + (currentPage + 2) + "</div>";
        }
    })();
    (function hiddenPagesEnd() {
        if ((numPages - currentPage) > 3) {
            paginationResult += "<div class='button'>...</div >";
        }
    })();
    (function last() {
        if (currentPage !== numPages) {
            paginationResult += "<div class='button' onclick='changePage(this)' data-value='" + (numPages) + "'>" + (numPages) + "</div>";
        }
    })();
    (function next() {
        paginationResult += "<div class='button buttonLast' id='nextPageButton' onclick='nextPage()'>&gt;</div>";
    })();
    (function input() {
        paginationResult += "<br><input id='pageInput'  min='1' max='1000' required value='" + currentPage + "'>"
        paginationResult += "<br><div class='button' id='confirmButton' onclick='changePage(this)'>Przejdź do strony</div>";
    })();

    pagination.innerHTML = paginationResult;
}

//Action handlers
function clearResults() {
    document.getElementById('primes').innerHTML = "";
    document.getElementById('pagination').innerHTML = "";
    currentPage = 0;

}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        getPrimes();
    }
}

function nextPage() {
    if (currentPage < numPages) {
        currentPage++;
        getPrimes();
    }
}

function changeRecordsPerPage() {
    currentPage = 1;
    getPrimes();
}

function clearViewedPage() {
    currentPage = 1;
}

function changePage(page) {
    if (page.id == "confirmButton") {
        currentPage = Number(document.getElementById('pageInput').value);
    } else {
        currentPage = Number(page.dataset.value);
    }
    getPrimes();
}
