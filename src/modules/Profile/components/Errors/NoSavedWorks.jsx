import { SavedWorksHeader } from "../SavedWorks/SavedWorksHeader";

export const NoSavedWorks = ({ onBack }) => (
  <div className="flex flex-col h-full px-4">
    <SavedWorksHeader onBack={onBack} />
    <div className="flex-grow flex items-center justify-center text-center text-gray-400">
      <p className="text-lg">You haven't saved any works yet.</p>
    </div>
  </div>
);
