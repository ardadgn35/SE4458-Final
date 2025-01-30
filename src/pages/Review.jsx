import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg text-center text-gray-900">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Thank You for Your Feedback!</h2>
          <p className="text-lg text-gray-600">
            We appreciate your time in leaving a review.
          </p>
          <p className="mt-4 text-gray-600">Have a great day!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg text-gray-900">
        <h2 className="text-2xl font-semibold mb-4 text-center">Rate Your Experience</h2>
        <p className="text-center text-gray-600 mb-6">Please rate your experience and leave a comment.</p>

        {/* Yıldız Puanlama */}
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={index}
                size={30}
                className={`cursor-pointer transition ${
                  starValue <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>

        {/* Yorum Girişi */}
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Leave your comments here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
