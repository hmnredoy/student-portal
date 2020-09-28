<template>
  <div id="studentModal" class="modal" style="height: 50%">
    <div class="modal-content">
      <h4>Add Student</h4>
      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input id="name" type="text" class="validate" v-model="student.name">
              <label for="name">Name</label>
            </div>
            <div class="input-field col s6">
              <input id="email" type="email" class="validate" v-model="student.email">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input id="phone" type="text" class="validate" v-model="student.phone">
              <label for="phone">Phone</label>
            </div>
            <div class="input-field col s6">
              <input id="dob" type="text" class="datepicker" v-model="student.dob">
              <label for="dob">DOB</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button v-if="newForm" class="btn waves-effect waves-light" @click="handleSubmit" style="margin-right: 1.2rem">Save</button>
      <button v-else class="btn waves-effect waves-light" @click="handleUpdate" style="margin-right: 1.2rem">Update</button>
    </div>
  </div>
</template>

<script>

import flatpickr from "flatpickr";
import {modelHelper} from '../../js/helpers'

const collection = 'students'
export default {
  name: "StudentModal",
  props: ['student', 'trigger', 'newForm'],
  data() {
    return {

    }
  },
  watch: {
    trigger(val) {
      this.instance.open()
    }
  },
  methods: {
    handleUpdate(){

      modelHelper.update("students.update",  this.student, () => {
        this.instance.close()
        $('.valid').removeClass('valid')
      })

    },
    handleSubmit() {

     modelHelper.create("students.insert", this.student, () => {
        this.instance.close()
        $('.valid').removeClass('valid')
      })

    }
  },
  mounted() {
    let vm = this
    const elem = document.getElementById('studentModal');
    this.instance = M.Modal.init(elem, {
      onCloseEnd() {
        vm.$emit('modalClosed', true)
      }
    })

    flatpickr(".datepicker", {
      dateFormat: "Y-m-d",
      minDate: new Date('1910-01-01'),
      maxDate: new Date(),
      onChange: (date) => {
        console.log(date)
      }
    })

  }
}
</script>

<style scoped>

/*.flatpickr-monthDropdown-months {
  width: 12ch !important;
  display: inline-block !important;
  padding-bottom: 11px !important;
}*/
</style>