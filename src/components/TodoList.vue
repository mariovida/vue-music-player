<template>
  <div class="todolist second">
    <input
      type="text"
      class="todo-input"
      placeholder="Add tasks"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        class="todo-item"
      >
        <div class="todo-item-left">
          <input class="check" type="checkbox" v-model="todo.completed" />
          <div
            v-if="!todo.editing"
            @dblclick="editTodo(todo)"
            class="todo-item-label"
            :class="{ completed: todo.completed }"
          >
            {{ todo.title }}
          </div>
          <input
            v-else
            class="todo-item-edit"
            type="text"
            v-model="todo.title"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            v-focus
          />
        </div>
        <div class="remove-item" @click="removeTodo(index)">&times;</div>
      </div>
    </transition-group>

    <div class="extra-container">
      <div>
        <label
          ><input
            type="checkbox"
            :checked="!anyRemaining"
            @change="checkAllTodos"
          />
          Check All</label
        >
      </div>
      <div>
        <b>{{ remaining }}</b> tasks remaining
      </div>
    </div>

    <div class="extra-container">
      <div>
        <transition name="fade">
          <button
            class="clear"
            v-if="showClearCompletedButton"
            @click="clearCompleted"
          >
            Clear Completed
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-list",
  data() {
    return {
      newTodo: "",
      idForTodo: 2,
      beforeEditCache: "",
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Add new task :)",
          completed: false,
          editing: false,
        },
      ],
    };
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "completed") {
        return this.todos.filter((todo) => todo.completed);
      }
      return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      });
      this.newTodo = "";
      this.idForTodo++;
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    doneEdit(todo) {
      if (todo.title.trim() == "") {
        todo.title = this.beforeEditCache;
      }
      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
.todolist {
  position: absolute;
  top: 75px;
  right: 3%;
  width: 380px;
  max-height: 500px;
  background-color: #bbc6b8;
  border: 2px solid #93a48e;
  border-radius: 17px;
  padding: 12px;
  margin-left: 20px;
  z-index: 1;
}
.todolist::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 71%;
  margin-left: -15px;
  border-width: 15px;
  border-style: solid;
  border-color: transparent transparent #a2b29f transparent;
}
.dark .todolist {
  border-color: #839980;
  color: #2c3e50;
}
.todo-input {
  width: 100%;
  padding: 7px 12px;
  font-size: 14px;
  margin-top: 27px;
  margin-bottom: 8px;
  border: 2px solid #a2b29f;
  border-radius: 17px;
  outline: none;
  background-color: #f1f4f1;
}
.check {
  margin-left: 17px;
}
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.remove-item {
  font-size: 21px;
  cursor: pointer;
  position: relative;
  right: 21px;
}
.remove-item:hover {
  color: black;
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  font-size: 15px;
  padding: 5px 8px;
}
.todo-item-edit {
  font-size: 22px;
  margin-left: 12px;
  width: 100%;
  padding: 7px 12px;
  border: 1px solid #a2b29f;
}
.todo-item-edit:focus {
  outline: 1px solid #a2b29f;
}
.completed {
  text-decoration: line-through;
  color: #a2b29f;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  border-top: 1px solid lightgrey;
  padding-top: 12px;
  margin-top: 12px;
}
.clear {
  font-size: 15px;
  border: 1px solid #a2b29f;
  border-radius: 17px;
  background-color: #a2b29f;
  color: white;
  padding: 5px 15px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media screen and (max-width: 1280px) {
  .todolist::after {
    left: 70%;
  }
}
@media screen and (max-width: 1080px) {
  .todolist::after {
    left: 68%;
  }
}
@media screen and (max-width: 980px) {
  .todolist::after {
    left: 67%;
  }
}
@media screen and (max-width: 780px) {
  .todolist {
    display: none;
  }
}
</style>
