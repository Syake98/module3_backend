document.addEventListener("click", ({ target }) => {
  const id = target.dataset.id;
  const liNote = target.closest("li");

  if (target.dataset.type === "remove") {
    remove(id).then(() => {
      liNote.remove();
    });
  } else if (target.dataset.type === "edit") {
    const noteTitle = liNote.querySelector(".note-title");
    const noteInput = liNote.querySelector(".note-input");
    const saveBtn = liNote.querySelector('button[data-type="save"]');
    const cancelBtn = liNote.querySelector('button[data-type="cancel"]');
    const removeBtn = liNote.querySelector('button[data-type="remove"]');

    noteTitle.hidden = true;
    noteInput.hidden = false;
    target.hidden = true;
    saveBtn.hidden = false;
    cancelBtn.hidden = false;
    removeBtn.hidden = true;
  } else if (target.dataset.type === "save") {
    const newTitle = liNote.querySelector(".note-input").value;

    edit(id, newTitle).then(() => {
      liNote.querySelector(".note-title").innerText = newTitle;
      resetEditMode(liNote);
    });
  } else if (target.dataset.type === "cancel") {
    resetEditMode(liNote);
  }
});

function resetEditMode(listItem) {
  listItem.querySelector(".note-title").hidden = false;
  listItem.querySelector(".note-input").hidden = true;
  listItem.querySelector('button[data-type="save"]').hidden = true;
  listItem.querySelector('button[data-type="cancel"]').hidden = true;
  listItem.querySelector('button[data-type="edit"]').hidden = false;
  listItem.querySelector('button[data-type="remove"]').hidden = false;
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle) {
  await fetch(`/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id, title: newTitle }),
  });
}