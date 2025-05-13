import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsPostLoading } from "../../../../store/slices/loadingSlice.js";
import { useFilters } from "../../../filter/hooks/useFilters.js";
import { works } from "../../../../shared/data/works.js";
import { users } from "../../../../shared/data/users.js";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { Loader } from "../../../../shared/ui/Loader.jsx";
import { useFilteredWorks } from "../../hooks/useFilteredWorks.js";
import { WorkCard } from "./WorkCard.jsx";

export const Channels = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { activeFilter } = useFilters();
  const isPostLoading = useSelector((state) => state.loading.isPostLoading);
  const search = useSelector((state) => state.search.searchQuery.toLowerCase());

  useEffect(() => {
    dispatch(setIsPostLoading(true));
  
    const timer = setTimeout(() => {
      dispatch(setIsPostLoading(false));
    }, 1000);
  
    return () => clearTimeout(timer);
  }, [dispatch]);

  const filteredWorks = useFilteredWorks(works, activeFilter, search);

  const findWorkAuthor = (work) => {
    return users.find(user => user.id === work.userId);
  };

  return (
    <div className="p-4">
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-1">
          {filteredWorks.map((work) => {
            const author = findWorkAuthor(work);
            return (
              <WorkCard
                key={work.id}
                work={work}
                user={author}
                onClick={() => {
                  setSelectedWork(work);
                  setSelectedUser(author);
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