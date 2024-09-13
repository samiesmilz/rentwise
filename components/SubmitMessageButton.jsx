import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";

function SubmitMessageButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-md w-full focus:outline-none focus:shadow-outline flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105"
      type="submit"
      disabled={pending}
    >
      <FaPaperPlane className="mr-2" />{" "}
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default SubmitMessageButton;
