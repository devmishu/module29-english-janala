

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
        lessonElement.classList.add('btn', 'btn-outline', 'btn-primary');
        lessonElement.addEventListener('click', () => {
            loadLevelWord(lesson.level_no)
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

    console.log(data.data);
    const levelWordContainerElement = document.getElementById('level-word-container');
    levelWordContainerElement.innerHTML = "";

    const wordsContainer = document.createElement('div');
    wordsContainer.classList.add('grid', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-10');




    const words = data.data;
    console.log(words.length);

    if (words.length !== 0) {
        words.forEach(word => {
            const div = document.createElement('div');
            div.classList.add('bg-white', 'p-10', 'text-center', 'space-y-6', 'rounded-sm',);


            div.innerHTML = `
           
                <h3 class="text-3xl font-bold ">${word.word}</h3>
                <p class="text-xl  font-medium">Meaning / Pronounciation</p>
                <h3 class="text-3xl text-gray-700 font-bold font-bangla">${word.meaning}/${word.pronunciation}</h3>

                <div class="flex items-center justify-between  mt-20">
                    <div class="bg-blue-100 p-3 rounded-sm ">
                        <i class="fa-solid fa-circle-info text-2xl"></i>
                    </div>
                    
                    <div class="bg-blue-100 p-3 rounded-sm ">
                        <i class="fa-solid fa-volume-high text-2xl"></i>
                    </div>
                </div>
           
        `;
            wordsContainer.append(div);
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

init();




