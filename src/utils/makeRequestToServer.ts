import { Alert } from "react-native";
import { Rewards } from "../models/Rewards";
import { Site, SiteDetails } from "../models/Site";
import { TokenResponse } from "expo-auth-session";
import { UserInfo } from "../models/UserInfo";

const linkURL = "http://0af1-78-90-52-121.eu.ngrok.io/api/";

// /api/register && api/login [POST]
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

    if (res.status !== 200) {
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

// /api/get_self_info [GET]
export const getSelfInfo = async (token: string): Promise<UserInfo | null> => {
  try {
    const res = await fetch(`${linkURL}get_self_info`, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    // console.log(JSON.stringify(res));
    if (res.status !== 200) {
      const text = await res.json();
      throw new Error(text.error);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log("Error getSelfInfo");
    console.log(err);
    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

// /api/get_all_sites [GET]
export const fetchAllSites = async (
  token: string,
  filter: "all" | "visited" | "unvisited" = "all"
): Promise<Site[] | null> => {
  try {
    // console.log(token);
    const res = await fetch(`${linkURL}get_all_sites?filter=${filter}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (res.status !== 200) {
      const text = await res.json();
      throw new Error(text.error);
    }

    const data: { sites: [] } = await res.json();
    // console.log(data);
    return data.sites;
  } catch (err: any) {
    console.log("Error fetchAllSites");
    console.log(err);
    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

// /api/get_id_token [GET]
export const getQRCode = async (token: string): Promise<string | null> => {
  try {
    const res = await fetch(`${linkURL}get_id_token`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    });

    if (res.status !== 200) {
      const text = await res.json();
      throw new Error(text.error);
    }

    const data = await res.json();
    // console.log(data);
    return data.id_token;
  } catch (err: any) {
    console.log("Error getQRCode");
    console.log(err);
    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

// /api/make_stamp [POST]
export const receiveStamp = async (
  token: string,
  id_token: string
): Promise<string | null> => {
  try {
    let formData = new FormData();
    formData.append("id_token", id_token);
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

    if (res.status !== 200) {
      const text = await res.json();
      throw new Error(text.error);
    }

    if (res.status === 200) {
      Alert.alert("Congratulations", "You have recieved a ne stamp!", [
        { text: "Okay" },
      ]);
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

// /api/refresh_token [POST]
export const refreshAuthToken = async (
  oldToken: string
): Promise<string | null> => {
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

// /api/get_site_info [GET]
export const getSiteInfo = async (
  id: number,
  token: string
): Promise<SiteDetails | null> => {
  try {
    const res = await fetch(`${linkURL}get_site_info?id=${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    });
    // console.log(JSON.stringify(res));
    const data: SiteDetails = await res.json();
    // console.log(data);
    return data;
  } catch (err: any) {
    console.log("Error getSiteInfo");
    console.log(err);
    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
    // Alert.alert(`${err}`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

// /api/oauth2/google [POST]
export const googleAuthRequest = async (
  googleToken: TokenResponse
): Promise<string | null> => {
  try {
    const res = await fetch(`${linkURL}/oauth2/google`, {
      mode: "cors",
      method: "POST",
    });

    // console.log(JSON.stringify(res));
    if (res.status !== 200) {
      const text = await res.json();
      throw new Error(text.error);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log("Error googleAuthRequest");
    console.log(err);
    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

// /api/get_employee_info [GET]
export const getEmployeeInfo = async (
  token: string,
  id: number
): Promise<{} | null> => {
  try {
    const res = await fetch(`${linkURL}get_employee_info?id=${id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    // console.log(JSON.stringify(res));
    if (res.status !== 200) {
      const text = await res.json();
      throw new Error(text.error);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log("Error getEmployeeInfo");
    console.log(err);
    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

// /api/get_user_info [GET]
export const getUserInfo = async (
  token: string,
  id: number
): Promise<UserInfo | null> => {
  try {
    const res = await fetch(`${linkURL}get_user_info?id=${id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    // console.log(JSON.stringify(res));
    if (res.status !== 200) {
      const text = await res.json();
      throw new Error(text.error);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log("Error getUserInfo");
    console.log(err);
    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

// /api/get_eligible_rewards [GET]
export const getRewards = async (
  token: string,
  id_token: string
): Promise<Rewards | null> => {
  try {
    const res = await fetch(
      `${linkURL}/get_eligible_rewards?id_token=${id_token}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(JSON.stringify(res));

    if (res.status !== 200) {
      const text = await res.json();
      throw new Error(text.error);
    }

    const data: Rewards = await res.json();
    console.log(data);
    return data;
  } catch (err: any) {
    console.log("Error getRewards");
    console.log(err);
    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

// /api/post_reward [POST]
export const giveRewards = async (
  token: string,
  id_token: string,
  reward_id: number
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("id_token", id_token);
    formData.append("reward_id", `${reward_id}`);
    const res = await fetch(`${linkURL}/post_reward`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    console.log(JSON.stringify(res));

    if (res.status !== 200) {
      const text = await res.json();
      throw new Error(text.error);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err: any) {
    console.log("Error giveRewards");
    console.log(err);
    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};
