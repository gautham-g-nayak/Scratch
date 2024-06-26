// Context types

export interface Store {
  showBall: Boolean;
  showBanana: Boolean;
  showApple: Boolean;
  showDog: Boolean;
  catAction: any;
  ballAction: any;
  appleAction: any;
  dogAction: any;
  bananaAction: any;

  setShowBall: (showBall: Boolean) => void;
  setShowBanana: (showBanana: Boolean) => void;
  setShowApple: (showApple: Boolean) => void;
  setShowDog: (showDog: Boolean) => void;
  setCatAction: (catAction: any) => void;
  setBallAction: (ballAction: any) => void;
  setDogAction: (dogAction: any) => void;
  setAppleAction: (appleAction: any) => void;
  setBananaAction: (bananaAction: any) => void;
}
