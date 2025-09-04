const loop = (array) => {
    const synonyms = array.map(num => `<span class="btn bg-[#EDF7FF]">${num}</span>`)
    // console.log(synonyms);
    const join = synonyms.join(' ')
    return join
}

const loading = (status) => {
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('vocabulary-container').classList.add('hidden')
    }else{
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('vocabulary-container').classList.remove('hidden')
    }
}

const levelData = () =>{

    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevel(data))
}

const speechWord = (word = 'not find') => {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech)
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
        <button id="activeColor${level.level_no}" onclick="lodeLesson(${level.level_no})" class="btn btn-outline btn-primary lesson-active">
            <i class="ri-book-open-fill"></i>Lesson -${level.level_no}
          </button>
        `
        levelContainer.append(btnLevel)
    
    })
}

const lessonActive = () => {
    const active = document.querySelectorAll('.lesson-active') 
    // console.log(active);
    active.forEach(num => {
        num.classList.remove('active')
    })
}

document.getElementById('search-input').addEventListener('keydown', (event)=> {
    // console.log(event.key);
    const input = document.getElementById('search-input')
    const inputValue = input.value.trim().toLowerCase()
    if(inputValue === ''){
        return
    }
    
    if(event.key === 'Enter'){
        
        const url = 'https://openapi.programming-hero.com/api/words/all'
    
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const filter = data.data.filter(el => el.word.trim().toLowerCase().includes(inputValue));
    
            displayLesson(filter);
            lessonActive()
        //   data.forEach(searchValue => {
        //     console.log(searchValue);
            // const filter = searchValue.filter(el => console.log(el))
            // console.log(filter);
    
        //   })
        })
    }

})

const lodeLesson = (id) => {
    loading(true)
    lessonActive()
     const levelColor = document.getElementById(`activeColor${id}`)
     levelColor.classList.add('active')
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayLesson(data.data))
    
}

const displayLesson = (lessons) => {
    
    const vocabularyContainer = document.getElementById('vocabulary-container')
    vocabularyContainer.innerHTML = ''
    if(lessons.length === 0){
        vocabularyContainer.innerHTML = `
         <div class="flex flex-col col-span-3 gap-2 items-center justify-center">
            <img src="./assets/alert-error.png" alt="">
            <p class="text-[#79716B] text-sm font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h4 class="font-bangla font-medium text-3xl">নেক্সট Lesson এ যান</h4>
        </div>
         `
         loading()
         return
    }
    
    lessons.forEach(lesson => {
        // console.log(lessons.length === 0);
        const vocabularyCard = document.createElement('div');
        vocabularyCard.innerHTML = `
        <div class="bg-white rounded-xl py-14 px-8">
                <!-- content -->
                <div class="space-y-4 text-center">
                    <h4 class="text-3xl font-bold">${lesson.word ? lesson.word : 'not find'}</h4>
                    <p class="text-xl font-medium">Meaning /Pronunciation</p>
                    <h4 class="font-bangla text-3xl font-semibold text-[#18181B]">"${lesson.meaning ? lesson.meaning : 'not find'} / ${lesson.pronunciation ? lesson.pronunciation : 'not find'}"</h4>
                </div>

                <!-- info and Pronunciation -->
                <div class="flex items-center justify-between gap-2 mt-12">
                    <button onclick="loadWord(${lesson.id})" class="w-14 h-14 text-2xl bg-[#1a90ff1a] hover:bg-[#1a90ff4c] transition-all rounded-lg cursor-pointer"><i class="ri-information-2-fill"></i></button>
                    <button onclick="speechWord('${lesson.word}')" class="w-14 h-14 text-2xl bg-[#1a90ff1a] hover:bg-[#1a90ff4c] transition-all rounded-lg cursor-pointer"><i class="ri-volume-up-fill"></i></button>
                </div>
            </div>
        `

        vocabularyContainer.append(vocabularyCard)
    })
    loading(false)
}

const loadWord = async(id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/word/${id}`

    const res = await fetch(url)
    const data = await res.json()
    displayWord(data.data);
}

const displayWord = (words) => {
    my_modal_2.showModal()
    const modal = document.getElementById('my_modal_2')
    modal.innerHTML = `
    <div class="modal-box  ">
          <div class="border-[#EDF7FF] border-2 p-5 rounded-lg">
            <h1 class="text-4xl font-semibold mb-8">${words.word} (<span><i class="ri-mic-ai-fill"></i></span>:${words.pronunciation})</h1>
            <p class="text-2xl font-semibold mb-3">Meaning</p>
            <p class="text-2xl font-medium mb-8">${words.meaning}</p>
            <p class="text-2xl font-semibold mb-3">Example</p>
            <p class="text-2xl font-normal mb-8">${words.sentence}</p>
            <p class="text-2xl font-semibold mb-3">সমার্থক শব্দ গুলো</p>
            <div>${loop(words.synonyms)}</div>
            
            <form method="dialog">
              <div class="mt-4 "><button class="btn btn-primary">Complete Learning</button></div>
            </form>
          </div>
        </div>
    `

}


function initialize(){
    levelData()
    
}

initialize()