<template>
  <div id="subjectModal" class="modal">
    <div class="modal-content">
      <h4>Add Subject</h4>
      <div class="row">
        <div class="col s12">
          <form id="subForm" class="row">
            <div class="input-field col s12">
              <input id="name" v-model="subject.name" @input="$emit('update:subject-name', $event.target.value)" type="text" class="validate">
              <label for="name">Name</label>
            </div>
            <div class="input-field select-field col s12">
             <select id="select-students" multiple @change="setStudents($event)">
                <option value="" disabled selected>Select one</option>
                <option v-if="student" :selected="!newForm ? checkSelected(student._id) : false" :value="student._id" v-for="(student, index) in students" :key="index">{{student.name}}</option>
              </select>
              <label>Select Students</label>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button v-if="newForm" class="btn waves-effect waves-light" @click="saveSubject" style="margin-right: 1.2rem">Save</button>
      <button v-else class="btn waves-effect waves-light" @click="updateSubject" style="margin-right: 1.2rem">Update</button>
    </div>
  </div>
</template>

<script>

import {modelHelper} from "../../js/helpers";

export default {
  name: "SubjectModal",
  props: ['students', 'subject', 'newForm', 'trigger'],
  data(){
    return {
      modalInstance: null,
      selectInstance: null,
      selectedStudents: []
    }
  },
  watch: {
    trigger(val) {
      this.modalInstance.open()
    }
  },
  methods: {
    checkSelected(id){
      try{
        return id ? this.subject.students.find(v => (v._id === id)) : false
      }catch (e){
        return false
      }
    },
    setStudents(e){
      this.$emit('update:subject-students', this.selectInstance.getSelectedValues())
    },
    updateSubject(){
      modelHelper.update("subjects.update",  this.subject, (subject) => {

        console.log(subject)

        this.$emit('subject-altered', subject)

        this.modalInstance.close()
        $('.valid').removeClass('valid')
      })
    },
    saveSubject() {
      modelHelper.create("subjects.insert", this.subject, (subject) => {

        this.$emit('subject-altered', subject)

        this.modalInstance.close()
        $('.valid').removeClass('valid')
      })

    }
  },
  mounted() {
    let vm = this
    const modal = document.getElementById('subjectModal');

    M.Modal.init(modal, {
      onCloseEnd() {
        document.getElementById('subForm').reset();
        vm.$emit('modalClosed', true)
      }
    })

    this.modalInstance = M.Modal.getInstance(modal);

    setTimeout(() => {
      // $('select').formSelect();
      let elem = document.getElementById('select-students');
      M.FormSelect.init(elem, {});
      this.selectInstance = M.FormSelect.getInstance(elem);

    }, 1000)

  }
}
</script>

<style scoped>

</style>