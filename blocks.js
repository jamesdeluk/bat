document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById('grid-container');
    const toggleButton = document.getElementById('toggleButton');
    const gridSizeButton = document.getElementById('gridSizeButton');
    const illusionButton = document.getElementById('illusionButton');
    const colours1_10 = [[0, 255, 0], [0, 225, 45], [0, 195, 75], [0, 165, 105], [0, 135, 135], [0, 105, 165], [0, 75, 195], [0, 45, 225], [0, 0, 255], [45, 0, 225], [75, 0, 195], [105, 0, 165], [135, 0, 135], [165, 0, 105], [195, 0, 75], [225, 0, 45], [255, 0, 0]];
    const colours2_10 = [[160, 255, 56], [90, 255, 56], [56, 255, 92], [56, 255, 163], [56, 255, 233], [56, 207, 255], [56, 137, 255], [56, 66, 255], [116, 56, 255], [186, 56, 255], [255, 56, 254], [255, 56, 183], [255, 56, 113], [255, 69, 56], [255, 139, 56], [255, 209, 56], [230, 255, 56]];
    const colours1_12 = [[0, 255, 0], [0, 239, 22], [0, 222, 44], [0, 204, 66], [0, 185, 87], [0, 165, 108], [0, 144, 129], [0, 122, 150], [0, 99, 171], [0, 75, 192], [0, 51, 213], [0, 26, 234], [0, 0, 255], [24, 0, 236], [48, 0, 216], [71, 0, 196], [94, 0, 175], [117, 0, 153], [140, 0, 130], [163, 0, 106], [186, 0, 81], [209, 0, 55], [232, 0, 28], [255, 0, 0]];
    const colours2_12 = [[160, 255, 56], [135, 255, 56], [110, 255, 56], [90, 255, 56], [73, 255, 74], [56, 255, 92], [56, 255, 128], [56, 255, 163], [56, 255, 198], [56, 255, 233], [56, 231, 255], [56, 207, 255], [56, 172, 255], [56, 137, 255], [56, 101, 255], [56, 66, 255], [86, 56, 255], [116, 56, 255], [151, 56, 255], [186, 56, 255], [220, 56, 255], [255, 56, 254], [255, 56, 183], [255, 56, 113]];
    const rampColours1 = ['#FFFFFF', '#CDCDCD', '#9B9B9B', '#696969', '#373737', '#050505'];
    let currentColoursIndex = 0;
    let coloursArray1 = [colours1_10, colours2_10, rampColours1];
    let coloursArray2 = [colours1_12, colours2_12, rampColours1];
    let coloursArray = coloursArray1;
    let colours = coloursArray[currentColoursIndex];
    let repeat = true;
    let illusion = false;
    let gridSize = 10; // Initial grid size
    const blockSize = 6; // Number of cells per colour block

    const cellStates = {}; // Store the state of each cell

    function calculateElapsedMinutes() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const elapsedMinutes = gridSize === 10 ? (hours - 6) * 60 + minutes : (hours) * 60 + minutes;
        console.log(elapsedMinutes);
        return elapsedMinutes;
    }

    function getColourForCell(index) {
        if (colours.length != 6) {
            const colourIndex = Math.floor(index / blockSize) % colours.length;
            const [r, g, b] = colours[colourIndex];
            return `rgb(${r},${g},${b})`;
        } else {
            const colourIndex = index % blockSize;
            return colours[colourIndex];
        }
    }

    function updateGrid() {
        gridContainer.style.setProperty('--grid-size', gridSize);
        const elapsedMinutes = calculateElapsedMinutes();
        const totalCells = gridSize * gridSize;
        const filledCells = Math.min(Math.floor(elapsedMinutes / 10), totalCells)+1;
        let celln = 0

        gridContainer.innerHTML = ''; // Clear previous grid

        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement('div');
            row.classList.add('grid-row');
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                if (celln%6 == 0) {
                    cell.innerText = gridSize === 10 ? Math.floor(celln*10/60)+6 : Math.floor(celln*10/60);
                }
                cell.classList.add('grid-cell');
                if (illusion) {
                    cell.classList.add('border-radius');
                }
                const cellIndex = i * gridSize + j;
                if (cellIndex < filledCells && !cellStates[cellIndex]) {
                    const colour = getColourForCell(cellIndex);
                    cell.style.backgroundColor = colour;
                }
                if (cellStates[cellIndex]) {
                    cell.classList.add('black');
                }
                cell.addEventListener('click', function () {
                    cell.classList.toggle('black');
                    cellStates[cellIndex] = !cellStates[cellIndex];
                });
                row.appendChild(cell);
                celln += 1;
            }
            gridContainer.appendChild(row);
        }
    }

    toggleButton.addEventListener('click', function () {
        currentColoursIndex = (currentColoursIndex + 1) % coloursArray.length;
        colours = coloursArray[currentColoursIndex];
        updateGrid();
    });

    gridSizeButton.addEventListener('click', function () {
        gridSize = gridSize === 10 ? 12 : 10;
        coloursArray = gridSize === 10 ? coloursArray1 : coloursArray2;
        currentColoursIndex = (currentColoursIndex) % coloursArray.length;
        colours = coloursArray[currentColoursIndex];
        const h1 = document.getElementById('blocks-h1');
        h1.innerHTML = gridSize === 10 ? "100 Blocks a Day" : "144 Blocks a Day";
        const text = document.getElementById('text');
        const text10 = "Each block represents 10 minutes.<br/>There are 100 blocks in total, representing 1000 minutes, or 16 hours 40 minutes.<br/>The numbers are the hour. The grid starts at 6AM and finishes at 10:40PM."
        const text12 = "Each block represents 10 minutes.<br/>There are 144 blocks in total, representing 1440 minutes, or 24 hours.<br/>The numbers are the hour. The grid covers midnight to midnight."
        text.innerHTML = gridSize === 10 ? text10 : text12;
        updateGrid();
    });

    illusionButton.addEventListener('click', function() {
        illusion = !illusion;
        updateGrid();
    });

    setInterval(updateGrid, 60000);

    updateGrid();
});