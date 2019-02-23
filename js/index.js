var form = document.querySelector('form')
db.collection('todos').get().then( (snapshot) => {
    // snapshot.docs.forEach( (doc) => {
    //     console.log(doc.data())
    // } )

snapshot.forEach(doc => {
        displayData(doc)
    })
} )



form.addEventListener('submit', (e) => {
    e.preventDefault()
    db.collection('todos').add({
        todo: form.todo.value,
        time: form.time.value
    })
    form.todo.value= ''
    form.time.value= ''
})

function displayData(doc){
 var ul = document.querySelector('ul')
 var li = document.createElement('li')
 var todo = document.createElement('span')
 var time = document.createElement('span')
  
 li.setAttribute('data-id', doc.id)

 todo.textContent = doc.data().todo
 time.textContent = doc.data().time

 li.appendChild(todo)
 li.appendChild(time)

 ul.appendChild(li)

}



