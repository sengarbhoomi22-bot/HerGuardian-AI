import { motion } from "framer-motion";
import { Bell, CalendarPlus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { createReminder, deleteReminder, getReminders, updateReminder } from "../../services/reminderService";

const categories = ["Medicine", "Water", "Exercise", "Sleep", "Period", "Custom"];

const initialForm = {
  title: "",
  category: "Medicine",
  time: "08:00",
  notes: "",
};

function HealthReminder() {
  const [reminders, setReminders] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadReminders = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getReminders();
      setReminders(response.reminders || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load reminders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadReminders();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    return {
      total: reminders.length,
      medicine: reminders.filter((item) => item.category === "Medicine").length,
      exercise: reminders.filter((item) => item.category === "Exercise").length,
      water: reminders.filter((item) => item.category === "Water").length,
    };
  }, [reminders]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) return;

    setError("");

    try {
      if (editingId) {
        await updateReminder(editingId, {
          title: form.title.trim(),
          category: form.category,
          time: form.time,
          notes: form.notes.trim(),
        });
        toast.success("Reminder Updated");
        setEditingId(null);
      } else {
        await createReminder({
          title: form.title.trim(),
          category: form.category,
          time: form.time,
          notes: form.notes.trim(),
        });
        toast.success("Reminder Created");
      }

      setForm(initialForm);
      await loadReminders();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save reminder");
    }
  };

  const startEdit = (reminder) => {
    setEditingId(reminder._id);
    setForm({
      title: reminder.title,
      category: reminder.category,
      time: reminder.time,
      notes: reminder.notes || "",
    });
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteReminder(id);
      toast.success("Reminder Deleted");
      if (editingId === id) {
        setEditingId(null);
        setForm(initialForm);
      }
      await loadReminders();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete reminder");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-[#dfe7ff] bg-white p-5 shadow-[0_20px_60px_rgba(108,122,214,0.12)] sm:p-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="rounded-[24px] bg-gradient-to-r from-[#7d8eff] to-[#a38cf3] p-6 text-white shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur">
                <Bell className="h-4 w-4" />
                Wellness reminders
              </div>
              <h1 className="text-3xl font-bold sm:text-4xl">Health Reminder</h1>
              <p className="mt-2 text-sm text-white/90 sm:text-base">Never miss your wellness routine.</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-3">
              <CalendarPlus className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-[#e4e9ff] bg-[#f9fbff] p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-[#4b5cc4]">
              {editingId ? "Edit Reminder" : "Create Reminder"}
            </h2>

            {error && <p className="mt-3 rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Reminder Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Take medicine"
                  className="w-full rounded-2xl border border-[#d9e0ff] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#8fa0ff]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#d9e0ff] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#8fa0ff]"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#d9e0ff] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#8fa0ff]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Optional note"
                  rows="3"
                  className="w-full rounded-2xl border border-[#d9e0ff] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#8fa0ff]"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-[#6f7dfd] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5864e8]"
              >
                {editingId ? "Update Reminder" : "Save Reminder"}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Total Reminders", value: stats.total, bg: "bg-[#eef3ff]" },
                { label: "Medicine", value: stats.medicine, bg: "bg-[#f5edff]" },
                { label: "Exercise", value: stats.exercise, bg: "bg-[#eefcff]" },
                { label: "Water", value: stats.water, bg: "bg-[#fef6ff]" },
              ].map((item) => (
                <div key={item.label} className={`rounded-[20px] ${item.bg} p-4 shadow-sm`}>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                  <p className="mt-1 text-2xl font-bold text-[#4b5cc4]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-[#e4e9ff] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-[#4b5cc4]">Your Reminders</h2>

              {isLoading ? (
                <LoadingSpinner label="Loading reminders..." className="min-h-[220px]" />
              ) : reminders.length === 0 ? (
                <div className="mt-4 flex min-h-[220px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#d7defc] bg-[#fbfcff] p-6 text-center">
                  <div className="rounded-full bg-[#eef2ff] p-4 text-[#6f7dfd]">
                    <CalendarPlus className="h-7 w-7" />
                  </div>
                  <p className="mt-3 text-base font-semibold text-slate-700">No reminders yet</p>
                  <p className="mt-1 text-sm text-gray-600">Create your first reminder and stay on track with your routine.</p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {reminders.map((reminder) => (
                    <div key={reminder._id} className="rounded-[20px] border border-[#e6ebff] bg-[#fcfdff] p-4 shadow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-[#4b5cc4]">{reminder.title}</h3>
                            <span className="rounded-full bg-[#ecefff] px-2.5 py-1 text-xs font-medium text-[#5d6fda]">
                              {reminder.category}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">Time: {reminder.time}</p>
                          {reminder.notes && <p className="mt-1 text-sm text-gray-500">{reminder.notes}</p>}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(reminder)}
                            className="rounded-full border border-[#d9e0ff] px-3 py-1.5 text-sm font-medium text-[#4b5cc4] transition hover:bg-[#f3f6ff]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReminder(reminder._id)}
                            className="rounded-full border border-[#f2c7d4] px-3 py-1.5 text-sm font-medium text-[#c15c7b] transition hover:bg-[#fff2f6]"
                          >
                            <span className="flex items-center gap-2"><Trash2 className="h-4 w-4" /> Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthReminder;
