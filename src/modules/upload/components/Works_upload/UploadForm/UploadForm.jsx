import { DescriptionInput } from './DescriptionInput';
import { SubmitButton } from './SubmitButton';
import { CategoryFilters } from './CategoryFilters';
import { PriceSelector } from './PriceSelector';
import { TechnologySelector } from './TechnologySelector';
import { useUploadFormState } from '../../../hooks/Works_upload/useUploadFormState';
import { useUploadSubmit } from '../../../hooks/Works_upload/useUploadSubmit';

export const UploadForm = ({ files, setFiles, onUploadSuccess, onUploadError }) => {
  const {
    title, setTitle,
    description, setDescription,
    price, setPrice,
    selectedFilters,
    selectedTechnologies,
    handleToggleTechnology,
    handleToggleFilter,
    isLoading, setIsLoading,
    localError, setLocalError,
    setSelectedFilters,
    setSelectedTechnologies,
    setPrice: resetPrice,
    setTitle: resetTitle,
    setDescription: resetDescription
  } = useUploadFormState();

  const resetFormFields = () => {
    resetTitle('');
    resetDescription('');
    resetPrice(0);
    setSelectedTechnologies([]);
    setSelectedFilters([]);
  };

  const { handleSubmit } = useUploadSubmit({
    files,
    title,
    description,
    price,
    selectedFilters,
    selectedTechnologies,
    setIsLoading,
    setLocalError,
    setFiles,
    resetFormFields,
    onUploadSuccess,
    onUploadError
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {localError && (
        <div className="p-4 mb-4 text-red-500 bg-red-500/10 rounded-lg">
          {localError}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          placeholder="Enter a title for your work"
          required
        />
      </div>

      <DescriptionInput value={description} onChange={setDescription} />
      <PriceSelector value={price} onChange={setPrice} />
      <TechnologySelector selectedTechnologies={selectedTechnologies} onToggleTechnology={handleToggleTechnology} />
      <CategoryFilters selectedFilters={selectedFilters} onToggleFilter={handleToggleFilter} />
      <SubmitButton isLoading={isLoading} disabled={isLoading || !files || files.length === 0 || !title.trim()} />
    </form>
  );
};