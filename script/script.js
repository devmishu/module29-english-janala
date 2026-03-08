

function init() {
    loadLesson();
}


const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayData(data))
}

const displayData = (datas) => {
    const lessons = datas.data;
    const lessonContainerElement = document.getElementById('lesson-container');
    lessonContainerElement.innerHTML = '';

    lessons.forEach(lesson => {
        const lessonElement = document.createElement('button');
        lessonElement.id = `lesson${lesson.level_no}`;

        lessonElement.classList.add('btn', 'btn-outline', 'btn-primary', 'lesson-button');
        lessonElement.addEventListener('click', () => {
            loadLevelWord(lesson.level_no)

            removeActiveClass();

            const selectedLesson = document.getElementById(`lesson${lesson.level_no}`);
            selectedLesson.classList.add('active');
        });

        lessonElement.innerHTML = `
            <i class="fa-solid fa-book-open"></i>
             Lesson - ${lesson.level_no}
        `;

        lessonContainerElement.append(lessonElement);

    });

}

const loadLevelWord = (id) => {
    const URL = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => displayLevelWord(data))
}

const displayLevelWord = (data) => {
    const levelWordContainerElement = document.getElementById('level-word-container');

    levelWordContainerElement.innerHTML = "";

    const wordsContainer = document.createElement('div');
    wordsContainer.classList.add('grid', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-10');




    const words = data.data;
    console.log(words);
    if (words.length !== 0) {
        words.forEach(word => {
            const card = document.createElement('div');
            card.classList.add('bg-white', 'p-10', 'text-center', 'space-y-6', 'rounded-sm');

            card.innerHTML = `
           
                <h3 class="text-3xl font-bold ">${word.word ? word.word : 'word not abileabile'}</h3>

                <p class="text-xl  font-medium">Meaning / Pronounciation</p>
                <h3 class="text-3xl text-gray-700 font-bold font-bangla">${word.meaning ? word.meaning : 'word mening not abileabile'} / ${word.pronunciation ? word.pronunciation : 'pronunciation not abileabile'}</h3>

                <div class="flex items-center justify-between  mt-20">
                    <div class="bg-blue-100 p-3 rounded-sm ">
                        <i onclick="loadWordDelail(${word.id})" class="fa-solid fa-circle-info text-2xl hover:cursor-pointer"></i>
                    </div>
                    
                    <div class="bg-blue-100 p-3 rounded-sm ">
                        <i class="fa-solid fa-volume-high text-2xl hover:cursor-pointer"></i>
                    </div>
                </div>
           
        `;



            wordsContainer.append(card);

        });
    } else {
        // const noWord = document.createElement('div');
        levelWordContainerElement.innerHTML = `
            <div class="flex flex-col items-center justify-center space-y-4">
            <i class="fa-solid fa-triangle-exclamation text-7xl text-gray-400"></i>
                <p class="bangla-font font-medium ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h3 class="bangla-font text-3xl font-semibold ">নেক্সট Lesson এ যান</h3>
            </div>
        `
    }

    levelWordContainerElement.append(wordsContainer);

}

// remove active all button
const removeActiveClass = () => {
    const lessonButtons = document.querySelectorAll('.lesson-button');
    lessonButtons.forEach(btn => {
        btn.classList.remove('active');
    });
}


const loadWordDelail = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/word/${id}`

    const res = await fetch(URL)
    const detali = await res.json();
    displayWordDelail(detali.data)
}


const displayWordDelail = (data) => {
    console.log(data);
    const modalDetailContainerElement = document.getElementById('modal-detail-container');

    modalDetailContainerElement.innerHTML = `
        <h3 class="text-2xl font-bold mb-5">${data.word ? data.word : 'word not abileabile'} <span
                            class="font-bangla">(<i class="fa-solid fa-microphone-lines"></i>:${data.pronunciation ?
            data.pronunciation : 'pronunciation not abileabile'} )</span></h3>

                    <p class="text-xl  font-medium">Meaning</p>
                    <p class="text-xl  font-medium font-bangla mb-5">${data.meaning ? data.meaning : 'word mening notabileabile'}</p>

                    <p class="text-xl  font-medium"> Example</p>
                    <p> ${data.sentence}</p>

                    <p class="font-bangla mt-5 text-xl text-black">সমার্থক শব্দ গুলো</p>

                    <div class="flex flex-wrap gap-4">
                        ${data.synonyms && data.synonyms.length > 0
            ? data.synonyms.map(syn => `<button class="btn">${syn}</button>`).join('')
            : '<p>No synonyms available</p>'
        }
    </div>


             <p class="py-4">Press ESC key or click the button below to close</p>

        `
    const myModal = document.getElementById('my_modal').showModal();

}


// fetch all word
const fetchAllWord = async () => {
    let res = await fetch("https://openapi.programming-hero.com/api/words/all");
    let data = await res.json();
};

document.getElementById("search-btn").addEventListener("click", async (e) => {
    const levelWordContainerElement = document.getElementById('level-word-container');

    levelWordContainerElement.innerHTML = "";

    const wordsContainer = document.createElement('div');
    wordsContainer.classList.add('grid', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-10');
    
    const inputText = document.getElementById("search-text").value.toLowerCase().trim();

    let res = await fetch("https://openapi.programming-hero.com/api/words/all");
    let data = await res.json();
    let allData = data.data;



    const filterData = allData.filter((element) =>
        element.word.toLowerCase().includes(inputText),
    );

    filterData.map(word => {
        const card = document.createElement('div');
        card.classList.add('bg-white', 'p-10', 'text-center', 'space-y-6', 'rounded-sm');

        card.innerHTML = `
           
                <h3 class="text-3xl font-bold ">${word.word ? word.word : 'word not abileabile'}</h3>

                <p class="text-xl  font-medium">Meaning / Pronounciation</p>
                <h3 class="text-3xl text-gray-700 font-bold font-bangla">${word.meaning ? word.meaning : 'word mening not abileabile'} / ${word.pronunciation ? word.pronunciation : 'pronunciation not abileabile'}</h3>

                <div class="flex items-center justify-between  mt-20">
                    <div class="bg-blue-100 p-3 rounded-sm ">
                        <i onclick="loadWordDelail(${word.id})" class="fa-solid fa-circle-info text-2xl hover:cursor-pointer"></i>
                    </div>
                    
                    <div class="bg-blue-100 p-3 rounded-sm ">
                        <i class="fa-solid fa-volume-high text-2xl hover:cursor-pointer"></i>
                    </div>
                </div>
           
        `;
        wordsContainer.append(card);

    });
    levelWordContainerElement.append(wordsContainer);

    // console.log(fetchAllWord());
    // DisplayWordCard(filterData);
});





init();
