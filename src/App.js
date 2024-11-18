import './App.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoEye } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useState } from 'react';

const contactData = [
  { id: 1, name: "Yuvarakesh", mobile: "9182489219", email: "yuvakadiyam@gmail.com", address: "skadjfkjerkjrehkjf" },
  { id: 2, name: "John Doe", mobile: "9876543210", email: "johndoe@example.com", address: "1234 Elm Street, Springfield" },
  { id: 3, name: "Jane Smith", mobile: "9123456789", email: "janesmith@example.com", address: "5678 Oak Avenue, Rivertown" },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', address: '' });
  const [contacts, setContacts] = useState(contactData);
  const [searchQuery, setSearchQuery] = useState('');
  const [editContact, setEditContact] = useState(null);
  const [viewContact, setViewContact] = useState(null);

  const openModal = (contact = null) => {
    if (contact) {
      setEditContact(contact);
      setForm({ name: contact.name, email: contact.email, mobile: contact.mobile, address: contact.address });
    } else {
      setEditContact(null);
      setForm({ name: '', email: '', mobile: '', address: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({ name: '', email: '', mobile: '', address: '' });
    setViewContact(null);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editContact) {
      const updatedContacts = contacts.map(contact =>
        contact.id === editContact.id ? { ...contact, ...form } : contact
      );
      setContacts(updatedContacts);
    } else {
      const newContact = { id: contacts.length + 1, ...form };
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
    closeModal();
  };

  const handleReset = () => {
    setForm({ name: '', email: '', mobile: '', address: '' });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredContacts = contacts.filter(contact => {
    const query = searchQuery.toLowerCase();
    return contact.name.toLowerCase().includes(query) || contact.mobile.includes(query);
  });

  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const showContactDetails = (contact) => {
    setViewContact(contact);
  };

  return (
    <div className="main-container">
      <div className="bg-container">
        <h2 className="header" onClick={() => openModal()}>
          All Contacts
          <IoIosAddCircleOutline className="icon" />
        </h2>

        <input
          type="search"
          placeholder="Search by name or phone"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {filteredContacts.map(contact => (
          <div key={contact.id} className="contact-item">
            <div className="contact-number">
              <p>{contact.id}</p>
            </div>

            <div className="contact-details">
              <CgProfile className="profile-icon" />
              <div className="contact-info">
                <p>{contact.name}</p>
                <p>{contact.mobile}</p>
              </div>
            </div>

            <div className="contact-actions">
              <IoEye onClick={() => showContactDetails(contact)} />
              <AiFillDelete onClick={() => handleDelete(contact.id)} />
              <MdEdit onClick={() => openModal(contact)} />
            </div>
          </div>
        ))}
      </div>

      {viewContact && (
        <div className="contact-modal-overlay" onClick={closeModal}>
        <div className="contact-modal-content" onClick={e => e.stopPropagation()}>
          <div className="accept">
            <h3 className="contact-modal-title">Contact Details</h3>
            <button className="contact-modal-close-btn" onClick={closeModal}>×</button>
          </div>
          <hr />
          <div className="contact-modal-body">

            <div className="whites">
            <p>Name: {viewContact.name}</p>
            <p>Email: {viewContact.email}</p>
            <p>Phone: {viewContact.mobile}</p>
            <p>Address: {viewContact.address}</p>
            </div>
          </div>
        </div>
      </div>
      
      )}

      {isModalOpen && !viewContact && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <h3>{editContact ? "Edit Contact" : "Add Contact"}</h3>
            <hr />
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-containers">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-containers">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-containers">
                <label htmlFor="mobile">Phone:</label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder="Enter your phone number"
                  value={form.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-containers">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  value={form.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
