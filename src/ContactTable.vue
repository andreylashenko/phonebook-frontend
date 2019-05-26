<template>
  <div id="container">
    <h1 class="text-center m-3">Телефонный справочник</h1>
    <div class="row">
      <div class="col-6">
        <div class="form-group has-search">
          <span class="fa fa-search form-control-search"></span>
          <input type="text" class="form-control" placeholder="Введите телефон или имя" v-model="searchContact">
        </div>
      </div>
      <div class="col-3">
        <router-link class="btn btn-success" tag="button" :to="'contact/create'">
          <span>Добавить контакт</span>
        </router-link>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Телефоны</th>
        <th scope="col">Имя</th>
        <th scope="col">Действия</th>
        <th scope="col">Добавить телефон</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="contact in filteredContacts">
        <th scope="row">{{contact.id}}</th>
        <td>
          <div v-for="phone in contact.phones">{{phone}}</div>
        </td>
        <td>{{contact.name}}</td>
        <td>
          <router-link
            class="btn btn-info"
            tag="button"
            :to="{name: 'contact-edit', params: {id: contact.id}, query: {name: contact.name, phones: contact.phones}}"
            :key="contact.id">
            <span>Редактировать</span>
          </router-link>
          <button @click="contactDelete(contact.id)" class="btn btn-danger">Удалить</button>
        </td>
        <td>
          <button class="btn btn-success" @click="addPhone(contact.id)">Добавить телефон</button>
        </td>
      </tr>
      </tbody>
    </table>
    <Modal
      :showModal="showModal"
      :contactId="contactId"
      @closeModal="showModal=$event"></Modal>
  </div>
</template>

<script>
    import Modal from "./Modal";
    export default {
      name: "ContactTable",
      components: {Modal},
      data () {
        return {
          searchContact: '',
          showModal: false,
          phone: '',
          contactId: ''
        }
      },
      methods: {
        addPhone(id) {
          this.showModal = true
          this.contactId = id;
        },
        contactDelete(id) {
          this.$store.dispatch('deleteContact', {body: {id : id}})
        }
      },
      computed: {
        filteredContacts() {
          const contactList = this.$store.getters.getContactList;

          if (contactList) {
            return contactList.filter(element => {
              const findByName = element.name.indexOf(this.searchContact) !== -1;
              const findByPhone = element.phones.join().indexOf(this.searchContact) !== -1;

              return findByName ? findByName : findByPhone;
            })
          } else {
            return [];
          }
        }
      },created() {
        this.$store.dispatch('loadContacts')
      }
    }
</script>

<style scoped>
  .has-search .form-control {
    padding-left: 2.375rem;
  }

  .has-search .form-control-search {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
  }
</style>
