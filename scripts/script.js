
const levelData = () =>{
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevel(data))
}

const displayLevel = (levels) => {
    // console.log(levels);
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ''
    levels.data.forEach(level => {
        // console.log(level);
        const btnLevel = document.createElement('div')
        // console.log();
        btnLevel.innerHTML = `
        <button onclick="lodeLesson(${level.level_no})" class="btn btn-outline btn-primary">
            <i class="ri-book-open-fill"></i>Lesson -${level.level_no}
          </button>
        `
        levelContainer.append(btnLevel)
    })
}

const lodeLesson = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayLesson(data.data))
}

const displayLesson = (lessons) => {

    // console.log(lessons);
    const vocabularyContainer = document.getElementById('vocabulary-container')
    vocabularyContainer.innerHTML = ''
    lessons.forEach(lesson => {
        // console.log(lesson);
        const vocabularyCard = document.createElement('div');
        
        vocabularyCard.innerHTML = `
        <div class="bg-white rounded-xl py-14 px-8">
                <!-- content -->
                <div class="space-y-4 text-center">
                    <h4 class="text-3xl font-bold">${lesson.word}</h4>
                    <p class="text-xl font-medium">Meaning /Pronounciation</p>
                    <h4 class="font-bangla text-3xl font-semibold text-[#18181B]">"${lesson.meaning} / ${lesson.pronunciation}"</h4>
                </div>

                <!-- info and Pronounciation -->
                <div class="flex items-center justify-between gap-2 mt-12">
                    <button class="w-14 h-14 text-2xl bg-[#1a90ff1a] rounded-lg cursor-pointer"><i class="ri-information-2-fill"></i></button>
                    <button class="w-14 h-14 text-2xl bg-[#1a90ff1a] rounded-lg cursor-pointer"><i class="ri-volume-up-fill"></i></button>
                </div>
            </div>
        `
        vocabularyContainer.append(vocabularyCard)
    })
}



function initialize(){
    levelData()

}

initialize()