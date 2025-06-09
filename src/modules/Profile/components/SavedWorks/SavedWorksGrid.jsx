import { WorkCard } from '../../../MainContent';

export const SavedWorksGrid = ({ works, onWorkClick }) => (
  <div className="px-5 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {works.map((work) => (
      <WorkCard
        key={work._id}
        work={work}
        user={work.author}
        onClick={() => onWorkClick(work, work.author)}
      />
    ))}
  </div>
);
