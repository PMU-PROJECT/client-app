const serverUrl = "https://2e6c-87-126-123-62.eu.ngrok.io/imageserver/";

export const createSitesImageUrl = (picture_name: string) => {
  return `${serverUrl}tourist_sites?name=${picture_name}`;
};

export const createProfilePicsImageUrl = (picture_name: string) => {
  return `${serverUrl}profile_pictures?name=${picture_name}`;
};

export const createRewardsImageUrl = (picture_name: string) => {
  return `${serverUrl}rewards?name=${picture_name}`;
};
