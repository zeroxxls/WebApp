import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsPostLoading } from "../../../../store/slices/loadingSlice.js";
import { useFilters } from "../../../filter/hooks/useFilters.js";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { Loader } from "../../../../shared/ui/Loader.jsx";
import { useFilteredWorks } from "../../hooks/useFilteredWorks.js";
import { WorkCard } from "./WorkCard.jsx";
import { fetchAllWorks } from "../../../../store/slices/workSlice.js";

export const Channels = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { activeFilter } = useFilters();
  const isPostLoading = useSelector((state) => state.loading.isPostLoading);
  const search = useSelector((state) => state.search.searchQuery.toLowerCase());
  const allWorks = useSelector((state) => state.works.userWorks); // Получаем все работы из состояния
  const worksLoading = useSelector((state) => state.works.isLoading);
  const worksError = useSelector((state) => state.works.error);

 useEffect(() => {
    dispatch(fetchAllWorks()); // Загружаем все работы при монтировании
  }, [dispatch]);

  // const filteredWorks = useFilteredWorks(works, activeFilter, search); // Больше не используем моковые данные
  const filteredWorks = useFilteredWorks(allWorks, activeFilter, search);

  // const findWorkAuthor = (work) => { // Больше не нужно, автор должен быть в work
  //   return users.find(user => user.id === work.userId);
  // };

  if (worksLoading) {
    return <Loader />;
  }

  if (worksError) {
    return <div>Error loading works: {worksError}</div>;
  }

  return (
    <div className="p-4">
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-1">
          {filteredWorks.map((work) => {
            return (
              <WorkCard
                key={work._id}
                work={work}
                user={work.author}
                onClick={() => {
                  setSelectedWork(work);
                  setSelectedUser(work.author);
                  setOpen(true);
                }}
              />
            );
          })}
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