import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useFilters } from "../../../filter/hooks/useFilters.js";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { Loader } from "../../../../shared/ui/Loader.jsx";
import { useFilteredWorks } from "../../hooks/filter/useFilteredWorks.js";
import { WorkCard } from "./WorkCard.jsx";
import { fetchAllWorks } from "../../../../store/slices/workSlice.js";
import { setSearchQuery } from "../../../../store/slices/searchSlice.js";

export const Channels = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { activeFilter } = useFilters();
  const search = useSelector((state) => state.search.searchQuery.toLowerCase());
  const allWorks = useSelector((state) => state.works.userWorks);
  const worksLoading = useSelector((state) => state.works.isLoading);
  const isLoadingMore = useSelector((state) => state.works.isLoadingMore);
  const currentPage = useSelector((state) => state.works.page);
  const hasMore = useSelector((state) => state.works.hasMore);
  const worksError = useSelector((state) => state.works.error);
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('search') || '';

  useEffect(() => {
    dispatch(setSearchQuery(queryFromUrl));
    dispatch(fetchAllWorks({ page: 1, search: queryFromUrl }));
  }, [dispatch, queryFromUrl]);

  const filteredWorks = useFilteredWorks(allWorks, activeFilter, search);

  if (worksLoading) {
    return <Loader />;
  }

  if (worksError) {
    return <div>Error loading works: {worksError}</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-1">
        {filteredWorks.map((work) => (
          <WorkCard
            key={work._id}
            work={work}
            user={work.owner || work.author}
            onClick={() => {
              setSelectedWork(work);
              setSelectedUser(work.owner || work.author);
              setOpen(true);
            }}
          />
        ))}
      </div>
      {filteredWorks.length === 0 && (
        <p className="py-12 text-center text-gray-400">
          {search ? 'No works match your search.' : 'No works have been published yet.'}
        </p>
      )}
      {hasMore && (
        <div className="flex justify-center py-8">
          <button
            type="button"
            onClick={() => dispatch(fetchAllWorks({ page: currentPage + 1, search: queryFromUrl }))}
            disabled={isLoadingMore}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 text-white transition disabled:cursor-wait disabled:opacity-60"
          >
            {isLoadingMore ? 'Loading…' : 'Load more works'}
          </button>
        </div>
      )}
      {open && (
        <ModalWindow
          onClose={() => setOpen(false)}
          selectedWork={selectedWork}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};
