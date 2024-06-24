// Context types

export interface Store {
  showBall: Boolean;
  catAction: any;
  ballAction: any;

  setShowBall: (showBall: Boolean) => void;
  setCatAction: (catAction: any) => void;
  setBallAction: (ballAction: any) => void;
}
