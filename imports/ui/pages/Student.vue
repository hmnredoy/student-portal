<template>
  <div>
    <header>
      <h1>Student List</h1>
      <a class="btn waves-effect waves-light" @click="triggerNew" style="margin-right: 1.2rem">Add new</a>
    </header>

    <table class="highlight">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>DOB</th>
        <th>Subjects</th>
        <th>Manage</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(student, index) in students" :key="index">
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.phone }}</td>
        <td>{{ student.dob }}</td>
        <td>{{ getSubjects(student.subjects) }}</td>
        <td>
          <a class="waves-effect waves-light btn-small teal lighten-1" @click="triggerEdit(student)"><i
              class="material-icons left">border_color</i>
            Edit
          </a>
          <a class="waves-effect waves-light btn-small red lighten-1" @click="triggerDelete(student)"><i
              class="material-icons right">clear</i>
            Delete
          </a>
        </td>
      </tr>
      </tbody>
    </table>

    <Alert @agreed="confirmDelete" :trigger="openAlert"/>

    <StudentModal @modalClosed="clearForm" :student="student" :newForm="newForm" :trigger="openStudentModal"/>

  </div>
</template>

<script>
import StudentModal from "../modals/StudentModal";
import Alert from "../modals/Alert";
import {modelHelper} from '../../js/helpers'
import {Students} from "../../models/model";

export default {
  name: "Student",
  components: {
    Alert, StudentModal
  },
  data() {
    return {
      model: null,
      student: {
        name: null,
        email: null,
        phone: null,
        dob: null
      },
      current: null,
      openAlert: false,
      openStudentModal: false,
      newForm: true
    }
  },
  methods: {
    getSubjects(subjects){
      if(typeof subjects === 'object' && subjects.length > 0){
        return subjects.map(x => x.name).join(', ')
      }
      else
        return 'N/A'
    },

    triggerNew() {
      this.newForm = true
      this.openStudentModal = !this.openStudentModal
    },
    clearForm() {
      this.student = {
        name: null,
        email: null,
        phone: null,
        dob: null
      }
    },
    triggerEdit(student) {
      this.newForm = false
      this.student = student
      this.openStudentModal = !this.openStudentModal
    },
    triggerDelete(student) {
      this.current = student;
      this.openAlert = !this.openAlert
    },
    confirmDelete(confirm) {
      if (confirm && this.current._id) {
        this.buttonText = 'OK'
        modelHelper.remove("students.remove", this.current._id)
      }
    }
  },
  meteor: {
    students() {
      return Students.find({}, {sort: {createdAt: -1}}).fetch();
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>