// Parent element to store cards
const taskContainer = document.querySelector(".task__container");

// Global Store
let globalStore = [];

const newCard = ({
  id,
  imageUrl,
  taskTitle,
  taskDescription,
  taskType,
}) => `<div class="col-md-4 col-sm-6" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success">
      <i class="fa-solid fa-pencil"></i>
    </button>
    <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)">
      <i class="fa-solid fa-trash-can" id=${id} onclick="deleteCard.apply(this, arguments)"></i>
    </button>
  </div>
  <img
    src=${imageUrl}
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">
     ${taskDescription}
    </p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>`;

// Load task
const loadInitialTaskCards = () => {
  // access localStorage
  const getInitialData = localStorage.getItem("tasky"); // null
  if (!getInitialData) return;

  // Convert stringified-object to object
  const { cards } = JSON.parse(getInitialData);

  // map arround the array to generate HTML card and inject it to DOM
  cards.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
  });
};

const updateLocalStorage = (data) => localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, //unique number for card id number =>
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };

  //   HTML Code
  const createNewCard = newCard(taskData);

  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  globalStore.push(taskData);

  //   Add to localstorage
  updateLocalStorage();
};

// Delete Card
const deleteCard = (event) => {
  // id
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName; //BUTTON
  console.log(targetID);

  // search the globalStore, remove the object which matches with id
  globalStore = globalStore.filter(
    (cardObject) => cardObject.id !== targetID
  );
  updateLocalStorage();

  // access DOM to remove them

  if (tagname === "BUTTON") {
    // task__container
    return event.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      event.target.parentNode.parentNode.parentNode // col_md-4
    );
  }

  // task__container
  return event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode // col_md-4
  );
  // loop over the new globalStore and inject updated cards to DOM
};
