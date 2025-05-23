import { FILTER_TYPES } from "../../filter/constant/filters";

export const useFilteredWorks = (works, activeFilter, search) => {
  return works.filter((work) => {
    const lowerCaseSearch = search ? search.toLowerCase() : ''; // Приводим search к нижнему регистру один раз

    // Поиск по названию
    const matchesTitle = work.title?.toLowerCase().includes(lowerCaseSearch);

    // Поиск по описанию
    const matchesDescription = work.description?.toLowerCase().includes(lowerCaseSearch);

    // Поиск по технологиям
    const matchesTechnology = work.technologies?.some(tech => tech?.toLowerCase().includes(lowerCaseSearch));

    const matchesTrending = activeFilter.includes(FILTER_TYPES.TRENDING) ? (work.isTrending || false) : true;
    const matchesFollowing = activeFilter.includes(FILTER_TYPES.FOLLOWING) ? (work.isFollowing || false) : true;
    const matchesNoAI = activeFilter.includes(FILTER_TYPES.NO_AI) ? !work.isAI : true;

    const tagFilters = [
      FILTER_TYPES.STYLIZED, FILTER_TYPES.ARCHVIZ, FILTER_TYPES.MECHA,
      FILTER_TYPES.CHARACTER_DESIGN, FILTER_TYPES.CHARACTER_MODELING,
      FILTER_TYPES.ILLUSTRATION, FILTER_TYPES.LIGHTING, FILTER_TYPES.CONCEPT_ART,
      FILTER_TYPES.ANIMATION, FILTER_TYPES.VFX, FILTER_TYPES.MODELING,
      FILTER_TYPES.TEXTURING, FILTER_TYPES.PAINTING, FILTER_TYPES.RIGGING,
      FILTER_TYPES.ANIMATION_TESTING
    ];

    const matchesTags = tagFilters.some(tag => activeFilter.includes(tag))
      ? work.filters?.some(filter => activeFilter.includes(filter))
      : true;

    const matchesActiveFilters = matchesTrending && matchesFollowing && matchesNoAI && matchesTags;
    // Поиск теперь включает название, описание и технологии
    const matchesSearch = matchesTitle || matchesDescription || matchesTechnology;

    return matchesActiveFilters && matchesSearch;
  });
};
