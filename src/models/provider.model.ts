export interface Provider {
  name?: string;
  data?: localProviderData | any;
}

interface localProviderData {
  password?: string;
}