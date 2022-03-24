import { Alert } from "react-native";

const linkURL = "http://d13f-78-90-52-121.ngrok.io/api/";

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
      throw new Error("Insufficient Information!");
    }

    if (res.status === 401) {
      throw new Error("Not Valid Information!");
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
    console.log(token);
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
    return data.sites;
  } catch (err: any) {
    console.log("Error fetchAllSites");
    console.log(err);
    Alert.alert(`${err}`, `${err}`, [{ text: "Okay" }]);
    return null;
  }
};

export const getQRCode = async (
  token: string
): Promise<{ stamp_token: string } | null> => {
  try {
    const res = await fetch(`${linkURL}get_stamp_token`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    });

    if (res.status === 401) {
      throw new Error("Only For Employees!");
    }
    if (res.status === 400) {
      throw new Error("Need to be Assigned to Place!");
    }

    const data = await res.json();
    return data;
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
    formData.append("stamp_token", stampToken);
    console.log("Auth " + token);
    console.log("ST " + stampToken);
    const res = await fetch(`${linkURL}receive_stamp`, {
      method: "POST",
      mode: "cors",
      body: formData,
      headers: {
        Authorization: token,
      },
    });

    if (res.status === 401) {
      throw new Error("Not Authorized");
    }
    if (res.status === 400) {
      throw new Error("Already Have This Stamp!");
    }
    const data = await res.json();
    // const data2 = await res.text();
    console.log(data);
    // console.log(data2);
    return data;
  } catch (err: any) {
    console.log("Error getQRCode");
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
