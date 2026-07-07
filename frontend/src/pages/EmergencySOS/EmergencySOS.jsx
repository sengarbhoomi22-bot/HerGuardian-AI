import { motion } from "framer-motion";
import { Phone, PlusCircle, ShieldCheck, Sparkles, Edit2, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getContacts, addContact, updateContact, removeContact } from "../../services/contactService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const emergencyContacts = [
  {
    id: 1,
    name: "Women Helpline",
    number: "1091",
    icon: <ShieldCheck className="h-6 w-6" />,
    color: "from-[#ffefef] to-[#ffe2e6]",
  },
  {
    id: 2,
    name: "Police",
    number: "112",
    icon: <Phone className="h-6 w-6" />,
    color: "from-[#fff4e8] to-[#ffe7d4]",
  },
  {
    id: 3,
    name: "Ambulance",
    number: "108",
    icon: <Phone className="h-6 w-6" />,
    color: "from-[#fef2f2] to-[#ffe5e5]",
  },
  {
    id: 4,
    name: "Fire Brigade",
    number: "101",
    icon: <ShieldCheck className="h-6 w-6" />,
    color: "from-[#fff0f7] to-[#ffe0ee]",
  },
];

const safetyTips = [
  "Share live location with trusted contacts.",
  "Keep emergency numbers saved on your phone.",
  "Avoid isolated areas when possible.",
  "Inform trusted contacts before traveling alone.",
  "Keep your phone charged and carry a power bank.",
];

function EmergencySOS() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    relationship: "Other",
  });

  const contactCountLabel = useMemo(() => {
    return contacts.length === 1 ? "1 contact" : `${contacts.length} contacts`;
  }, [contacts]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getContacts();
      setContacts(response.contacts || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load contacts");
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadContacts();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleOpenModal = (contact = null) => {
    if (contact) {
      setIsEditing(true);
      setEditingContactId(contact._id);
      setFormData({
        name: contact.name,
        phone: contact.phone,
        relationship: contact.relationship || "Other",
      });
    } else {
      setIsEditing(false);
      setEditingContactId(null);
      setFormData({
        name: "",
        phone: "",
        relationship: "Other",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingContactId(null);
    setFormData({
      name: "",
      phone: "",
      relationship: "Other",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Name and phone are required");
      return;
    }

    try {
      setSubmitting(true);

      if (isEditing) {
        await updateContact(editingContactId, {
          name: formData.name,
          phone: formData.phone,
          relationship: formData.relationship,
        });
        toast.success("Contact Updated");
      } else {
        await addContact({
          name: formData.name,
          phone: formData.phone,
          relationship: formData.relationship,
        });
        toast.success("Contact Added");
      }

      await loadContacts();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save contact");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      await removeContact(contactId);
      toast.success("Contact Deleted");
      await loadContacts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete contact");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,243,243,0.8),_transparent_40%),linear-gradient(135deg,_#fff7f8_0%,_#fff2f4_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-[#f3d7df] bg-white p-5 shadow-[0_20px_60px_rgba(220,99,123,0.12)] sm:p-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="rounded-[24px] bg-gradient-to-r from-[#ff5b5b] to-[#ff7a8a] p-6 text-white shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur">
                <ShieldCheck className="h-4 w-4" />
                Safety support
              </div>
              <h1 className="text-3xl font-bold sm:text-4xl">Emergency SOS</h1>
              <p className="mt-2 text-sm text-white/90 sm:text-base">Quick access to emergency resources and trusted contacts.</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-3">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-[#c43b5b]">Emergency Contacts</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className={`rounded-[24px] border border-[#f7dfe4] bg-gradient-to-br ${contact.color} p-5 shadow-sm`}
              >
                <div className="text-3xl">{contact.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-[#8e2d47]">{contact.name}</h3>
                <p className="mt-1 text-sm text-gray-700">{contact.number}</p>
                <a
                  href={`tel:${contact.number}`}
                  className="mt-4 inline-flex rounded-full bg-[#ff5b5b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e64b4b]"
                >
                  Call
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[24px] border border-[#f2dce0] bg-[#fff8fa] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-[#c43b5b]">My Trusted Contacts</h2>
              <p className="mt-1 text-sm text-gray-600">{contactCountLabel}</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center gap-2 rounded-full border border-[#f2c2cc] bg-white px-4 py-2 text-sm font-semibold text-[#c43b5b] transition hover:-translate-y-0.5 hover:bg-[#fff2f4]"
            >
              <PlusCircle className="h-4 w-4" />
              Add Contact
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {loading ? (
            <LoadingSpinner label="Loading contacts..." className="mt-6" />
          ) : contacts.length === 0 ? (
            <div className="mt-6 rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-gray-600">No trusted contacts yet. Add one to get started.</p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {contacts.map((contact) => (
                <motion.div
                  key={contact._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[20px] border border-[#f3d7df] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#8e2d47]">{contact.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{contact.phone}</p>
                      <p className="mt-1 text-xs text-gray-500">{contact.relationship}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(contact)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-[#c43b5b]"
                        title="Edit contact"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete contact"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-[#c43b5b]">Safety Tips</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {safetyTips.map((tip, index) => (
              <div key={tip} className="rounded-[20px] border border-[#f3d7df] bg-white p-4 shadow-sm">
                <div className="text-lg font-semibold text-[#c43b5b]">0{index + 1}</div>
                <p className="mt-2 text-sm text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Add/Edit Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#c43b5b]">
                {isEditing ? "Edit Contact" : "Add Contact"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mother"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:border-[#c43b5b] focus:outline-none"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g., +91 98765 43210"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:border-[#c43b5b] focus:outline-none"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Relationship</label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#c43b5b] focus:outline-none"
                  disabled={submitting}
                >
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Sister">Sister</option>
                  <option value="Brother">Brother</option>
                  <option value="Friend">Friend</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full border border-[#f2c2cc] px-4 py-2 text-sm font-semibold text-[#c43b5b] hover:bg-[#fff2f4]"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#ff5b5b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e64b4b] disabled:bg-gray-400"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default EmergencySOS;
