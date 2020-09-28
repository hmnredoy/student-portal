<template>
  <master>
    <div class="container">
      <header>
        <h1>Subject List</h1>
        <a class="btn waves-effect waves-light" @click="triggerNew" style="margin-right: 1.2rem">Add new</a>
      </header>

      <table class="highlight">
        <thead>
        <tr>
          <th>Name</th>
          <th>Student</th>
          <th>Manage</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(subject, index) in subjects" :key="index">
          <td>{{subject.name}}</td>
          <td>{{subject.students.length > 0 ? subject.students.map(x => x.name).join(', ') : 'N/A'}}</td>
          <td>
            <a class="waves-effect waves-light btn-small teal lighten-1" @click="triggerEdit(subject)"><i class="material-icons left">border_color</i>
              Edit
            </a>
            <a class="waves-effect waves-light btn-small red lighten-1" @click="triggerDelete(subject)"><i class="material-icons right">clear</i>
              Delete
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <Alert @agreed="confirmDelete" :trigger="openAlert"/>

    <SubjectModal @modalClosed="clearForm"
                  :students="typeof this.students !== 'undefined' ? this.students : []"
                  :subject="subject"
                  :newForm="newForm"
                  :trigger="openModal"
                  @update:subject-name="subject.name = $event"
                  @update:subject-students="setStudents"
                  @subject-altered="updateStudent"
    />

  </master>
</template>

<script>
import {Subjects} from '../../models/model'
import SubjectModal from "../modals/SubjectModal";
import {Students} from "../../models/model";
import Alert from "../modals/Alert";
import {modelHelper} from "../../js/helpers";

export default {
  name: "Subject",
  data(){
    return {
      openModal: false,
      newForm: false,
      current: null,
      openAlert: false,
      subject: {
        name: null,
        students: [],
      }
    }
  },
  components: {
    SubjectModal, Alert
  },
  methods: {
    updateStudent(subject){
      subject.students.forEach((student, index) => {
        Students.update({ _id: student._id },{ $push: { subjects: subject }})
      })
    },
    setStudents(studentIDs){
      let students = []

      if(studentIDs.length > 0) {
        studentIDs.forEach((id, index) => {
          let student = Students.findOne(id)
          students.push(student)
        })
      }

      this.subject.students = students
    },
    triggerNew() {
      this.newForm = true
      this.openModal = !this.openModal
    },
    triggerEdit(subject){
      this.newForm = false
      this.subject = subject
      this.openModal = !this.openModal
    },
    triggerDelete(subject){
      this.current = subject;
      this.openAlert = !this.openAlert
    },
    confirmDelete(confirm){

      if(confirm && this.current._id){
        this.buttonText = 'OK'

        modelHelper.remove("subjects.remove", this.current._id)
      }

    },
    clearForm(){
      this.subject = {
        name: null,
        students: [],
      }
    }
  },
  meteor: {
    subjects() {
      return Subjects.find({}, {sort: {createdAt: -1}}).fetch();
    },
    students() {
      return Students.find({}, {sort: {createdAt: -1}}).fetch();
    }
  },
}
</script>

<style scoped>

</style>