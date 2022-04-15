const serverUrl = "http://0af1-78-90-52-121.eu.ngrok.io/imageserver/";

export const createSitesImageUrl = (picture_name: string) => {
  return `${serverUrl}tourist_sites?name=${picture_name}`;
};

export const createProfilePicsImageUrl = (picture_name: string) => {
  return `${serverUrl}profile_pictures?name=${picture_name}`;
};

export const createRewardsImageUrl = (picture_name: string) => {
  return `${serverUrl}rewards?name=${picture_name}`;
};
