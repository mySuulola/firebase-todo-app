var ul = document.querySelector("ul");
var form = document.querySelector("form");

db.collection("todos").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type === "added") {
      displayData(change.doc);
    } else if (change.type === "removed") {
      let li = ul.querySelector(`[data-id=${change.doc.id}]`);
      ul.removeChild(li);
    }
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("todos").add({
    todo: form.todo.value,
    time: form.time.value
  });
  form.todo.value = "";
  form.time.value = "";
});

function displayData(doc) {
  var li = document.createElement("li");
  var todo = document.createElement("span");
  var time = document.createElement("span");
  var cross = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  cross.setAttribute("class", "delete");

  todo.textContent = doc.data().todo;
  time.textContent = doc.data().time;
  cross.textContent = "x";

  li.appendChild(todo);
  li.appendChild(time);
  li.appendChild(cross);

  ul.appendChild(li);

  cross.addEventListener("click", e => {
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("todos")
      .doc(id)
      .delete();
  });
}