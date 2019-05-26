<template>
  <div>
    <div class="row mt-5">
      <div class="mx-auto col-sm-9">
        <div class="card">
          <div class="card-header">
            <h4 class="mb-0">Редактирование</h4>
          </div>
          <div class="card-body">
            <form class="form" role="form" autocomplete="off">
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">Имя</label>
                <div class="col-lg-9">
                  <input
                    class="form-control"
                    :class="{'is-invalid': $v.name.$error}"
                    type="text"
                    @input="$v.name.$touch()"
                    v-model="name">
                  <div class="invalid-feedback" v-if="!$v.name.required">Укажите Имя</div>
                </div>
              </div>
              <div class="form-group row" v-for="(phone,k) in phones" :key="k">
                <label class="col-lg-3 col-form-label form-control-label">Телефон #{{k+1}}</label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
                    :class="{'is-invalid': $v.phones.$each[k].$error}"
                    type="text"
                    @input="$v.phones.$each[k].$touch()"
                    v-model="phones[k]">
                  <div class="invalid-feedback" v-if="!$v.phones.$each[k].checkPhone">Некорректный номер телефона</div>
                </div>
                <div class="col-lg-1">
                  <div class="fa fa-minus-circle red icon-success" @click="remove(k)" v-show="k || ( !k && phones.length > 1)"></div>
                  <div class="fa fa-plus-circle red icon-success" @click="add(k)" v-show="k == phones.length-1"></div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label"></label>
                <div class="col-lg-9">
                  <router-link
                    @click.native="edit"
                    tag="button"
                    class="btn btn-success"
                    :to="'/contacts'"
                    :key="id"
                    :disabled="$v.$invalid"
                  >
                    <span>Редактировать</span>
                  </router-link>
                  <button class="btn btn-primary" @click="goBackToContacts">На главную</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data() {
      return {
        id: this.$route.params['id'],
        name: this.$route.query.name,
        phones: this.$route.query.phones,
      }
    },
    validations:{
      phones: {
        $each: {
          checkPhone: function (phone) {
            const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
            const matches = regex.exec(phone);
            if (matches) {
              return true
            }
            return false;
          }
        }
      },
      name:{
        required
      },
    },
    methods: {
      edit() {
          const updatedContact = {
            id: this.id,
            name: this.name,
            phones: this.phones
          }
          this.$store.dispatch('updateContact', updatedContact)
      },
      goBackToContacts() {
        this.$router.push('/')
      },
      add(index) {
        this.phones.push('');
      },
      remove(index) {
        this.phones.splice(index, 1);
      },
    },
    watch: {
      $route(toR, fromR) {
        this.id = toR.params['id']
      }
    }
  }
</script>

<style scoped>

</style>
