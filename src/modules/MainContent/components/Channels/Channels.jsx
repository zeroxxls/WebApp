import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsPostLoading } from "../../../../store/slices/loadingSlice.js";
import { useFilters } from "../../../filter/hooks/useFilters.js";
import { works } from "../../data/works";
import { users } from "../../data/users";
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
  const isPostLoading = useSelector((state) => state.loading.isPostLoading)
  const search = useSelector((state) => state.search.searchQuery.toLowerCase());

  useEffect(() => {
    dispatch(setIsPostLoading(true)); // Сначала включаем загрузку
  
    const timer = setTimeout(() => {
      dispatch(setIsPostLoading(false)); // Через секунду выключаем загрузку
    }, 1000);
  
    return () => clearTimeout(timer);
  }, [dispatch]);

  const filteredWorks = useFilteredWorks(works, activeFilter, search);

  return (
    <div className="p-4">
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-1">
          {filteredWorks.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              user={users[index % users.length]}
              onClick={() => {
                setSelectedWork(work);
                setSelectedUser(users[index % users.length]);
                setOpen(true);
              }}
            />
          ))}
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