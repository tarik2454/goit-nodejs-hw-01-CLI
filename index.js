import { program } from 'commander';
import * as contactsService from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contactsService.listContacts();
      return console.table(allContacts);

    case 'get':
      const oneContact = await contactsService.getContactById(id);
      return console.log('Найти контакт по id ====>', oneContact);

    case 'add':
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      return console.log('Добавить контакт ====>', newContact);

    case 'remove':
      const deleteMovie = await contactsService.removeContact(id);
      return console.log('Удаленный контакт ====>', deleteMovie);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
