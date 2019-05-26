<template>
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">

          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Добавить телефон</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="closeModal">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="form" role="form" autocomplete="off">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Телефон</label>
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        :class="{'is-invalid': $v.phone.$error}"
                        type="text"
                        @input="$v.phone.$touch()"
                        v-model="phone">
                      <div class="invalid-feedback" v-if="!$v.phone.checkPhone">Некорректный номер телефона</div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Закрыть</button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="savePhone()"
                  :disabled="$v.$invalid">Сохранить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "Modal",
        props:["showModal", "contactId"],
      data () {
        return {
          phone: '',
        }
      },
      validations:{
        phone: {
          checkPhone: function (phone) {
            const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
            const matches = regex.exec(phone);
            if (matches) {
              return true
            }
            return false;
          }
        },
      },
      methods: {
        closeModal() {
          this.phone = ''
          this.$emit('closeModal', false)
          this.$nextTick(() => { this.$v.$reset() })

        },
        savePhone() {
          const addedPhone = {contactId: this.contactId, phone: this.phone}
          this.$store.dispatch('savePhone', addedPhone)
          this.$emit('closeModal', false)
          this.phone = '';
          this.$nextTick(() => { this.$v.$reset() })
        }
      },
    }
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, .5);

    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
</style>
