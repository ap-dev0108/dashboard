import React, { useState } from 'react';
import { Code, ExternalLink, Plus, X } from 'lucide-react';
import { useGetProjects } from '../hooks/useProjects';
import { ProjectTypeEnum } from '../types/ProjectTypes';
import type { ProjectTypes } from '../types/ProjectTypes';

type NewProjectFormData = ProjectTypes;

const filters = ['All', 'Web App', 'Mobile App', 'Wix Templates', 'Management'];

const PROJECT_TYPE_OPTIONS = [
  { value: ProjectTypeEnum.WebApp, label: 'Web App' },
  { value: ProjectTypeEnum.MobileApp, label: 'Mobile App' },
  { value: ProjectTypeEnum.WixTemplates, label: 'Wix Templates' },
  { value: ProjectTypeEnum.Management, label: 'Management' },
];

const typeColors: Record<ProjectTypeEnum, { bg: string; text: string; badge: string }> = {
  [ProjectTypeEnum.WebApp]: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    badge: 'bg-blue-600',
  },
  [ProjectTypeEnum.MobileApp]: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    badge: 'bg-purple-600',
  },
  [ProjectTypeEnum.WixTemplates]: {
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    badge: 'bg-pink-600',
  },
  [ProjectTypeEnum.Management]: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    badge: 'bg-green-600',
  },
};

export const ProjectsSection: React.FC = () => {
  const { data, isLoading, error } = useGetProjects();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [formData, setFormData] = useState<NewProjectFormData>({
    ProjectTitle: '',
    LiveURL: '',
    GithubURL: '',
    ImageURL: '',
    Type: ProjectTypeEnum.WebApp,
  });

  const handleFormChange = (field: keyof NewProjectFormData, value: any) => {
    setFormData((prev : any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitForm = () => {
    // Here you would typically call a mutation to submit the form
    console.log('Submitting project:', formData);
    setShowNewEntryModal(false);
    setFormData({
      ProjectTitle: '',
      LiveURL: '',
      GithubURL: '',
      ImageURL: '',
      Type: ProjectTypeEnum.WebApp,
    });
  };

  if (isLoading) {
    return (
      <main className="flex-1 bg-gray-50 px-8 py-8">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading projects...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 bg-gray-50 px-8 py-8">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-red-600 font-semibold">Error loading projects</p>
            <p className="text-gray-600 mt-2">{error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  const projects: ProjectTypes[] = (data?.data as ProjectTypes[]) || [];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.Type === activeFilter);

  return (
    <main className="flex-1 bg-gray-50 px-8 py-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects Portfolio</h1>
        <p className="text-gray-600 font-mono">
          A curated selection of technical explorations, ongoing developments, and finalized
          architectures. Meticulously documented for review.
        </p>
      </div>

      {/* Filters and New Entry Button */}
      <div className="flex items-center justify-between mb-8 gap-6">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-white text-blue-600 border-2 border-blue-600'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={() => setShowNewEntryModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium whitespace-nowrap"
          >
            <Plus size={20} />
            New Entry
          </button>
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const config = typeColors[project.Type as ProjectTypeEnum];

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card Image Header */}
                <div className={`${config.bg} relative h-40 flex items-center justify-center overflow-hidden`}>
                  {project.ImageURL ? (
                    <img
                      src={project.ImageURL}
                      alt={project.ProjectTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">No Image</span>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium ${config.badge}`}
                  >
                    {project.Type}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                    {project.ProjectTitle}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.GithubURL && (
                      <a
                        href={project.GithubURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Code size={18} />
                        <span className="text-sm font-medium">Code</span>
                      </a>
                    )}
                    {project.LiveURL && (
                      <a
                        href={project.LiveURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <ExternalLink size={18} />
                        <span className="text-sm font-medium">Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600 text-lg">No projects found for this category</p>
          </div>
        </div>
      )}

      {/* New Entry Modal */}
      {showNewEntryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">New Project</h2>
              <button
                onClick={() => setShowNewEntryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Project Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.ProjectTitle}
                  onChange={(e) => handleFormChange('ProjectTitle', e.target.value)}
                  placeholder="Enter project title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Project Type Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Project Type
                </label>
                <select
                  value={formData.Type}
                  onChange={(e) => handleFormChange('Type', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {PROJECT_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.ImageURL}
                  onChange={(e) => handleFormChange('ImageURL', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Live URL Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Live URL
                </label>
                <input
                  type="url"
                  value={formData.LiveURL}
                  onChange={(e) => handleFormChange('LiveURL', e.target.value)}
                  placeholder="https://project-live.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* GitHub URL Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.GithubURL}
                  onChange={(e) => handleFormChange('GithubURL', e.target.value)}
                  placeholder="https://github.com/user/repo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowNewEntryModal(false)}
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

export default ProjectsSection;