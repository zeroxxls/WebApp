import { FILTER_TYPES } from "../../filter/constant/filters";

export const useFilteredWorks = (works, activeFilter, search) => {
  return works.filter((work) => {
    const matchesTitle = work.title.toLowerCase().includes(search);
    const matchesTag = work.tags?.some(tag => tag.toLowerCase().includes(search));

    const matchesTrending = activeFilter.includes(FILTER_TYPES.TRENDING) ? work.isTrending : true;
    const matchesFollowing = activeFilter.includes(FILTER_TYPES.FOLLOWING) ? work.isFollowing : true;
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
      ? work.tags?.some(tag => activeFilter.includes(tag))
      : true;

    const matchesActiveFilters = matchesTrending && matchesFollowing && matchesNoAI && matchesTags;
    const matchesSearch = matchesTitle || matchesTag;

    return matchesActiveFilters && matchesSearch;
  });
};
