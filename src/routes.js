import VueRouter from 'vue-router'
import ContactTable from "./ContactTable";
import ContactEdit from "./ContactEdit";
import NotFound from "./Error"
import ContactCreate from "./ContactCreate";

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/contacts'
    },
    {
      path: '/contacts',
      component: ContactTable,
      name: 'contact-table'
    },
    {
      path: '/contact/create',
      component: ContactCreate,
      name: 'contact-create'
    },
    {
      path: '/contact/:id',
      component: ContactEdit,
      name: 'contact-edit'
    },
    {
      path: '*',
      component: NotFound
    },
  ],
  mode: 'history',
})


