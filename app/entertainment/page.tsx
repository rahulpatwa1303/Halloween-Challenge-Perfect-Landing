"use client";

import { useState, useEffect } from "react";
import { halloweenMovies, Movie } from "./movies_data";
import { halloweenStories } from "./halloween_stories";

interface Story {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  upvotes: number;
  category: string;
}

const categoryEmojis: Record<string, string> = {
  scary: "😱",
  funny: "😂",
  paranormal: "👻",
  "urban-legend": "🏙️",
  spooky: "🎃",
};

const genreEmojis: Record<string, string> = {
  horror: "🔪",
  comedy: "😂",
  thriller: "🎯",
  supernatural: "👻",
  slasher: "🩸",
  classic: "🎭",
  family: "👨‍👩‍👧‍👦",
  psychological: "🧠",
  monster: "👹",
  zombie: "🧟",
};

// Popular Halloween Movies Data

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeTab, setActiveTab] = useState<"stories" | "movies">("stories");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function loadStories() {
      try {
        const data = halloweenStories;
        setStories(data);
      } catch (err) {
        console.error("Failed to load stories:", err);
      }
    }
    loadStories();
  }, []);

  // Add ESC key listener for closing modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedStory) setSelectedStory(null);
        if (selectedMovie) setSelectedMovie(null);
      }
    };

    if (selectedStory || selectedMovie) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [selectedStory, selectedMovie]);

  const filteredStories =
    filter === "all"
      ? stories
      : stories.filter(
          (s) => s.category.toLowerCase() === filter.toLowerCase()
        );

  const filteredMovies =
    filter === "all"
      ? halloweenMovies
      : halloweenMovies.filter((m) =>
          m.genre.some((g) => g.includes(filter.toLowerCase()))
        );

  // Count functions
  const getStoryCount = (category: string) => {
    if (category === "all") return stories.length;
    return stories.filter(
      (s) => s.category.toLowerCase() === category.toLowerCase()
    ).length;
  };

  const getMovieCount = (genre: string) => {
    if (genre === "all") return halloweenMovies.length;
    return halloweenMovies.filter((m) =>
      m.genre.some((g) => g.includes(genre.toLowerCase()))
    ).length;
  };

  return (
    <main
      className="min-h-screen pt-20 pb-10"
      style={{ backgroundColor: "#26282c" }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1
            className="font-creepster text-4xl md:text-6xl mb-4"
            style={{ color: "#f64295" }}
          >
            Spooky Entertainment
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Dive into spine-chilling tales from Reddit and discover the best
            Halloween movies to watch this season!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/30 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => {
                setActiveTab("stories");
                setFilter("all");
              }}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === "stories"
                  ? "text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              style={
                activeTab === "stories" ? { backgroundColor: "#f64295" } : {}
              }
            >
              📚 Stories
            </button>
            <button
              onClick={() => {
                setActiveTab("movies");
                setFilter("all");
              }}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === "movies"
                  ? "text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              style={
                activeTab === "movies" ? { backgroundColor: "#f64295" } : {}
              }
            >
              🎬 Movies
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(activeTab === "stories"
            ? [
                { key: "all", label: "All Stories" },
                { key: "scary", label: "Scary" },
                { key: "funny", label: "Funny" },
                { key: "paranormal", label: "Paranormal" },
                { key: "urban-legend", label: "Urban Legends" },
                { key: "spooky", label: "Spooky" },
              ]
            : [
                { key: "all", label: "All Movies" },
                { key: "horror", label: "Horror" },
                { key: "comedy", label: "Comedy" },
                { key: "thriller", label: "Thriller" },
                { key: "supernatural", label: "Supernatural" },
                { key: "classic", label: "Classic" },
                { key: "family", label: "Family" },
              ]
          ).map(({ key, label }) => {
            const count =
              activeTab === "stories" ? getStoryCount(key) : getMovieCount(key);
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  filter === key
                    ? "text-white"
                    : "bg-gray-800/50 text-gray-300 hover:text-white"
                }`}
                style={filter === key ? { backgroundColor: "#f64295" } : {}}
              >
                <span>{label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    filter === key
                      ? "bg-white/20 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Grid - Stories or Movies */}
        {activeTab === "stories" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 md:p-6 hover:bg-gray-800/70 transition-all cursor-pointer group"
                onClick={() => setSelectedStory(story)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">
                    {categoryEmojis[story.category] || "🎃"}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors mb-1">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-400">by {story.author}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">
                  {story.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-pink-400 uppercase">
                    {story.category}
                  </span>
                  <span className="text-orange-400">⬆️ {story.upvotes}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 md:p-6 hover:bg-gray-800/70 transition-all cursor-pointer group"
                onClick={() => setSelectedMovie(movie)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">
                    {genreEmojis[movie.genre[0]] || "🎬"}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors mb-1">
                      {movie.title} ({movie.year})
                    </h3>
                    <p className="text-sm text-gray-400">by {movie.director}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">{movie.plot}</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {movie.genre.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="text-xs text-pink-400 uppercase"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">
                      ⭐ {movie.imdbRating}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 text-xs">
                      {movie.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Story Modal */}
        {selectedStory && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedStory(null);
              }
            }}
          >
            <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full my-20 md:my-0 relative">
              {/* Sticky header with close button */}
              <div className="sticky top-0 bg-gray-900 border-b border-gray-700 rounded-t-2xl p-4 md:p-6 flex justify-between items-start gap-4 z-10">
                <h2 className="text-xl md:text-2xl font-bold text-white flex-1 pr-4">
                  {selectedStory.title}
                </h2>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-400 hover:text-white text-2xl md:text-3xl flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              {/* Scrollable content */}
              <div className="p-4 md:p-6 pt-0 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
                  <span className="text-lg">
                    {categoryEmojis[selectedStory.category] || "🎃"}
                  </span>
                  <span>by {selectedStory.author}</span>
                  <span>•</span>
                  <span className="text-orange-400">
                    ⬆️ {selectedStory.upvotes}
                  </span>
                </div>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {selectedStory.content}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Movie Modal */}
        {selectedMovie && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedMovie(null);
              }
            }}
          >
            <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full my-8 md:my-0 relative">
              {/* Sticky header with close button */}
              <div className="sticky top-0 bg-gray-900 border-b border-gray-700 rounded-t-2xl p-4 md:p-6 flex justify-between items-start gap-4 z-10">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {selectedMovie.title} ({selectedMovie.year})
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Directed by {selectedMovie.director}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="text-gray-400 hover:text-white text-2xl md:text-3xl flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              {/* Scrollable content */}
              <div className="p-4 md:p-6 pt-0 max-h-[70vh] overflow-y-auto">
                {/* Movie Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div
                      className="text-lg font-bold"
                      style={{ color: "#f64295" }}
                    >
                      ⭐ {selectedMovie.imdbRating}
                    </div>
                    <div className="text-xs text-gray-400">IMDb Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {selectedMovie.rating}
                    </div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {selectedMovie.duration}
                    </div>
                    <div className="text-xs text-gray-400">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {selectedMovie.year}
                    </div>
                    <div className="text-xs text-gray-400">Year</div>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedMovie.genre.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-800 text-pink-400 text-xs rounded-full flex items-center gap-1"
                    >
                      {genreEmojis[genre] || "🎬"} {genre}
                    </span>
                  ))}
                </div>

                {/* Plot */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">Plot</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedMovie.plot}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
