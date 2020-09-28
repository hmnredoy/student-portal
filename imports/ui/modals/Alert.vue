<template>
  <div id="alert_modal" class="modal">
    <div class="modal-content center-align">
      <div v-html="alertBody"></div>
    </div>
    <div class="modal-footer">
      <a href="#" class="modal-close waves-effect waves-green btn-flat" @click="$emit('agreed', true)">{{buttonText}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    alertBody: {
      default: '<h4>Are you sure you want to do this?</h4>',
      type: String
    },
    buttonText: {
      default: 'Agree',
      type: String
    },
    trigger: {}
  },
  data(){
    return {
      body: null,
      instance: null
    }
  },
  methods: {

  },
  watch: {
    trigger(val) {
      this.instance.open()
    }
  },
  mounted() {
    let vm = this
    const elem = document.getElementById('alert_modal');
    this.instance = M.Modal.init(elem, {
      onCloseEnd() {
        vm.$emit('modalClosed', true)
      }
    });
  }
}
</script>

<style scoped>

</style>