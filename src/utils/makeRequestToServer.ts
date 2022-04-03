import { Alert } from "react-native";
import { Details } from "../models/Site";

const linkURL = "http://0af1-78-90-52-121.eu.ngrok.io/api/";

export const makeAuthRequest = async (
  path: string,
  values: {
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
  }
): Promise<string | null> => {
  try {
    let formData = new FormData();
    if (values.first_name && values.last_name) {
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
    }
    formData.append("email", values.email);
    formData.append("password", values.password);

    const res = await fetch(`${linkURL}${path}`, {
      // headers: {
      //   //x-www-form-urlencoded
      //   "Content-Type": "application/json",
      // },
      mode: "cors",
      method: "POST",
      body: formData, //JSON.stringify(values),
    });
    // console.log(JSON.stringify(res));

    if (res.status === 400 || res.status === 422) {
      const text = await res.json();
      throw new Error(text.error);
    }

    if (res.status === 401) {
      const text = await res.json();
      throw new Error(text.error);
    }

    const data = await res.json();
    return data.token;
  } catch (err: any) {
    console.log("Error makeAuthRequest");
    console.log(err);
    Alert.alert(`${err}`, "Check what you have entered!", [{ text: "Okay" }]);
    return null;
  }
};

export const getSelfInfo = async (token: string): Promise<[] | null> => {
  try {
    const res = await fetch(`${linkURL}get_self_info`, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    // console.log(JSON.stringify(res));
    if (res.status === 401) {
      throw new Error("Not Authorized!");
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log("Error getSelfInfo");
    console.log(err);
    Alert.alert(`${err}`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

export const fetchAllSites = async (
  token: string,
  filter: "all" | "visited" | "unvisited" = "all"
): Promise<[] | null> => {
  try {
    // console.log(token);
    const res = await fetch(`${linkURL}get_all_sites?filter=${filter}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (res.status === 401) {
      throw new Error("Auth Token Is Not Valid!");
    }
    if (res.status === 400) {
      throw new Error("Filter Is Not Valid!");
    }

    const data: { sites: [] } = await res.json();
    // console.log(data);
    return data.sites;
  } catch (err: any) {
    console.log("Error fetchAllSites");
    console.log(err);
    Alert.alert(`${err}`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

export const getQRCode = async (token: string): Promise<string | null> => {
  try {
    const res = await fetch(`${linkURL}get_id_token`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    });

    if (res.status === 401) {
      throw new Error("Not logged in!");
    }

    // console.log(res);

    const data = await res.json();
    // console.log(data);
    return data.id_token;
  } catch (err: any) {
    console.log("Error getQRCode");
    console.log(err);
    Alert.alert(`${err}`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

export const receiveStamp = async (token: string, stampToken: string) => {
  try {
    let formData = new FormData();
    formData.append("id_token", stampToken);
    // console.log("Auth " + token);
    // console.log("ST " + stampToken);
    const res = await fetch(`${linkURL}make_stamp`, {
      method: "POST",
      mode: "cors",
      body: formData,
      headers: {
        Authorization: token,
      },
    });

    console.log(res);
    if (res.status === 401) {
      throw new Error("Not Authorized");
    }
    if (res.status === 400) {
      throw new Error("Invalid or Expired Token!");
    }

    const data = await res.json();
    // const data2 = await res.text();
    console.log(data);
    // console.log(data2);
    return data;
  } catch (err: any) {
    console.log("Error getStamp");
    console.log(err);
    return null;
  }
};

export const refreshAuthToken = async (oldToken: string) => {
  try {
    const res = await fetch(`${linkURL}refresh_token`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: oldToken,
      },
    });
    // console.log(JSON.stringify(res));
    const data: { token: string } = await res.json();
    // console.log(data);
    return data.token;
  } catch (err: any) {
    console.log("Error getRefreshToken");
    console.log(err);
    // Alert.alert(`${err}`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

export const getSiteInfo = async (id: number, token: string) => {
  try {
    const res = await fetch(`${linkURL}get_site_info?id=${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    });
    // console.log(JSON.stringify(res));
    const data: Details = await res.json();
    // console.log(data);
    return data;
  } catch (err: any) {
    console.log("Error getSiteInfo");
    console.log(err);
    // Alert.alert(`${err}`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};
