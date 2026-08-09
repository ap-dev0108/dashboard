import React, { useState } from "react";
import { Plus, Search, Star, X } from "lucide-react";
import { useMedia } from "../hooks/useMedia";
import type { Media } from "../types/MediaTypes";
import { MediaType, MediaStatus } from "../types/MediaTypes";

type NewEntryFormData = Omit<Media, "Ratings">;

const MEDIA_TYPES: Record<MediaType, string> = {
  [MediaType.Movies]: "Movies",
  [MediaType.TVShows]: "TV Shows",
  [MediaType.Books]: "Books",
  [MediaType.Games]: "Games",
  [MediaType.Music]: "Music",
};

const MEDIA_STATUS_LABELS: Record<MediaStatus, string> = {
  [MediaStatus.Finished]: "Finished",
  [MediaStatus.Planning]: "Planning",
  [MediaStatus.InProgress]: "In Progress",
};

const STATUS_COLORS: Record<MediaStatus, string> = {
  [MediaStatus.Finished]: "bg-green-100 text-green-800",
  [MediaStatus.Planning]: "bg-yellow-100 text-yellow-800",
  [MediaStatus.InProgress]: "bg-blue-100 text-blue-800",
};

export const ReviewsPage: React.FC = () => {
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType | "all">(
    "all",
  );
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [entryMediaType, setEntryMediaType] = useState<MediaType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<NewEntryFormData>({
    MediaTitle: "",
    MediaDescription: "",
    ImageURL: "",
    MediaType: MediaType.Movies,
    MediaStatus: MediaStatus.Planning,
  });

  const { data, isLoading, error } = useMedia();

  const handleNewEntryClick = (type: MediaType) => {
    setEntryMediaType(type);
    setFormData({
      MediaTitle: "",
      MediaDescription: "",
      ImageURL: "",
      MediaType: type,
      MediaStatus: MediaStatus.Planning,
    });
  };

  const handleFormChange = (field: keyof NewEntryFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitForm = () => {
    // Here you would typically call a mutation to submit the form
    console.log("Submitting:", formData);
    setShowNewEntryModal(false);
    setEntryMediaType(null);
    setFormData({
      MediaTitle: "",
      MediaDescription: "",
      ImageURL: "",
      MediaType: MediaType.Movies,
      MediaStatus: MediaStatus.Planning,
    });
  };

  const filteredMedia = (data?.data || []).filter(
    (media) =>
      media.MediaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.MediaDescription.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <main className="flex-1 bg-gray-50 px-8 py-8 overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading reviews...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 bg-gray-50 px-8 py-8 overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-red-600 font-semibold">Error loading reviews</p>
            <p className="text-gray-600 mt-2">{error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-50 px-8 py-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Critical Reviews
        </h1>
        <p className="text-gray-600 mb-8">
          A curated selection of thoughts and critiques across media. Organized
          by form, structured by narrative impact.
        </p>

        {/* Separator */}
        <hr className="border-gray-300 mb-8" />
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-8 gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        <button
          onClick={() => setShowNewEntryModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          New Entry
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedMediaType("all")}
          className={`px-4 py-2 rounded-lg font-semibold uppercase text-sm transition-colors whitespace-nowrap ${
            selectedMediaType === "all"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          All Media
        </button>
        <button
          onClick={() => setSelectedMediaType(MediaType.Books)}
          className={`px-4 py-2 rounded-lg font-semibold uppercase text-sm transition-colors whitespace-nowrap ${
            selectedMediaType === MediaType.Books
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Books
        </button>
        <button
          onClick={() => setSelectedMediaType(MediaType.Games)}
          className={`px-4 py-2 rounded-lg font-semibold uppercase text-sm transition-colors whitespace-nowrap ${
            selectedMediaType === MediaType.Games
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Games
        </button>
        <button
          onClick={() => setSelectedMediaType(MediaType.Movies)}
          className={`px-4 py-2 rounded-lg font-semibold uppercase text-sm transition-colors whitespace-nowrap ${
            selectedMediaType === MediaType.Movies
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setSelectedMediaType(MediaType.TVShows)}
          className={`px-4 py-2 rounded-lg font-semibold uppercase text-sm transition-colors whitespace-nowrap ${
            selectedMediaType === MediaType.TVShows
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          TV Shows
        </button>
      </div>

      {/* Media Grid */}
      {filteredMedia && filteredMedia.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((media: Media, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {media.ImageURL ? (
                  <img
                    src={media.ImageURL}
                    alt={media.MediaTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-600">No Image</span>
                  </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold uppercase">
                  {MEDIA_TYPES[media.MediaType as MediaType]}
                </div>

                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded text-xs font-semibold ${STATUS_COLORS[media.MediaStatus as MediaStatus]}`}
                >
                  {MEDIA_STATUS_LABELS[media.MediaStatus as MediaStatus]}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {media.MediaTitle}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {media.MediaDescription}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(media.Ratings)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {media.Ratings.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600 text-lg">No reviews found</p>
          </div>
        </div>
      )}

      {/* New Entry Modal - Select Type */}
      {showNewEntryModal && !entryMediaType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">New Entry</h2>
              <button
                onClick={() => setShowNewEntryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Select the media type:</p>

            <div className="space-y-3">
              <button
                onClick={() => handleNewEntryClick(MediaType.Books)}
                className="w-full bg-blue-50 border-2 border-blue-200 text-blue-700 font-semibold py-3 px-4 rounded-lg hover:bg-blue-100 transition-colors"
              >
                📚 {MEDIA_TYPES[MediaType.Books]}
              </button>
              <button
                onClick={() => handleNewEntryClick(MediaType.Games)}
                className="w-full bg-purple-50 border-2 border-purple-200 text-purple-700 font-semibold py-3 px-4 rounded-lg hover:bg-purple-100 transition-colors"
              >
                🎮 {MEDIA_TYPES[MediaType.Games]}
              </button>
              <button
                onClick={() => handleNewEntryClick(MediaType.Movies)}
                className="w-full bg-red-50 border-2 border-red-200 text-red-700 font-semibold py-3 px-4 rounded-lg hover:bg-red-100 transition-colors"
              >
                🎬 {MEDIA_TYPES[MediaType.Movies]}
              </button>
              <button
                onClick={() => handleNewEntryClick(MediaType.TVShows)}
                className="w-full bg-green-50 border-2 border-green-200 text-green-700 font-semibold py-3 px-4 rounded-lg hover:bg-green-100 transition-colors"
              >
                📺 {MEDIA_TYPES[MediaType.TVShows]}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entry Form Modal */}
      {showNewEntryModal && entryMediaType !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Add{" "}
                {entryMediaType !== null &&
                  MEDIA_TYPES[entryMediaType as MediaType]}
              </h2>
              <button
                onClick={() => {
                  setShowNewEntryModal(false);
                  setEntryMediaType(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Media Title
                </label>
                <input
                  type="text"
                  value={formData.MediaTitle}
                  onChange={(e) =>
                    handleFormChange("MediaTitle", e.target.value)
                  }
                  placeholder="Enter title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Media Description
                </label>
                <textarea
                  value={formData.MediaDescription}
                  onChange={(e) =>
                    handleFormChange("MediaDescription", e.target.value)
                  }
                  placeholder="Enter description"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Image URL Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.ImageURL}
                  onChange={(e) => handleFormChange("ImageURL", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Status
                </label>
                <select
                  value={formData.MediaStatus}
                  onChange={(e) =>
                    handleFormChange("MediaStatus", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={MediaStatus.Planning}>Planning</option>
                  <option value={MediaStatus.InProgress}>In Progress</option>
                  <option value={MediaStatus.Finished}>Finished</option>
                </select>
              </div>

              {/* Type Field (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Media Type
                </label>
                <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                  {entryMediaType !== null &&
                    MEDIA_TYPES[entryMediaType as MediaType]}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowNewEntryModal(false);
                  setEntryMediaType(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitForm}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ReviewsPage;
