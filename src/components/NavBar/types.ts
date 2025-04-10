interface NavBarProps  {
  showSearchBar: boolean;
  showProfile: boolean;
  showSupport:boolean;
  showMobileView:boolean
  onSearchChange?: (query: string) => void;
};

export type{NavBarProps}