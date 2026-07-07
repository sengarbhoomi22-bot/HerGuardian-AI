import { useState } from "react";
import { Search, Mic, MicOff } from "lucide-react";
import toast from "react-hot-toast";

function SearchBar({ value, onChange, placeholder, inputClassName = "" }) {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice search is not supported in this browser. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      toast.success("Listening... Speak now");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      // Simulate synthetic input event to match parent state handler
      onChange({ target: { value: transcript } });
      toast.success(`Search query set to: "${transcript}"`);
    };

    recognition.onerror = (err) => {
      console.error(err);
      toast.error("Could not capture speech. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="relative flex w-full md:w-96 items-center">
      <span className="sr-only">Search</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-white py-3 pl-10 pr-12 shadow-sm outline-none transition focus:ring-2 ${inputClassName}`}
      />
      <button
        type="button"
        onClick={handleVoiceSearch}
        className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition ${isListening ? "bg-red-100 text-red-600 animate-pulse" : "text-slate-400 hover:bg-slate-100 hover:text-pink-600"}`}
        title="Voice Search"
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default SearchBar;
